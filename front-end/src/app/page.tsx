import { LoginForm } from "@/components/login-form";
import { RegisterForm } from "@/components/register-form";

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-10 mt-10">Welcome to Our Platform</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10 justify-center text-center items-center md:h-full">
        <div className="flex justify-center w-full">
          <LoginForm className="w-full" />
        </div>
        <div className="flex justify-center w-full">
          <RegisterForm className="w-full" />
        </div>
      </div>
    </>
  );
}
