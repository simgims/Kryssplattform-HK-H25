import { signIn, signOut } from "@/api/authApi";
import { auth } from "@/firebaseConfig";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

type AuthContextType = {
  signIn: (userName: string) => void;
  signOut: VoidFunction;
  userNameSession?: string | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthSession() {
	const value = useContext(AuthContext);
	if (!value) {
		throw new Error(
			"UseAuthSession must be used within an AuthContext Porivder"
		);
	}

	return value;
}

export function AuthSessionProvider({ children }: { children: ReactNode }) {
	const [userSession, setUserSession] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const router = useRouter();

  useEffect(() => {
    AsyncStorage.getItem("authSession").then((value) => {
      setUserSession(value);
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext
      value={{
        signIn: (userName: string) => {
          setUserSession(userName);
          AsyncStorage.setItem("authSession", userName);
          router.replace("/");
        },
        signOut: () => {
          setUserSession(null);
          AsyncStorage.removeItem("authSession");
        },
        userNameSession: userSession,
        isLoading: isLoading,
      }}
    >
      {children}
    </AuthContext>
  );
}

type AutchContextType = {
	signIn: (userName: string) => void;
	signOut: VoidFunction;
	userNameSession?: string | null;
	isLoading: boolean;
};
