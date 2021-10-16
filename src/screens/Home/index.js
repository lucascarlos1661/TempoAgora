import React, { useCallback, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation, useFocusEffect } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from "@react-native-community/netinfo"

import { styles } from './styles'
import { Header } from '../../components/Header'
import { Cityitem } from '../../components/CityItem'
import { COLLECTION_CITIES } from '../../configs/database'
import { ModalView } from '../../components/ModalView'

export function Home() {

    const [data, setData] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [lastUpdate, setLastUpdate] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const [isConnected, setIsConnected] = useState(true)

    const navigation = useNavigation()

    async function loadCities() {
        NetInfo.fetch().then(state => {
            setIsConnected(state.isConnected)
        })

        if (isConnected == false) {
            setModalTitle('Sem conexão com a internet, as informações poderão estar desatualizadas.')
            setModalVisible(true)
        }

        let storage = await AsyncStorage.getItem(COLLECTION_CITIES)
        let cities = storage ? JSON.parse(storage) : []

        let currentDate = new Date()
        let day = currentDate.getDate()
        let month = (currentDate.getMonth() + 1)
        let year = currentDate.getFullYear()
        let hours = currentDate.getHours()
        let minutes = currentDate.getMinutes()

        if (month.toString().length < 2)
            month = '0' + month
        if (day.toString().length < 2)
            day = '0' + day
        if (hours.toString().length < 2)
            hours = '0' + hours
        if (minutes.toString().length < 2)
            minutes = '0' + minutes

        formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`

        setIsLoading(false)
        setLastUpdate(formattedDate)
        setData(cities)
    }

    useFocusEffect(useCallback(() => {
        loadCities()
    }, []))

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

                {isLoading ?

                    <ActivityIndicator size='large' color={'#000'} style={{ marginTop: 20 }} />
                    :

                    <FlatList
                        data={data}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{ paddingBottom: 30 }}
                        showsVerticalScrollIndicator={false}
                        onRefresh={() => loadCities()}
                        refreshing={isLoading}
                        renderItem={({ item }) => (
                            <Cityitem
                                data={item}
                                onPress={() => handleCityDetails(item)}
                            />
                        )}
                        ListFooterComponent={
                            <TouchableOpacity style={styles.addNewCity} onPress={handleAddNewCity}>
                                <Ionicons name='add-circle-outline' size={40} />
                                <Text style={styles.newCity}>INCLUIR NOVA CIDADE</Text>
                            </TouchableOpacity>
                        }
                    />
                }
                <ModalView
                    title={modalTitle}
                    onPressFalse={() => setModalVisible(false)}
                    animationType="fade"
                    transparent
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible)
                    }
                    }
                />
            </View>
        </View>
    )
}