
const nf = new Intl.NumberFormat('de-DE', {
    style: 'decimal',
    maximumFractionDigits: 0
})

export function formatNumber(num: number) {
    return nf.format(num)
}

/* degrees to radians */
export function deg2rad(deg: number) {
    return deg * Math.PI / 180
}

/* radians to degrees */
export function rad2deg(rad: number) {
    return rad * 180 / Math.PI
}

export function calculateRegion(latitude?: number, longitude?: number, distanceInKm: number = 100) {
    if (!latitude || !longitude) {
        return undefined
    }
    const EARTH_RADIUS = 6371 // earth radius in km
    const distanceInRad = distanceInKm / EARTH_RADIUS

    const latRad = deg2rad(latitude)
    const lonRad = deg2rad(longitude)
    const deltaLat = distanceInRad;

    // Calculate delta longitude (takes into account latitude's effect on longitude distance)
    const deltaLon = Math.asin(Math.sin(distanceInRad) / Math.cos(latRad))

    // Convert deltas back to degrees
    const deltaLatDeg = rad2deg(deltaLat)
    const deltaLonDeg = rad2deg(deltaLon)

    return {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: deltaLatDeg * 2, // multiply by 2 to get full height
        longitudeDelta: deltaLonDeg * 2, // multiply by 2 to get full width
    }
}


