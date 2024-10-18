"use client";

import { auth } from "@/lib/firebase/config";
import { login, signup } from "@/lib/login_validations";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

type AuthType = "login" | "signup";

export default function Page() {
  const [authType, setAuthType] = useState<AuthType>("login");
  const currentPageInfo = PageInfo[authType];
  const router = useRouter();

  return (
    <main className="md:h-screen h-auto w-screen flex">
      <div className="w-full h-max my-auto mx-auto flex flex-col justify-center items-center md:flex-row md:justify-around md:items-center">
        <img
          src="./images/products/hair-shampoo-banner.png"
          alt="shampoo showcase"
          className="w-[400px]"
        />
        <form className="p-8 flex flex-col gap-2 mb-6">
          <img src="/navbar/logo.svg" alt="close" className="mb-6" />
          <h2 className="font-bold text-2xl tracking-tighter text-left mb-4">
            {currentPageInfo?.title}
          </h2>
          {currentPageInfo.fields.map((item) => (
            <input
              key={item.id}
              name={item.name}
              placeholder={item.name}
              required={true}
              type={item.type}
              className="bg-neutral-300/50 border border-neutral-500/30 px-6 py-2 mb-2 rounded-3xl"
            />
          ))}
          <div className="w-full flex flex-row">
            <button
              formAction={
                currentPageInfo.changeStateOption != "login" ? login : signup
              }
              className="bg-black text-white w-full px-6 py-2 my-4 rounded-3xl"
            >
              {currentPageInfo?.btnTxt}
            </button>
          </div>

          <div className="flex justify-center items-center gap-2">
            <div className="w-1/2 h-0.5 bg-neutral-300"></div>
            <p className="text-sm text-neutral-400 font-semibold">or</p>
            <div className="w-1/2 h-0.5 bg-neutral-300"></div>
          </div>

          <div
            onClick={() => {
              signInWithPopup(auth, new GoogleAuthProvider()).then(
                async (result) => {
                  // This gives you a Google Access Token. You can use it to access the Google API.
                  const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                  const token = credential?.accessToken;
                  // The signed-in user info.
                  const user = result.user;
                  console.log(user);

                  if (auth.currentUser) {
                    if (authType == "signup") {
                      setTimeout(async () => {
                        const phoneNumber = prompt("Enter your phone number");
                        console.log("Hello");

                        const body = JSON.stringify({
                          userId: auth.currentUser!.uid,
                          name: auth.currentUser!.displayName,
                          email: auth.currentUser!.email,
                          phone: phoneNumber,
                        });
                        console.log(body);
                        const request = await fetch(
                          "https://us-central1-shramasa-care.cloudfunctions.net/webApi/api/users/signup",
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: body,
                          }
                        );
                        const response = await request.json();
                        if (request.status === 200) {
                          router.push("/");
                        } else {
                          alert("Error: " + response.error);
                        }
                      }, 1000);
                    } else {
                      router.push("/");
                    }
                  }
                }
              );
              // .catch((error) => {
              //   alert(error.message);
              // });
            }}
            className="flex justify-center items-center rounded-3xl space-x-3 bg-white px-7 py-3 my-4 w-full text-center border border-neutral-500/50 cursor-pointer transition-all duration-500 hover:scale-105"
          >
            <img
              src={"/icons/google.png"}
              alt="pGoogle logo"
              className="w-6 h-6 sm:w-4 sm:h-4"
            />
            <p className="text-black font-medium text-sm sm:text-xs">
              {currentPageInfo.oAuthTxt}
            </p>
          </div>

          <p
            onClick={() => setAuthType(currentPageInfo?.changeStateOption)}
            className="text-sm text-center space-x-4 cursor-pointer"
          >
            {currentPageInfo.alternative.parent}{" "}
            <span className="underline text-[#46A627] font-medium">
              {currentPageInfo.alternative.child}
            </span>
          </p>
        </form>
      </div>
    </main>
  );
}

const PageInfo: Record<
  string,
  {
    title: string;
    fields: { name: string; type: string; id: number }[];
    oAuthTxt: string;
    btnTxt: string;
    alternative: { parent: string; child: string };
    changeStateOption: AuthType;
  }
> = {
  login: {
    title: "Login to Sharamasa",
    fields: [
      {
        name: "email",
        type: "text",
        id: 1,
      },
      {
        name: "password",
        type: "password",
        id: 2,
      },
    ],
    oAuthTxt: "Login With Google",
    btnTxt: "Login",
    alternative: {
      parent: "Don't have an account?",
      child: "Signup",
    },
    changeStateOption: "signup",
  },
  signup: {
    title: "Signup to Sharamasa",
    fields: [
      {
        name: "name",
        type: "text",
        id: 1,
      },
      {
        name: "email",
        type: "text",
        id: 2,
      },
      {
        name: "phone number",
        type: "text",
        id: 3,
      },
      {
        name: "password",
        type: "password",
        id: 4,
      },
    ],
    oAuthTxt: "Sigup With Google",
    btnTxt: "Signup",
    alternative: {
      parent: "Already a user?",
      child: "Login",
    },
    changeStateOption: "login",
  },
};
