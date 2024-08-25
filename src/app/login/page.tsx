import { login } from "@/lib/login_validations";

export default function Page() {
  return (
    <main className="h-screen w-screen flex">
      <div className="w-max h-max my-auto mx-auto">
        <form className="p-8 flex flex-col gap-2">
          <h2>Login</h2>
          <input
            name="username"
            placeholder="username"
            required={true}
            type="email"
            className="border border-black px-6 py-2 rounded-lg"
          />
          <input
            name="password"
            placeholder="password"
            className="border border-black px-6 py-2 rounded-lg"
          />
          <div className="flex flex-row-reverse">
            <button
              formAction={login}
              className="bg-black text-white w-max px-6 py-2 rounded-xl"
            >
              Login
            </button>
            {/* <button
              formAction={forgotPassword}
              className="w-max px-6 py-2 rounded-xl"
            >
              Forgot Password
            </button> */}
          </div>
        </form>
      </div>
    </main>
  );
}
