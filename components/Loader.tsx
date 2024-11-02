import countriesRaw from "../assets/data/allcountries.json";
import isocodes from "../assets/data/iso3166.json";
import { IsoCode3 } from "../utils/Types";


const countries = (countriesRaw as unknown as Country[])
const isoData = (isocodes as unknown as IsoCode3[])

countries.sort((a, b) =>
    //a.name.common.localeCompare(b.name.common
    b.population - a.population
)


const USE_LOCAL_DATA = true

/*
 * Loads all countries from the restcountries API
 */
export async function loadAllCountries(): Promise<Country[]> {
    if (USE_LOCAL_DATA) {
        console.log("using local data", countries.length)
        return countries
    }
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


/*
 * Loads a list of wikipedia articles for a given country
 * from wikipedia itself
 */
export async function fetchIso3166Data() {
    return isoData
}

