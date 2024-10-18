import { Stack } from "expo-router";

import { NativeWindStyleSheet } from "nativewind";
import { AppStateProvider } from "../hooks/AppContext";

NativeWindStyleSheet.setOutput({
    default: "native",
})

export default function RootLayout() {
    return (
        <AppStateProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="details/[itemid]" options={{ headerShown: true }} />
            </Stack>
        </AppStateProvider>
    )
}
