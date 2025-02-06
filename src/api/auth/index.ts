import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { TLoginForm, TSignUpForm } from "../../model/index";

const auth = getAuth();

interface ILoginResponse {
  success: boolean;
  error?: string;
}

interface ISignUpResponse {
  success: boolean;
  userId?: string;
  error?: string;
}

export async function login({ email, password }: TLoginForm): Promise<ILoginResponse> {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function signup({
  email,
  password,
  name,
  companyCode,
}: TSignUpForm): Promise<ISignUpResponse> {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, {
      displayName: name,
      photoURL: companyCode,
    });
    return {
      success: true,
      userId: user.uid,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}
