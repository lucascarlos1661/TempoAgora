import React, { useState } from 'react'
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
import { ModalView } from '../../components/ModalView'

export function CityDetails() {

    const navigation = useNavigation()

    const route = useRoute()
    const { citySelected } = route.params
    const [modalVisible, setModalVisible] = useState(false)

    async function handleDelete() {
        try {
            const storage = await AsyncStorage.getItem(COLLECTION_CITIES)
            const cities = JSON.parse(storage)
            const alteredCities = cities.filter(function (e) {
                return e.cep !== citySelected.cep

            })
            AsyncStorage.setItem(COLLECTION_CITIES, JSON.stringify(alteredCities))
            navigation.navigate('Home')
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
            <Button text={'Excluir'} color={theme.colors.lightRed} onPress={() => setModalVisible(true)} />

            <ModalView
                title={'Deseja realmente excluir?'}
                booleanModal
                onPressTrue={handleDelete}
                onPressFalse={() => setModalVisible(false)}
                animationType="fade"
                transparent
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}
            />
        </View>
    )
}