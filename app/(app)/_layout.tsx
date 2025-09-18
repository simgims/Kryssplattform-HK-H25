import { useFonts } from "expo-font";
import { Redirect, Stack } from "expo-router";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { AuthSessionProvider, useAuthSession } from "@/providers/authctx";
import { Text, View } from "react-native";

export default function RootLayout() {
	const { userNameSession, isLoading } = useAuthSession();

	if (!userNameSession) {
    return <Redirect href={"/authentication"}/>
  }

  if (isLoading) {  
    return (
      <View>
        <Text>Henter bruker...</Text>
      </View>
    );
  }

	return (
		<AuthSessionProvider>
			<Stack>
				<Stack.Screen
					name="(tabs)"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen name="+not-found" />
				<Stack.Screen name="post-details" />
				<Stack.Screen name="declarations" />
				<Stack.Screen name="post-details/[id]" />
			</Stack>
		</AuthSessionProvider>
	);
}
