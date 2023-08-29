import React , { createContext , useContext , useState, useEffect} from "react";
import { UserCredential , User , signOut , signInWithPopup } from "@firebase/auth";
import { auth , provider } from "../FirebaseConfig";
import Cookies from "universal-cookie";
const cookies = new Cookies();

interface AuthContextProps {
    isAuth: boolean;
    user: User | null;
    signIn: () => void;
    signOut: () => void;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

 export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuth, setIsAuth] = useState<boolean>(false);

    useEffect(() => {
        // Try to get the user's UID from the cookie
        const storedUid = cookies.get("auth");
    
        if (storedUid) {
          // If the UID is stored, fetch the user data from Firebase using the UID
          const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
            if (authUser) {
              setUser(authUser);
            } else {
              setUser(null);
            }
          });
    
          // Clean up the subscription
          return () => unsubscribe();
        } else {
          // If no UID is stored, the user is not authenticated
          setUser(null);
        }
      }, []);

    const signIn = async () => {
        try {
            const result: UserCredential = await signInWithPopup(auth, provider);
            setUser(result.user);
            setIsAuth(true);
            cookies.set("user", result.user, { path: "/" });
        } catch (error) {
            console.log(error);
        }
    };

    const signOutUser = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setIsAuth(false);
            cookies.remove("user");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const cookieUser = cookies.get("user");
        if (cookieUser) {
            setUser(cookieUser);
            setIsAuth(true);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuth, user, signIn, signOut: signOutUser }}>
            {children}
        </AuthContext.Provider>
    );
};