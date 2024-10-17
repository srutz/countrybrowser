import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
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
                    keyExtractor={(item) => item.link}
                    renderItem={({ item }) => (<NewsItemRenderer item={item} />)} />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

function NewsItemRenderer({ item }: { item: NewsItem }) {
    return (
        <View className="p-2 m-2 rounded-lg bg-slate-200">
            <Text className="text-lg font-bold tracking-tight leading-">{item.title}</Text>
            <Text className="text-sm">{item.pubDate}</Text>
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