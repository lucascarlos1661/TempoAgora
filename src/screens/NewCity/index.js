import React, { useState } from 'react'
import { View, Text, TextInput, Alert } from 'react-native'
import { mask, } from "remask"
import AsyncStorage from '@react-native-async-storage/async-storage'

import { styles } from './styles'
import { theme } from '../../global/theme'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { COLLECTION_CITIES } from '../../configs/database'
import cepApi from '../../Api/cepApi'

export function NewCity() {

    const [cep, setCep] = useState('')

    async function handleSave() {
        if (cep.length < 9) {
            Alert.alert("Cep invalido", 'Digite um cep válido')
        } else {

            let json = await cepApi.checkCep(cep)

            if (json.erro == true) {
                Alert.alert('Cep inválido', 'Digite outro cep')
            } else {

                const newCity = {
                    cep: json.cep,
                    street: json.logradouro,
                    state: json.uf,
                    city: json.localidade

                }

                const storage = await AsyncStorage.getItem(COLLECTION_CITIES)
                const cities = storage ? JSON.parse(storage) : []

                await AsyncStorage.setItem(
                    COLLECTION_CITIES,
                    JSON.stringify([...cities, newCity])
                )
            }
        }
    }


    return (
        <View style={styles.container}>

            <Header title={'Nova Cidade'} backButton={true} />

            <View style={styles.centerView}>
                <Text>Digite o Cep da cidade</Text>
                <TextInput
                    value={cep}
                    onChangeText={t => setCep(mask(t, ['99999-999']))}
                    maxLength={9}
                    keyboardType={'number-pad'}
                    style={styles.inputText}
                >
                </TextInput>
            </View>

            <Button text={'Salvar'} color={theme.colors.purple} onPress={handleSave} />

        </View>
    )
}