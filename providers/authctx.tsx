import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

type AutchContextType = {
    signIn: (userName: string) => void;
    signOut: VoidFunction;
    userNameSession?: string | null;
    isLoading: boolean;
};


const AuthContext = createContext<AutchContextType | undefined>(undefined);

export function useAuthSession() {
    const value = useContext(AuthContext);
    if (!value) {
        throw new Error(
            "UseAthSession must be used within an AuthProvider"
        )
    }

    return value;
}

export function AuthSessionProvider({ children }: { children: React.ReactNode}) {
    const [userSession, setUserSession] = useState<string | null>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem("authSession").then((value) => {
            setUserSession(value);
            setIsLoading(false);
        });
    }, []);

    return (
        <AuthContext value={{
            signIn: (userName: string) => {
                setUserSession(userName);
                AsyncStorage.setItem("authSession", userName);
            },
            signOut: () => {
                setUserSession(null);
                AsyncStorage.removeItem("authSession");
            },
            userNameSession: userSession,
            isLoading: isLoading,
        }}>
            {children}
        </AuthContext>
    )
}