import { Linking, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Page() {
    const email = "stepan.rutz@gmx.de"
    const phone = "+49 123 4567890"
    const handleEmailPress = () => Linking.openURL('mailto:' + email)
    const handlePhonePress = () => Linking.openURL('tel:' + phone)

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 p-6">
                <View>
                    <Text className="text-3xl font-bold mb-4 text-blue-600">About Ardnews</Text>

                    <Text className="text-lg mb-6 text-gray-700">
                        This is a simple news reader app that fetches news from an RSS feed and displays them in a list.
                        The RSS Feed is fetched from the ARD Tagesschau website.
                    </Text>

                    <View className="mb-4">
                        <Text className="text-xl font-semibold mb-2 text-blue-600">Contact Us</Text>
                        <Text className="text-base text-gray-700 mb-1" onPress={handleEmailPress}>
                            Email: {email}
                        </Text>
                        <Text className="text-base text-gray-700" onPress={handlePhonePress}>
                            Phone: {phone}
                        </Text>
                    </View>
                    <View className="mb-4">
                        <Text className="text-xl font-semibold mb-2 text-blue-600">Techstack</Text>
                        <Text className="text-lg mb-6 text-gray-700">
                            Techstack for this app:
                            React, React Native, Expo, Expo-Router, NativeWind, TypeScript, xmldom, xml2js
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}