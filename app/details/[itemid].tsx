import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Image, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useAppState } from "../../hooks/AppContext";

export default function Page() {
    const params = useLocalSearchParams()
    const id = Number.parseInt(params.itemid as string)
    const navigation = useNavigation()
    const { appState } = useAppState()
    const item = appState.newsItems.find((item) => item.id === id)
    useEffect(() => {
        navigation.setOptions({
            title: item?.title || ""
        })
    }, [navigation, item])

    const handlePress = () => { if (item) Linking.openURL(item.link) }

    if (!item) {
        return undefined
    }

    return (
        <ScrollView className="flex-1 bg-white p-6">
            <TouchableOpacity onPress={handlePress}>
                <View className="flex gap-2">
                    <Text className="text-3xl font-bold mb-4 text-blue-600">{item.title}</Text>
                    <Text className="text-sm mb-6 text-gray-700">
                        {item.pubDate}
                    </Text>
                    <Text className="text-lg mb-6 text-gray-700">
                        {item.description}
                    </Text>
                    {item.images.map((image, index) => (
                        <View key={index} className="mr-2">
                            <Image className="w-full h-[256px]" resizeMode="contain" source={{ uri: image }} />
                        </View>
                    ))}
                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}