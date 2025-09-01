import z from "zod";

export const loginUser = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginUser = z.infer<typeof loginUser>;
