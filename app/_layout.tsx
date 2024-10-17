import { Stack } from "expo-router";

import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
    default: "native",
})

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: true, headerTitle: "ARD Newsstream" }} />
        </Stack>
    )
}
