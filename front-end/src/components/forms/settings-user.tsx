"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { userService } from "@/services/userService";
import { User } from "@/types/user";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import z from "zod";

export function SettingsForm({ className, ...props }: React.ComponentProps<"div">) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    toast.dismiss();
    e.preventDefault();
    setLoading(true);

    try {
      const updatedUser = User.parse({ newPassword, confirmPassword });

      if (updatedUser) {
        const response = await userService.update({
          password: newPassword,
        });

        if (response) {
          toast.success("Senha atualizada com sucesso!");
          setNewPassword("");
          setConfirmPassword("");
        } else {
          toast.error("Falha na atualização. Tente novamente.");
        }
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
          <CardTitle>Atualizar dados</CardTitle>
          <CardDescription>
            Insira seus dados abaixo para atualizar suas informações
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="newPassword">Nova senha</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="passwordConfirm">Confirme a senha</Label>
                <Input
                  id="passwordConfirm"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Atualizando..." : "Atualizar dados"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
