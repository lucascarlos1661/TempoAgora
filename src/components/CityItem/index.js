import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-shadow-cards'
import AntDesign from 'react-native-vector-icons/AntDesign'
import NetInfo from "@react-native-community/netinfo"

import { styles } from './styles'
import hgBrasilApi from '../../Api/hgBrasilApi'


export function Cityitem({ data, ...rest }) {

    const [weather, setWeather] = useState()
    const [isConnected, setIsConnected] = useState(true)

    async function loadWeather() {

        NetInfo.fetch().then(state => {
            setIsConnected(state.isConnected)
        })

        if (isConnected == false) {
            setWeather('--')
            return
        }

        const formattedCity = data.city.replace(/\s+/g, '_')
        const formattedState = data.state.replace(/\s+/g, '_')

        const json = await hgBrasilApi.checkWeather(formattedCity, formattedState)

        setWeather(json.data.results.temp)
    }

    function abridgedControl(fullName, limit) {
        if (fullName.length > limit) {
            return toAbridged(fullName)
        }
        return fullName
    }

    function toAbridged(fullName) {
        const token = '.'
        const separator = ' '
        const names = removePrepositions(fullName).split(separator)
        const firstName = names[0]
        let surnames = ''
        names
            .filter((name, index) => index)
            .map(name => surnames += `${separator}${name.charAt()}${token}`)
        return `${firstName}${surnames.toUpperCase()}`
    }

    function removePrepositions(fullName) {
        return fullName.replace(/\ dos|\ das|\ dos|\ das|\ de|\ d\'/gi, '')
    }

    useEffect(() => {
        loadWeather()
    }, [])

    return (
        <Card style={styles.container} elevation={4} cornerRadius={8} >
            <TouchableOpacity {...rest} style={styles.button}>
                <View style={styles.leftArea}>
                    <View style={styles.leftBorder} />
                    <Text style={styles.textTemperature}>{weather}°</Text>

                    <View>
                        <Text style={styles.city}>{data.city}</Text>
                        <Text style={styles.street}>{abridgedControl(data.street, 30)}</Text>
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