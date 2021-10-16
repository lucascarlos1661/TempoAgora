import React, { useState } from 'react'
import { View, Text, TextInput, ActivityIndicator } from 'react-native'
import { mask, } from "remask"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'

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
    const [isLoading, setIsLoading] = useState(false)

    async function handleSave() {
        setIsLoading(true)
        if (cep.length < 9) {
            setModalTitle('Cep inválido')
            setModalVisible(true)
        } else {
            const json = await cepApi.checkCep(cep)

            if (json.data.erro == true) {
                setModalTitle('Cep não encontrado')
                setModalVisible(true)
            } else {
                const newCity = {
                    id: uuid.v4(),
                    cep: json.data.cep,
                    street: json.data.logradouro,
                    state: json.data.uf,
                    city: json.data.localidade

                }
                const storage = await AsyncStorage.getItem(COLLECTION_CITIES)
                const cities = storage ? JSON.parse(storage) : []

                await AsyncStorage.setItem(
                    COLLECTION_CITIES,
                    JSON.stringify([...cities, newCity])
                )
                setModalTitle('Cidade salva com sucesso')
                setModalVisible(true)
                setSaveError(false)
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

                {isLoading ?
                    <ActivityIndicator size={'large'} color={'#000'} style={{ marginTop: 10 }} />
                    :
                    <View />
                }
            </View>

            <Button text={'Salvar'} color={theme.colors.purple} onPress={handleSave} />

            <ModalView
                title={modalTitle}
                booleanModal={false}
                onPressFalse={() => navigation.navigate('Home')}
                onPressTrue={() => setModalVisible(false)}
                saveError={saveError}
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