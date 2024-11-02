import { Fragment } from 'react';
import { Dimensions, View } from 'react-native';
import Svg, { G, Path, Text } from 'react-native-svg';
import { ChartRecord } from '../utils/Types';


export function PieChart({ data }: { data: ChartRecord[] }) {
    const screenWidth = Dimensions.get('window').width
    const chartSize = screenWidth - 32
    const radius = chartSize / 2
    const center = radius

    const total = data.reduce((sum, item) => sum + item.value, 0)

    let startAngle = 0

    const createPieSlice = (percentage: number, color: string) => {
        const endAngle = startAngle + (percentage * Math.PI * 2)

        const x1 = center + radius * Math.cos(startAngle)
        const y1 = center + radius * Math.sin(startAngle)
        const x2 = center + radius * Math.cos(endAngle)
        const y2 = center + radius * Math.sin(endAngle)

        const largeArcFlag = percentage > 0.5 ? 1 : 0

        const pathData = [
            `M ${center} ${center}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
        ].join(' ')

        startAngle = endAngle
        return pathData
    }

    return (
        <View>
            <Svg width={chartSize} height={chartSize}>
                <G>
                    {data.map((item, index) => {
                        const percentage = item.value / total
                        const slicePath = createPieSlice(percentage, item.color)
                        const labelAngle = startAngle - (percentage * Math.PI)
                        const labelRadius = radius * 0.7
                        const labelX = center + labelRadius * Math.cos(labelAngle)
                        const labelY = center + labelRadius * Math.sin(labelAngle)

                        return (
                            <Fragment key={index}>
                                <Path d={slicePath} fill={item.color} />
                                <Text
                                    x={labelX}
                                    y={labelY}
                                    fill="white"
                                    fontSize="12"
                                    fontWeight="bold"
                                    textAnchor="middle"
                                >
                                  
                                </Text>
                            </Fragment>
                        )
                    })}
                </G>
                <G>
                    {data.map((item, index) => {
                        const percentage = item.value / total
                        const slicePath = createPieSlice(percentage, item.color)
                        let labelAngle = startAngle - (percentage * Math.PI)
                        if (percentage < 0.01) {
                            labelAngle += (index % 2 == 0 ? -1 : 1) * 0.05
                        }
                        const labelRadius = radius * 0.7
                        const labelX = center + labelRadius * Math.cos(labelAngle)
                        const labelY = center + labelRadius * Math.sin(labelAngle)

                        return (
                            <Fragment key={index}>
                                <Text
                                    x={labelX}
                                    y={labelY}
                                    fill="black"
                                    fontSize="11"
                                    fontFamily="Sans"
                                    fontWeight="bold"
                                    textAnchor="middle"
                                >
                                    {item.label}
                                </Text>
                            </Fragment>
                        )
                    })}
                </G>
            </Svg>
        </View>
    )
}

