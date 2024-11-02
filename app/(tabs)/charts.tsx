import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { BarChart } from "../../components/BarCharts";
import { useAppState } from "../../hooks/AppContext";
import { formatNumber } from "../../utils/Utils";

// get some colors from tailwind
const indigoColors = [
    "#edf2f7",
    "#dbe4ff",
    "#bac8ff",
    "#91a7ff",
    "#748ffc",
    "#5c7cfa",
    "#4c6ef5",
    "#4263eb",
    "#3b5bdb",
]

const orangeColors = [
    "#fff4e6",
    "#ffe8cc",
    "#ffd8a8",
    "#ffbb85",
    "#ff9e66",
    "#ff7a45",
    "#ff6f3d",
    "#fa5c00",
    "#f5521d",
]

const greenColors = [
    /*
    "#f0fff4",
    "#c6f6d5",
    "#9ae6b4",
    */
    "#68d391",
    "#48bb78",
    "#38a169",
    "#2f855a",
    "#276749",
    "#22543d",
]

const DATA = Array.from({ length: 31 }, (_, i) => ({
    day: i,
    highTmp: 40 + 30 * Math.random(),
}));

export type PopulationRecord = {
    region: string
    population: number
    countries: Country[]
}

export default function Page() {

    const { appState } = useAppState()

    const totalPopulation = appState.countries.reduce((acc, item) => acc + item.population, 0)

    // group population by region and put grouped items into an array
    const grouped = appState.countries.reduce((acc, item) => {
        const key = item.region
        if (!acc[key]) {
            acc[key] = []
        }
        acc[key].push(item)
        return acc
    }, {} as { [key: string]: Country[] })

    // make an array of records of type PopulationRecord
    const records = Object.keys(grouped).map((key, index) => {
        const countries = grouped[key]
        const population = countries.reduce((acc, item) => acc + item.population, 0)
        return { 
            region: key, 
            population,
            populationPercentage: population / totalPopulation * 100, 
            countries, 
            color: greenColors[index % greenColors.length] }
    })
    records.sort((a, b) => b.population - a.population)


    // make an array of records of type PieChartRecord
    const data = records.map(item => ({ 
        label: item.region, // + " " + formatNumber(item.population / 1_000_000) + " Mio", 
        value: item.population, 
        color: item.color }))
    

    return (
        <View className="flex-1 bg-white items-center gap-4 mt-4 ">
            <Text className="text-lg font-bold">Population by Region</Text>
            <View>
                <BarChart data={data}></BarChart>
            </View>
            <FlatList data={records}
                className="w-full flex-1"
                renderItem={({ item }) => (
                    <View className="px-8 w-full mb-2 pb-2 border-b border-gray-300">
                        <View className="flex-row items-center justify-start gap-4">
                            <Text className="text-gray-400 text-3xl uppercase w-32 text-right">{item.populationPercentage.toFixed(2)}%</Text>
                            <View className="grow gap-1">
                                <Text className="w-full font-bild text-right">{item.region}</Text>
                                <Text className="w-full text-right">{formatNumber(item.population)} People</Text>
                            </View>
                        </View>
                    </View>
                )} 
                keyExtractor={(item) => item.region}>
            </FlatList>
        </View>
    )
}

