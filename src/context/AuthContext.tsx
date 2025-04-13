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
import { useNavigate } from "react-router-dom";

// Define context type
interface AuthContextType {
  user: User | null;
  userDetails: Object | null;
  role: string | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleSignUp: (
    email: string,
    password: string,
    fullname: string,
    phonenumber: string,
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
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [userDetails, setUserDetails] = useState<Object | null>(null);

  const fetchUserDetails = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("full_name, phone_number, role")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching user details:", error.message);
        return;
      }
      
      setUserDetails(data);
      setRole(data.role || "customer"); // Default role is 'customer'
      setLoading(false);

    } catch (error) {
      console.error("Unexpected error fetching user details:", error);
    }
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth event:", event, session);

        if (session?.user) {
          setUser(session.user);
          fetchUserDetails(session.user.id)
        } else {
          setUser(null);
          setLoading(false);
        }
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
        fetchUserDetails(data.user.id)
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
    window.location.href = '/';
  };

  // Signup function
  const handleSignUp = async (
    email: string,
    password: string,
    full_name: string,
    phone_number: string
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
        const { error: insertUserError } = await supabase.from("users").insert([
          {
            id: data.user.id,
            email,
            full_name,
            phone_number,
          },
        ]);
        if(insertUserError){
          throw insertUserError
        }
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
        role,
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
