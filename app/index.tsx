import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { loadNewsFeed } from "../components/NewsLoader";

export default function Page() {

    useEffect(() => {
        (async () => {
            const items = await loadNewsFeed()
            console.log("items", items)
        })()

    }, [])

    return (
        <View className="bg-1 h-full">
            <Text className="text-2xl uppercase">Wexxlcome 1111223</Text>
            <ScrollView>
                <View className="w-full min-h-[85%] bg-2">
                    <Text className="text-2xl uppercase">Welcome 1111223</Text>
                </View>
            </ScrollView>
        </View>
    )


}