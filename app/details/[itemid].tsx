import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Linking, ScrollView, Text, TouchableOpacity, View } from "react-native";
import MapView, { Region } from "react-native-maps";
import { useAppState } from "../../hooks/AppContext";
import { calculateRegion, formatNumber } from "../../utils/Utils";

export default function Page() {
    const params = useLocalSearchParams()
    const id = params.itemid as string
    const navigation = useNavigation()
    const { appState } = useAppState()
    const item = appState.countries.find((item) => item.cca3 === id)
    useEffect(() => {
        navigation.setOptions({
            title: item?.name?.common || ""
        })
    }, [navigation, item])

    const handlePress = () => {
        const link = appState.isoCodes.find((code) => code.cca3 === item?.cca3)
        if (link) {
            Linking.openURL("https://en.wikipedia.org" + link?.href) 
        }
    }
    
    // map
    const [region, setRegion] = useState<Region|undefined>(calculateRegion(item?.latlng[0], item?.latlng[1], 1000))

    if (!item) {
        return undefined
    }
    //const uri = item.maps.openStreetMaps
    const uri = "https://www.stepanrutz.com/cv.pdf"
    return (
        <ScrollView className="flex-1 p-6">
            <View className="flex-1 w-full">
                <TouchableOpacity onPress={handlePress}>
                    <View className="flex-row items-start">
                        <View className="">
                            <View className="w-24 h-16 border border-2 border-gray-300">
                                <Image
                                    source={{ uri: item.flags.png }}
                                    className="w-full h-full"
                                    resizeMode="cover"
                                />
                            </View>
                            <View className="w-24 h-16 mt-8">
                                <Image
                                    source={{ uri: item.coatOfArms.png }}
                                    className="w-full h-full"
                                    resizeMode="contain"
                                />
                            </View>
                        </View>
                        <View className="flex-1 justify-start ml-6">
                            <Text className="text-2xl">{item.name.common}</Text>
                            <Text className="text-lg mb-4">{item.name.official}</Text>
                            <LabelText >Region: {item.region}</LabelText>
                            <LabelText >Subregion: {item.subregion}</LabelText>
                            <LabelText >Capital: {item.capital}</LabelText>
                            <LabelText >{item.area} km²</LabelText>
                            <LabelText >{formatNumber(item.population)} People</LabelText>
                            <LabelText >{formatNumber(item.population / item.area)} People/km²</LabelText>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <View className="bg-red-500 w-full h-[500]">
                <MapView className="flex-1" region={region} ></MapView>
            </View>
        </ScrollView>
    )
}

function LabelText({ children }: { children: React.ReactNode }) {
    return (
        <Text className="text-gray-700 mb-2">{children}</Text>
    )
}