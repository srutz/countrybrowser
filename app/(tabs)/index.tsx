import { MaterialIcons } from '@expo/vector-icons';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Modal, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppState } from "../../hooks/AppContext";
import { useDebouncedCallback } from "../../hooks/Debounce";
import { formatNumber } from "../../utils/Utils";


const sortOptions = [
    { label: 'Population - Largest first', comp: (a: Country, b: Country) => b.population - a.population },
    { label: 'Population - Smallest first', comp: (a: Country, b: Country) => a.population - b.population },
    { label: 'Area - Largest first', comp: (a: Country, b: Country) => b.area - a.area },
    { label: 'Area - Smallest first', comp: (a: Country, b: Country) => a.area - b.area },
    { label: 'A-Z', comp: (a: Country, b: Country) => a.name.common.localeCompare(b.name.common) },
]


export default function Page() {
    const { appState } = useAppState()
    const [searchQuery, setSearchQuery] = useState('')
    const [sortModalVisible, setSortModalVisible] = useState(false)
    const [sortMode, setSortMode] = useState(0)

    const [countries, setCountries] = useState<Country[]>([])
    useEffect(() => {
        const countries = [...appState.countries]
        countries.sort(sortOptions[sortMode].comp)
        setCountries(countries)
        setSortModalVisible(false)
        setSearchQuery('')
    }, [appState.countries, sortMode])

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
    //console.log("rendering countries", countries.length)
    return (
        <SafeAreaView className="flex-1">
            <View className="flex-row items-center justify-between">
                <TextInput placeholder="Search..."
                    className="grow m-4 p-2 border border-gray-300 rounded"
                    value={searchQuery}
                    onChangeText={handleTextChange} />
                <TouchableOpacity className="pr-2" onPress={() => setSortModalVisible(true)}>
                    <MaterialIcons name="sort" size={32} />
                </TouchableOpacity>
            </View>
            <FlatList data={countries}
                className="bg-white pt-2"
                keyExtractor={(item) => item.name.common + item.cca3}
                renderItem={({ item }) => (<ItemRenderer item={item} />)} />
            {/* Sort Modal */}
            <Modal animationType="slide" transparent={true} visible={sortModalVisible} onRequestClose={() => setSortModalVisible(false)} >
                <Pressable className="flex justify-end" onPress={() => setSortModalVisible(false)}>
                    <View className="bg-gray-900 opacity-90 rounded-lg">
                        <Text className="text-white p-4">Sort countries by:</Text>

                        {sortOptions.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                className="p-4 border-b border-gray-400"
                                onPress={() => setSortMode(index)} >
                                <Text className={"text-white font-lg " + (index == sortMode ? "font-bold" : "")}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Pressable>
            </Modal>
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
                        style={{ transform: [{ rotate: `${-9}deg` }] }}>
                        <Image
                            source={{ uri: item.flags.png }}
                            className="w-full h-full"
                            resizeMode="cover" />
                    </View>
                    <View className="ml-8 flex-1">
                        <Text className="text-lg font-bold leading-extra-tight">{item.name.common}</Text>
                        <Text className="text-sm">Population {formatNumber(item.population)}</Text>
                        <View className="flex flex-row justify-between">
                            <Text className="text-sm">Area {formatNumber(item.area)} km²</Text>
                            <Text className="text-sm">{item.region} / {item.cca3}</Text>
                            </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

