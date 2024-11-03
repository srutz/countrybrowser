import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Image, Linking, ScrollView, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import MapView, { Marker, Region } from "react-native-maps";
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

    // map, calculate region based on area, lets hope the country is a square and not chile
    const areaRoot = Math.sqrt(item?.area || 0) * 1.25
    const [region, setRegion] = useState<Region | undefined>(calculateRegion(item?.latlng[0], item?.latlng[1], areaRoot))
    const bottomSheet = useRef<BottomSheet>(null)
    const snapPoints = useMemo(() => [20, 120], [])

    const handlePress = () => {
        const link = appState.isoCodes.find((code) => code.cca3 === item?.cca3)
        if (link) {
            Linking.openURL("https://en.wikipedia.org" + link?.href)
        }
    }
    if (!item) {
        return undefined
    }
    return (
        <GestureHandlerRootView className="flex-1 w-full bg-gray-200">
            <ScrollView className="flex-1 p-6">
                <View className="flex-1 w-full">
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
                            <LabelText >{formatNumber(item.area)} km²</LabelText>
                            <LabelText >{formatNumber(item.population)} People</LabelText>
                            <LabelText >{formatNumber(item.population / item.area)} People/km²</LabelText>
                        </View>
                    </View>
                </View>
                <View className="bg-white w-full h-[600] mt-4">
                    <MapView className="flex-1" region={region} >
                        {item.capitalInfo.latlng && item.capitalInfo.latlng.length >= 2 && (
                            <Marker
                                coordinate={{ latitude: item.capitalInfo.latlng[0], longitude: item.capitalInfo.latlng[1] }}
                                title={item.capital[0]}
                                description={item.region + " " + item.subregion}
                            />
                        )}
                    </MapView>
                </View>
            </ScrollView>
            <BottomSheet ref={bottomSheet} snapPoints={snapPoints} enablePanDownToClose={false}>
                <BottomSheetView style={{ flex: 1 }}>
                    <View className="flex flex-row justify-center">
                        <Button title="Open Wikipedia" onPress={handlePress} />
                    </View>
                </BottomSheetView>
            </BottomSheet>
        </GestureHandlerRootView>
    )
}

function LabelText({ children }: { children: React.ReactNode }) {
    return (
        <Text className="text-gray-700 mb-2">{children}</Text>
    )
}