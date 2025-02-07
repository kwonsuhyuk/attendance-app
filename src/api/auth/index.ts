import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { TLoginForm, TSignUpForm, TLoginResponse, TSignUpResponse } from "../../model/index";

const auth = getAuth();

export async function login({ email, password }: TLoginForm): Promise<TLoginResponse> {
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
  phoneNumber,
}: TSignUpForm): Promise<TSignUpResponse> {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, {
      displayName: name,
      photoURL: companyCode,
    });
    return {
      success: true,
      data: { userId: user.uid },
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}
