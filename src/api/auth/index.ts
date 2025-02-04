import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { TLoginForm } from "../../model/index";

interface ILoginResponse {
  success: boolean;
  error?: string;
}

export async function login({ email, password }: TLoginForm): Promise<ILoginResponse> {
  try {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}
