import axios from "axios";
import { ENVIRONMENT_UTILITY } from "@/lib/constants/environment";

export const AuthApis = {
  loginUser: async (userData: { username: string; password: string }) => {
    try {
      const response = await axios.post(
        `${ENVIRONMENT_UTILITY.NEXT_PUBLIC_BACKEND_API}/api/signin`,
        userData
      );
      return {
        success: true,
        statusCode: response.status,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        statusCode: error?.response?.status,
        message: error?.response?.data?.message || error.message,
      };
    }
  },
  signupUser: async (userData: {
    email: string;
    password: string;
    username: string;
    roles: string[];
  }) => {
    try {
      const response = await axios.post(
        `${ENVIRONMENT_UTILITY.NEXT_PUBLIC_BACKEND_API}/api/signup`,
        userData
      );

      return {
        success: true,
        statusCode: response.status,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        statusCode: error?.response?.status,
        message: error?.response?.data?.message || error.message,
      };
    }
  },
};
