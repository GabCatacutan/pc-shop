// AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { auth, db } from "../config/firebase.ts";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {addDoc, collection} from "firebase/firestore"

// Define context type
interface AuthContextType {
  user: User | null;
  userDetails: Object | null;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
  handleSignUp: (email: string, password:string, phonenumber:string, fullname:string) => Promise<void>;
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
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login function
  const handleLogin = async (
    email: string,
    password: string
  ): Promise<void> => {
    try{
        await signInWithEmailAndPassword(auth, email, password);
        
    } catch {

    }

  };

  // Logout function
  const handleLogout = async (): Promise<void> => {
    await signOut(auth);
  };

  const handleSignUp = async (
    email: string,
    password: string,
    phonenumber: string,
    fullname: string,
  ): Promise<void>=> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    console.log("user_id", user.uid)

    const userData = {
      uid: user.uid,
      email: email,
      fullname: fullname,
      phonenumber:phonenumber,
    }

    console.log("userData", userData)
    await addDoc(collection(db, 'users'), userData)

  }

  return (
    <AuthContext.Provider value={{ user, userDetails, handleLogin, handleSignUp, handleLogout, loading }}>
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
