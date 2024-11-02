import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { fetchIso3166Data, loadAllCountries } from '../components/Loader';
import { IsoCode3 } from '../utils/Types';


export type AppState = {
    countries: Country[]
    isoCodes: IsoCode3[]
}

export const AppStateContext = createContext<{
    appState: AppState
    setAppState: Dispatch<SetStateAction<AppState>>
} | undefined>(undefined)


export function AppStateProvider({ children }: { children?: ReactNode}) {
    const [appState, setAppState] = useState<AppState>({
        countries: [],
        isoCodes: [],
    })
    useEffect(() => {
        (async () => { 
            const countries = await loadAllCountries()
            const isoCodes = await fetchIso3166Data()
            const s: AppState = {...appState, countries, isoCodes}
            setAppState(s)
        })()
    }, [])
    return (
        <AppStateContext.Provider value={{ appState, setAppState }}>
            {children}
        </AppStateContext.Provider>
    )
}


export function useAppState() {
    const context = useContext(AppStateContext)
    if (context === undefined) {
        throw new Error('no provider for AppStateContext')
    }
    return context
}
