import z from "zod";

export const userSchema = z.object({
    userName : z.string().trim().min(4,"userName must be more than 4 characters"),
    password : z.string().min(4,"Password must be more than 4 letters")
});

export type userT= z.infer<typeof userSchema>;