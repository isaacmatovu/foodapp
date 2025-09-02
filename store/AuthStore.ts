import { account, ID } from "@/lib/appwrite";
import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logOut: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  //initial state values
  isLoggedIn: false,
  user: null,
  isLoading: true,
  error: null,

  //login function
  login: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      await account.createEmailPasswordSession(email, password);
      //get user data
      const user = await account.get();
      //update state
      set({
        isLoggedIn: true,
        user: { id: user.$id, name: user.name, email: user.email },
        isLoading: false,
      });
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message, isLoading: false }); //show error
    }
  },

  register: async (email, password, name) => {
    set({ isLoading: true, error: null });

    try {
      //create account
      await account.create(ID.unique(), email, password, name);

      //log in user automatically
      await account.createEmailPasswordSession(email, password);
      //get user data
      const user = await account.get();

      //update state
      set({
        isLoggedIn: true,
        user: {
          id: user.$id,
          name: user.name,
          email: user.email,
        },
        isLoading: false,
      });
    } catch (error) {
      if (error instanceof Error)
        set({ error: error.message, isLoading: false });
    }
  },

  logOut: async () => {
    try {
      await account.deleteSession("current"); //clear current session
      set({ isLoggedIn: false, user: null }); //reset state
    } catch (error) {
      if (error instanceof Error) set({ error: error.message });
    }
  },

  //checking session
  checkSession: async () => {
    try {
      const user = await account.get(); //try to get user data
      set({
        isLoggedIn: true,
        user: { id: user.$id, name: user.name, email: user.email },
        isLoading: false,
      });
    } catch (error) {
      if (error instanceof Error)
        set({
          isLoading: false,
          error: (error.message = "Check your internet connection"),
        });
    }
  },
}));

//check session on initial load
useAuthStore.getState().checkSession();
