import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';
import { loadAllCountries } from '../components/Loader';


export type AppState = {
    countries: Country[]
}


export const AppStateContext = createContext<{
    appState: AppState
    setAppState: Dispatch<SetStateAction<AppState>>
} | undefined>(undefined)


export function AppStateProvider({ children }: { children?: ReactNode}) {
    const [appState, setAppState] = useState<AppState>({
        countries: []
    })
    useEffect(() => {
        (async () => { 
            const countries = await loadAllCountries()
            console.time('loadAllCountries')
            const s: AppState = {...appState, countries }
            console.timeEnd('loadAllCountries')
            console.log("loaded countries", countries.length)
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
