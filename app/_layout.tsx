import { Slot } from "expo-router";
import { AuthSessionProvider, useAuthSession } from "@/providers/authctx";

export default function RootRootLayout() {



    return (
        <AuthSessionProvider>
            <Slot />
        </AuthSessionProvider>
    )
}