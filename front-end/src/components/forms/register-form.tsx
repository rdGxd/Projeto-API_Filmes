"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { api } from "@/services/api";
import { registerUser, RegisterUser } from "@/types/registerForm";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import z from "zod";

export function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    toast.dismiss();
    e.preventDefault();
    setLoading(true);

    try {
      const registerData: RegisterUser = registerUser.parse({ name, email, password });

      const response = await api.post("/user", registerData);

      if (response.status === 201) {
        toast.success("Cadastro realizado com sucesso!");
        setName("");
        setEmail("");
        setPassword("");
      } else {
        toast.error("Falha no cadastro. Tente novamente.");
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
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Criar conta</CardTitle>
          <CardDescription>Insira seus dados abaixo para criar sua conta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="nameRegister">Nome</Label>
                <Input
                  id="nameRegister"
                  type="text"
                  placeholder="João Silva"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="emailRegister">Email</Label>
                <Input
                  id="emailRegister"
                  type="email"
                  placeholder="exemplo@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="passwordRegister">Senha</Label>
                <Input
                  id="passwordRegister"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Criando conta..." : "Criar conta"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
