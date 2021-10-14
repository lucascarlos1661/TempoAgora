import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-shadow-cards'
import AntDesign from 'react-native-vector-icons/AntDesign'


import { styles } from './styles'


export function Cityitem() {
    return (

        <Card style={styles.container} elevation={5} cornerRadius={8}>

            <View style={styles.leftArea}>
                <View style={styles.leftBorder} />
                <Text style={styles.textTemperature}>21</Text>

                <View>
                    <Text style={styles.city}>São Paulo</Text>
                    <Text>Avenida Paulista</Text>
                </View>
            </View>

            <View style={styles.rigthArea} >
                <View style={styles.righthView}>
                    <AntDesign name='right' size={30} />
                </View>
            </View>

        </Card>





    )
}