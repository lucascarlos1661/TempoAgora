import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from "@react-navigation/native"
import AntDesign from 'react-native-vector-icons/AntDesign'

import { styles } from './styles'

export function Header({ title, backButton }) {

    function handleBack() {
        navigation.goBack()
    }

    const navigation = useNavigation()

    return (
        <View style={styles.container}>

            {backButton ?

                <TouchableOpacity onPress={handleBack} style={styles.topView}>
                    <AntDesign name='left' size={30} />
                </TouchableOpacity>

                :
                <View style={styles.topView}>

                </View>
            }
            <Text style={styles.title}>{title}</Text>


        </View>
    )
}