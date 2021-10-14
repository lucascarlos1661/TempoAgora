import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import { mask, } from "remask"

import { styles } from './styles'
import { theme } from '../../global/theme'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'

export function NewCity() {

    const [cep, setCep] = useState('')

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

            <Button text={'Salvar'} color={theme.colors.purple} />

        </View>
    )
}