import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { useAppState } from "../../hooks/AppContext";

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
        //if (item) Linking.openURL(item.link) 
    }

    if (!item) {
        return undefined
    }

    return (
        <ScrollView className="flex-1 bg-white p-6">
            <TouchableOpacity onPress={handlePress}>
                <Text>{item.name.common}</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}