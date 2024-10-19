import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppState } from "../../hooks/AppContext";
import { useDebouncedCallback } from "../../hooks/Debounce";

const nf = new Intl.NumberFormat('de-DE', {
    style: 'decimal',
    maximumFractionDigits: 0
})

export default function Page() {
    const { appState } = useAppState()
    const [searchQuery, setSearchQuery] = useState('')

    const [countries, setCountries] = useState<Country[]>([])
    useEffect(() => {
        setCountries([...appState.countries])
    }, [appState.countries])

    const doFilter = (text: string) => {
        const filtered = appState.countries.filter((item) => {
            return item.name.common.toLowerCase().includes(text.toLowerCase())
        })
        setCountries(filtered)
    }

    const debouncedCallback = useDebouncedCallback(doFilter, 300)
    const handleTextChange = (text: string) => {
        setSearchQuery(text)
        debouncedCallback(text)
    }
    console.log("rendering countries", countries.length)
    return (
        <SafeAreaView className="flex-1">
            <TextInput placeholder="Search..."
                className="m-4 p-2 border border-gray-300 rounded"
                value={searchQuery}
                onChangeText={handleTextChange} />
            <FlatList data={countries}
                className="bg-white pt-2"
                keyExtractor={(item) => item.name.common + item.cca3}
                renderItem={({ item }) => (<ItemRenderer item={item} />)} />
        </SafeAreaView>
    )
}

function ItemRenderer({ item }: { item: Country }) {
    const handlePress = () => {
        router.push("/details/" + item.cca3)
    }
    return (
        <TouchableOpacity onPress={handlePress}>
            <View className="p-2 ml-2 mr-4 my-1 pb-4 mb-4 rounded border-b border-gray-200">
                <View className="flex-row items-center">
                    <View
                        className={`border border-gray-300 w-24 h-16 shadow-lg`}
                        style={{
                            transform: [{ rotate: `${-9}deg` }]
                        }}
                    >
                        <Image
                            source={{ uri: item.flags.png }}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </View>
                    <View className="ml-8 flex-1">
                        <Text className="text-lg font-bold leading-extra-tight">{item.name.common}</Text>
                        <Text className="text-sm">{item.region} / {item.cca3}</Text>
                        <Text className="text-sm">Population: {nf.format(item.population)}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity >
    )
}

