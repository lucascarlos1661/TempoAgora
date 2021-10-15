import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Card } from 'react-native-shadow-cards'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { styles } from './styles'

export function Cityitem({ data, ...rest }) {
    return (
        <Card style={styles.container} elevation={4} cornerRadius={8} >
            <TouchableOpacity {...rest} style={styles.button}>
                <View style={styles.leftArea}>
                    <View style={styles.leftBorder} />
                    <Text style={styles.textTemperature}>°</Text>

                    <View>
                        <Text style={styles.city}>{data.city}</Text>
                        <Text style={styles.street}>{data.street}</Text>
                    </View>
                </View>

                <View style={styles.rigthArea} >
                    <View style={styles.righthView}>
                        <AntDesign name='right' size={30} />
                    </View>
                </View>
            </TouchableOpacity>
        </Card >
    )
}