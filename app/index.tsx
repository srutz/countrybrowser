import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { loadNewsFeed, NewsItem } from "../components/NewsLoader";

export default function Page() {

    const [newsItems, setNewsItems] = useState<NewsItem[]>([])

    useEffect(() => {
        (async () => {
            const items = await loadNewsFeed()
            //console.log("items", items)
            setNewsItems(items)
        })()

    }, [])

    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1">
                <FlatList data={newsItems}
                    className="bg-white"
                    keyExtractor={(item) => item.link}
                    renderItem={({ item }) => (<NewsItemRenderer item={item} />)} />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

function NewsItemRenderer({ item }: { item: NewsItem }) {
    return (
        <View className="p-2 ml-2 mr-4 my-1 rounded-lg bg-slate-200">
            <View className="flex flex-row gap-4">
                {item.images.length > 0
                ? (
                    <Image className="w-[96] rounded" resizeMode="contain" source={{ uri: item.images[0]}}></Image>
                )
                : (
                    null
                )}
                <View className="w-1 grow">
                    <Text className="font-bold tracking-tight">{item.title}</Text>
                    <Text className="text-sm">{item.pubDate}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});