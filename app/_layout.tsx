import { Slot } from "expo-router";
import { AuthSessionProvider } from "@/providers/authctx";

export default function RootRootLayout() {
    return (
        <AuthSessionProvider>
            <Slot />
        </AuthSessionProvider>
    )
}