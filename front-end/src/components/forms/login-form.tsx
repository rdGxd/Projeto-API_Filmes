"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { api } from "@/services/api";
import { loginUser, LoginUser } from "@/types/loginForm";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import z from "zod";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
  const route = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    toast.dismiss();
    e.preventDefault();
    setIsLoading(true);

    try {
      const loginData: LoginUser = loginUser.parse({ email, password });

      const { data } = await api.post("auth/login", loginData);
      if (data) {
        Cookies.set("accessToken", data.accessToken);
        toast.success("Login successful!");
        route.push("/dashboard");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (err: any) {
      if (err instanceof z.ZodError) {
        // Mensagens detalhadas do Zod
        const messages = err.issues.map((e) => e.message).join(", ");
        toast.error(messages);
      } else if (err.response?.data?.message) {
        // Mensagens do backend
        toast.error(err.response.data.message);
      } else {
        toast.error("Falha no cadastro. Tente novamente.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="emailLogin">Email</Label>
                <Input
                  id="emailLogin"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={IsLoading}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="passwordLogin">Password</Label>
                  <Link href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="passwordLogin"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={IsLoading}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={IsLoading}>
                  {IsLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
