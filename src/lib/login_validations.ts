"use client";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase/config";
import { FirebaseError } from "firebase/app";
import { doc, getDoc } from "firebase/firestore";
import { redirect } from "next/navigation";

const signup = async (formData: any) => {
    // "use server";
    if (!formData.get("password")) {
        alert("Password is required");
        return;
    }
    //Show toast
    const username = formData.get("name").replaceAll(" ", "");
    const password = formData.get("password").replaceAll(" ", "");
    const phoneNumber = formData.get("phone number").replaceAll(" ", "");
    const email = formData.get("email").replaceAll(" ", "");
    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("User signed up");
        })
        .catch((e) => {
            if (e instanceof FirebaseError) {
                if (
                    e.code === "auth/invalid-credential" ||
                    e.code === "invalid-credential"
                ) {
                    alert("Invalid credentials, error: " + e.message);
                }
            }
        });

    if (auth.currentUser) {
        const body = JSON.stringify({
            userId: auth.currentUser.uid, name: username, email: email, phone: phoneNumber,
        });
        console.log(body);
        const request = await fetch("https://shramasa-server.onrender.com/api/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: body,
        });
        const response = await request.json();
        if (request.status === 200) {
            redirect("/");
        } else {
            alert("Error: " + response.error);
        }
    }
}

const login = async (formData: any) => {
    // "use server";
    if (!formData.get("password")) {
        alert("Password is required");
        return;
    }
    //Show toast
    const username = formData.get("email").replaceAll(" ", "");
    const password = formData.get("password").replaceAll(" ", "");
    await signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {

            // redirect("/dashboard");
            alert("Login successful");

        })
        .catch((e) => {
            if (e instanceof FirebaseError) {
                if (
                    e.code === "auth/invalid-credential" ||
                    e.code === "invalid-credential"
                ) {
                    alert("Invalid credentials, error: " + e.message);
                }
            }
        });
    if (auth.currentUser) {
        redirect("/");
    }
};

const isUserLoggedIn = async () => {

    if (localStorage.getItem("user") && auth.currentUser) {
        return true;
    }
    return false;
};

export { login, isUserLoggedIn, signup };