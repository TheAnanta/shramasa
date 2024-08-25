"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase/config";
import { FirebaseError } from "firebase/app";
import { doc, getDoc } from "firebase/firestore";
import { redirect } from "next/navigation";

const login = async (formData) => {
    // "use server";
    if (!formData.get("password")) {
        alert("Password is required");
        return;
    }
    //Show toast
    const username = formData.get("username").replaceAll(" ", "");
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

export { login, isUserLoggedIn };