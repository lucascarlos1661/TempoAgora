import React, { useState } from 'react'
import { View, Text, TextInput, Alert } from 'react-native'
import { mask, } from "remask"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage'

import { styles } from './styles'
import { theme } from '../../global/theme'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { COLLECTION_CITIES } from '../../configs/database'
import cepApi from '../../Api/cepApi'
import { ModalView } from '../../components/ModalView'

export function NewCity() {

    const navigation = useNavigation()

    const [cep, setCep] = useState('')
    const [modalTitle, setModalTitle] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [saveError, setSaveError] = useState(true)

    async function handleSave() {
        if (cep.length < 9) {
            setModalTitle('Cep inválido')
            setModalVisible(true)
        } else {

            const json = await cepApi.checkCep(cep)

            if (json.data.erro == true) {
                setModalTitle('Cep inválido')
                setModalVisible(true)
            } else {

                const newCity = {
                    cep: json.data.cep,
                    street: json.data.logradouro,
                    state: json.data.uf,
                    city: json.data.localidade

                }

                const storage = await AsyncStorage.getItem(COLLECTION_CITIES)
                const cities = storage ? JSON.parse(storage) : []

                try {
                    await AsyncStorage.setItem(
                        COLLECTION_CITIES,
                        JSON.stringify([...cities, newCity])
                    )
                    setModalTitle('Cidade salva com sucesso')
                    setModalVisible(true)
                    setSaveError(false)
                } catch (e) {

                }
            }
        }
    }


    return (
        <View style={styles.container}>

            <Header title={'Nova Cidade'} backButton={true} />

            <View style={styles.centerView}>
                <Text style={styles.cepText}>Digite o Cep da cidade</Text>
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

            <ModalView
                title={modalTitle}
                booleanModal={false}
                onPressFalse={() => navigation.navigate('Home')}
                onPressTrue={() => setModalVisible(false)}
                saveError = {saveError}
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