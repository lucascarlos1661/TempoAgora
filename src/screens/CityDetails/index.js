import React from 'react'
import { View, Text } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Card } from 'react-native-shadow-cards'

import { styles } from './styles'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { theme } from '../../global/theme'
import { COLLECTION_CITIES } from '../../configs/database'


export function CityDetails() {

    const route = useRoute()
    const { citySelected } = route.params

    async function handleDelete() {
        try {
            const storage = await AsyncStorage.getItem(COLLECTION_CITIES)
            const cities = JSON.parse(storage)
            const alteredCities = cities.filter(function (e) {
                return e.cep !== citySelected.cep

            })
            AsyncStorage.setItem(COLLECTION_CITIES, JSON.stringify(alteredCities))
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.centerView}>
                <Header title={citySelected.city} backButton={true} />
                <Card style={styles.card} elevation={4} cornerRadius={8}>
                    <View style={styles.leftCard}>
                        <Text style={styles.textLeft}>CEP</Text>
                        <Text style={styles.textLeft}>Endereço</Text>
                        <Text style={styles.textLeft}>UF</Text>
                    </View>
                    <View style={styles.rightCard}>
                        <Text style={styles.textRight}>{citySelected.cep}</Text>
                        <Text style={styles.textRight}>{citySelected.street}</Text>
                        <Text style={styles.textRight}>{citySelected.state}</Text>
                    </View>
                </Card>
            </View>
            <Button text={'Excluir'} color={theme.colors.lightRed} onPress={handleDelete} />
        </View>
    )
}