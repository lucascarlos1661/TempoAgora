import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'

import { styles } from './styles'

export function Button({ text, color, ...rest }) {
    return (

        <TouchableOpacity {...rest} style={{ ...styles.container , backgroundColor: color}}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity >

    )
}