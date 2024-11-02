
const nf = new Intl.NumberFormat('de-DE', {
    style: 'decimal',
    maximumFractionDigits: 0
})

export function formatNumber(num: number) {
    return nf.format(num)
}

export function deg2rad(deg: number) {
    return deg * Math.PI / 180
}


