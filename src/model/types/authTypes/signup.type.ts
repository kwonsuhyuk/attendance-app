import { z } from "zod";
import { signupFormSchema, signupUserDataSchema } from "../../schema/authSchema/signup.schema";

export type TSignupFormData = z.infer<typeof signupFormSchema>;
export type TSignupUserData = z.infer<typeof signupUserDataSchema>;
