import { Image, ImageSourcePropType, Linking, ScrollView, Text, View } from "react-native";
import imagePath from "../../assets/images/alkmaar_small_layer.png";

const a = imagePath
console.log(a) // set breakpoint here and run your
export default function Page() {
    const email = "stepan.rutz@gmx.de"
    const phone = "+49 123 4567890"
    const handleEmailPress = () => Linking.openURL('mailto:' + email)
    const handlePhonePress = () => Linking.openURL('tel:' + phone)
    const imageSource: ImageSourcePropType = require('../../assets/images/alkmaar_small_layer.png');

    return (
        <ScrollView className="flex-1 bg-white">
            <View className="relative w-full h-[250px]">
                <Image source={imageSource} className="z-0 w-full h-[250px]" />
                <Text className="text-6xl text-blue-600 font-bold mb-1 uppercase tracking-tighter absolute bottom-5 px-4">About Ardnews</Text>
            </View>
            <View className="p-4">

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
    )
}