import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLogginOut: false,
  isSigningIn: false,
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      console.log(response);
      set({ user: response.data.data.user, isSigningUp: false });
      toast.success("Account Created Successfully!");
    } catch (error) {
      set({ user: null, isSigningUp: false });
      toast.error(error.response.data.message || "An error occured!");
    }
  },

  login: async (credentials) => {
    set({isSigningIn: true});
    try {
        const response = await axios.post("/api/v1/auth/signin", credentials);
        console.log(response)
        set({user: response.data.data.user, isSigningIn: false});
        toast.success("You're Signed in successfully!");
    } catch (error) {
        console.log(error);
        set({isSigningIn: false, user:null});
        toast.error(error.response.data.message || "Sign in faild!");
    }
  },

  logout: async () => {
    set({ isLogginOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ isLogginOut: false, user: null });
      toast.success("Logged out successfully!");
    } catch (error) {
      set({ isLogginOut: false });
      toast.error(error.response.data.message || "Logout faild!");
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      console.log("response => ", response);
      set({ isCheckingAuth: false, user: response.data.user });
    } catch {
      set({ isCheckingAuth: false, user: null }); 
    }
  },
}));
