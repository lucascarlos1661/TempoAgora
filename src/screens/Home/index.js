import React, { useEffect, useCallback, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage'

import { styles } from './styles'
import { Header } from '../../components/Header'
import { Cityitem } from '../../components/CityItem'
import { COLLECTION_CITIES } from '../../configs/database'

export function Home() {

    const [data, setData] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [lastUpdate, setLastUpdate] = useState('')
    const navigation = useNavigation()

    async function loadCities() {
        let storage = await AsyncStorage.getItem(COLLECTION_CITIES)
        let cities = storage ? JSON.parse(storage) : []

        let currentDate = new Date()
        let day = currentDate.getDate()
        let month = (currentDate.getMonth() + 1)
        let year = currentDate.getFullYear()
        let hours = currentDate.getHours()
        let minutes = currentDate.getMinutes()

        formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`

        setLastUpdate(formattedDate)
        setData(cities)
    }

    useFocusEffect(useCallback(() => {
        loadCities()
    }, [data]))

    function handleAddNewCity() {
        navigation.navigate('NewCity')
    }

    function handleCityDetails(citySelected) {
        navigation.navigate('CityDetails', { citySelected })
    }

    return (
        <View style={styles.container}>
            <Header title={'Tempo Agora'} backButton={false} />
            <Text style={styles.lastUpdate}>Ultima atualização: {lastUpdate}</Text>

            <View style={styles.viewItems}>

                <FlatList
                    data={data}
                    keyExtractor={item => item.cep}
                    contentContainerStyle={{ paddingBottom: 30 }}
                    // onRefresh={() => loadCities()}
                    // refreshing={isLoading}
                    renderItem={({ item }) => (
                        <Cityitem
                            data={item}
                            onPress={() => handleCityDetails(item)}
                        />
                    )}
                />
            </View>
            <TouchableOpacity style={styles.addNewCity} onPress={handleAddNewCity}>
                <Ionicons name='add-circle-outline' size={40} />
                <Text style={styles.newCity}>INCLUIR NOVA CIDADE</Text>
            </TouchableOpacity>


        </View>
    )
}