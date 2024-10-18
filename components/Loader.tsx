
import countriesRaw from "../assets/data/allcountries.json";
const countries = (countriesRaw as unknown as Country[]).toSorted(
    (a, b) => 
        //a.name.common.localeCompare(b.name.common
        a.population - b.population
    )


const USE_LOCAL_DATA = true

export async function loadAllCountries(): Promise<Country[]> {
    if (USE_LOCAL_DATA) {
        return countries
    }
    {}
    const url = 'https://restcountries.com/v3.1/all'
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json() as Country[]
    data.forEach(country => {
        console.log(country.name.common, country.region, country.subregion)
    })
    return data
}
