import { z } from "zod";
import { loginFormSchema } from "../../schema/authSchema/login.schema";

export type TLoginForm = z.infer<typeof loginFormSchema>;
