import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { NewsItem } from "../../components/NewsLoader";
import { useAppState } from "../../hooks/AppContext";

export default function Page() {
    const params = useLocalSearchParams()
    const id = Number.parseInt(params.itemid as string)
    const navigation = useNavigation()
    const { appState } = useAppState()
    const item = appState.newsItems.find((item) => item.id === id)!
    const [newsItem, setNewsItem] = useState<NewsItem>(item)
    useEffect(() => {
        navigation.setOptions({
            title: newsItem.title
        })
    }, [navigation, newsItem])

    return (
        <ScrollView className="flex-1 bg-white p-6">
            <View className="flex gap-2">
                <Text className="text-3xl font-bold mb-4 text-blue-600">{newsItem.title}</Text>
                <Text className="text-sm mb-6 text-gray-700">
                    {newsItem.pubDate}
                </Text>
                <Text className="text-lg mb-6 text-gray-700">
                    {newsItem.description}
                </Text>
            </View>
        </ScrollView>
    )
}