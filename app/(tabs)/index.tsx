import { router } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NewsItem } from "../../components/NewsLoader";
import { useAppState } from "../../hooks/AppContext";

export default function Page() {
    const { appState, setAppState } = useAppState()
    return (
        <SafeAreaProvider>
            <SafeAreaView className="flex-1">
                <FlatList data={appState.newsItems}
                    className="bg-white pt-2"
                    keyExtractor={(item) => item.link}
                    renderItem={({ item }) => (<NewsItemRenderer item={item} />)} />
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

function NewsItemRenderer({ item }: { item: NewsItem }) {
    const handlePress = () => {
        router.push("/details/" + item.id)
    }
    return (
        <TouchableOpacity onPress={handlePress}>
            <View className="p-2 ml-2 mr-4 my-1 rounded-lg bg-slate-200">
                <View className="flex flex-row gap-4">
                    {item.images.length > 0
                        ? (
                            <Image className="w-[96] rounded" resizeMode="contain" source={{ uri: item.images[0] }}></Image>
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
        </TouchableOpacity>
    )
}

