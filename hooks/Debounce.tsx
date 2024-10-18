import { useCallback, useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay)
        return () => {
            clearTimeout(handler);
        }
    }, [value, delay])
    return debouncedValue
}


export function useDebouncedCallback<T extends (...args: any[]) => any>(
    callback: T,
    delay: number
): (...args: Parameters<T>) => void {
    const [timeoutId, setTimeoutId] = useState<any>()
    const debouncedCallback = useCallback(
        (...args: Parameters<T>) => {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            const newTimeoutId = setTimeout(() => {
                callback(...args)
            }, delay)
            setTimeoutId(newTimeoutId)
        },
        [callback, delay]
    )
    return debouncedCallback
}

