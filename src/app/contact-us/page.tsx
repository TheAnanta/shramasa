"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState("");
  const [responseState, setResponseState] = useState(false);
  const router = useRouter();

  return (
    <div>
      {responseState ? (
        <div className="mx-8 lg:mx-96 flex flex-col items-center">
          <div className="mx-auto w-20 aspect-square rounded-full bg-[#005AC1] dark:bg-[#D2E3FC] bg-opacity-10 dark:bg-opacity-10 mb-12">
            <img src="/wink-memoji.png" className="p-2" />
          </div>
          <span className="mb-4 text-3xl text-blue-900 dark:text-blue-50">
            Thank you!
            <br />
          </span>
          <h1 className="text-4xl lg:text-5xl text-center">
            I&apos;ve{" "}
            <span className="underline leading-[1.3em] decoration-blue-600/20 dark:decoration-blue-600/40">
              recieved
            </span>{" "}
            your response.
          </h1>
          <h2 className="my-6">
            I&apos;ll get back to you real soon, probably in the next 24 hours!
          </h2>
          <button
            onClick={async () => {
              router.push("/");
            }}
            className="bg-black dark:bg-white text-white dark:text-black px-10 py-3 rounded-full uppercase my-12"
          >
            <span className="material-symbols-rounded inline-flex w-4 h-4 mr-4">
              arrow_backward
            </span>
            Back Home
          </button>
        </div>
      ) : (
        <div className="mx-8 lg:mx-96 flex flex-col items-center">
          <div className="mx-auto w-20 aspect-square rounded-full bg-[#005AC1] dark:bg-[#D2E3FC] bg-opacity-10 dark:bg-opacity-10 mb-12">
            <img src="/wink-memoji.png" className="p-2" />
          </div>
          <h1 className="text-4xl lg:text-5xl text-center">
            <span className="underline leading-[1.3em] decoration-[#FBBC04]/20 dark:decoration-[#FBBC04]/40">
              Hello!
            </span>{" "}
            We&apos;ve been
            <br />
            waiting for you.
          </h1>
          <h2 className="my-6">
            Fill in the form or{" "}
            <a
              href="mailto:me@manasmalla.dev"
              className="underline font-semibold"
            >
              Send us an email
            </a>
          </h2>
          <input
            id="standard-basic"
            placeholder="What's your name?"
            className="w-full"
            value={name}
            onChange={(_) => {
              setName(_.target.value);
            }}
          />
          <div className="h-4" />
          <input
            id="standard-basic"
            placeholder="Your email"
            className="w-full"
            value={email}
            onChange={(_) => {
              setEmail(_.target.value);
            }}
          />
          <div className="h-4" />
          <input
            id="standard-basic"
            value={response}
            onChange={(_) => {
              setResponse(_.target.value);
            }}
            placeholder="Tell me about your project"
            className="w-full"
          ></input>
          <button
            onClick={async () => {
              // const contactFormInstance = new Parse.Object("Contact");
              // //Define its attributes
              // contactFormInstance.set("name", name);
              // contactFormInstance.set("email", email);
              // contactFormInstance.set("response", response);
              // try {
              //   //Save the Object
              //   let result = await contactFormInstance.save();
              //   setResponseState(true);
              // } catch (error) {
              //   alert("Failed to submit feedback. Please try later.");
              // }
            }}
            className="bg-black dark:bg-white text-white dark:text-black px-12 py-3 rounded-full uppercase my-12"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
