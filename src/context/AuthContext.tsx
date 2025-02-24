// AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import supabase from "../config/supabase.ts";
import { User } from "@supabase/supabase-js"; // Import User type from Supabase

// Define context type
interface AuthContextType {
  user: User | null;
  userDetails: Object | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleSignUp: (
    email: string,
    password: string,
    phonenumber: string,
    fullname: string
  ) => Promise<void>;
  loading: boolean;
}

// Create context with a default value of null
const AuthContext = createContext<AuthContextType | null>(null);

// Define props for the AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Create provider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userDetails, setUserDetails] = useState<Object | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth event:", event, session);

        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }

        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Login function
  const handleLogin = async (email: string, password: string): Promise<void> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data?.user) {
        setUser(data.user);
      }

      alert("Login successful");
    } catch (e: unknown) {
      const error = e as Error;
      alert(`Login Unsuccessful: ${error.message}`);
    }
  };

  // Logout function
  const handleLogout = async (): Promise<void> => {
    await supabase.auth.signOut()
    await supabase.auth.refreshSession()
  };

  // Signup function
  const handleSignUp = async (
    email: string,
    password: string,
    phonenumber: string,
    fullname: string
  ): Promise<void> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        setUser(data.user); // Update user state immediately

        // Insert additional user data into DB
        // const { error: insertError } = await supabase.from("users").insert([
        //   {
        //     id: data.user.id,
        //     email,
        //     fullname,
        //     phonenumber,
        //   },
        // ]);
        // if(insertError){
        //   throw insertError
        // }
      }
    } catch (e: unknown) {
      const error = e as Error;
      console.error("Signup error:", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userDetails,
        handleLogin,
        handleSignUp,
        handleLogout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook for using AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
