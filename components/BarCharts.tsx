import React from 'react';
import { Dimensions, View } from 'react-native';
import Svg, { Line, Rect, Text } from 'react-native-svg';
import { ChartRecord } from '../utils/Types';

export function BarChart({ data } : { data: ChartRecord[]}) {

    const screenWidth = Dimensions.get('window').width;
    const chartWidth = screenWidth - 32;
    const chartHeight = 300;
    const barWidth = chartWidth / data.length - 10;

    const maxValue = Math.max(...data.map(item => item.value));

    return (
        <View style={{ padding: 20 }}>
            <Svg width={chartWidth} height={chartHeight}>
                {/* Y-axis */}
                <Line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2={chartHeight -30}
                    stroke="#555555"
                    strokeWidth="2"
                />

                {/* X-axis */}
                <Line
                    x1="0"
                    y1={chartHeight - 30}
                    x2={chartWidth}
                    y2={chartHeight - 30}
                    stroke="#555555"
                    strokeWidth="1"
                />

                {data.map((item, index) => {
                    const barHeight = (item.value / maxValue) * (chartHeight - 60);
                    return (
                        <React.Fragment key={index}>
                            <Rect
                                x={index * (barWidth + 10) + 6}
                                y={chartHeight - 30 - barHeight - 4}
                                width={barWidth}
                                height={barHeight}
                                fill={item.color}
                            />
                            <Text
                                x={index * (barWidth + 10) + barWidth / 2}
                                y={chartHeight - 10}
                                fontSize="11"
                                fontWeight="bold"
                                fontFamily='Sans'
                                textAnchor="middle"
                            >
                                {item.label}
                            </Text>
                            <Text
                                x={index * (barWidth + 10) + barWidth / 2}
                                y={chartHeight - 35 - barHeight}
                                fontSize="10"
                                textAnchor="middle"
                                fill="white"
                            >
                                {item.value}
                            </Text>
                        </React.Fragment>
                    )
                })}
            </Svg>
        </View>
    )
}

