import z from "zod";
export const applySchema=z.object({
    name:z.string().min(3,"name must contaoin at least 3 characters"),
    email:z.email("enter a valid email address"),
    coverLetter:z.string().min(20,"cover letter should be atleast 20 characters")
})
export type applyFormData=z.infer<typeof applySchema>;