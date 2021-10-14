import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

import { styles } from './styles'
import { Header } from '../../components/Header'

export function Button({ text, color }) {
    return (

        <TouchableOpacity style={{ ...styles.container , backgroundColor: color}}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity >

    )
}