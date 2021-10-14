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

    const [cities, setCities] = useState('')
    const navigation = useNavigation()

    async function loadCities() {
        const response = await AsyncStorage.getItem(COLLECTION_CITIES)
        const storage = response ? JSON.parse(response) : []

        setCities(storage)
    }

    useFocusEffect(useCallback(() => {
        loadCities()
    }, [cities]))

    function handleAddNewCity() {
        navigation.navigate('NewCity')
    }

    function handleCityDetails(citySelected) {
        navigation.navigate('CityDetails', {citySelected})
    }

    return (
        <View style={styles.container}>
            <Header title={'Tempo Agora'} backButton={false} />
            <Text style={styles.lastUpdate}>Ultima atualização: </Text>

            <View style={styles.viewItems}>

                <FlatList
                    data={cities}
                    keyExtractor={item => item.cep}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 30 }}
                    renderItem={({ item }) => (
                        <Cityitem
                            data={item}
                            onPress={() => handleCityDetails(item)}
                        />
                    )}
                />


                <TouchableOpacity style={styles.addNewCity} onPress={handleAddNewCity}>
                    <Ionicons name='add-circle-outline' size={40} />
                    <Text>INCLUIR NOVA CIDADE</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}