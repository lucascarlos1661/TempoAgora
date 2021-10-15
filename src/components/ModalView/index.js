import React from 'react'
import { View, Text, Modal, TouchableOpacity } from 'react-native'
import { Card } from 'react-native-shadow-cards'

import { styles } from './styles'

export function ModalView({ title, booleanModal, onPressTrue, onPressFalse, saveError, ...rest }) {

    return (

        <Modal
            animationType="fade"
            transparent={true}
            {...rest}
        >
            <View style={styles.container}>
                <Card style={styles.card} elevation={4} cornerRadius={8} >
                    <Text style={styles.title}>
                        {title}
                    </Text>


                    {booleanModal ?
                        <View style={styles.bottomView}>
                            <TouchableOpacity style={styles.buttonTrue} onPress={onPressTrue}>
                                <Text style={styles.buttonText}>Sim</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonFalse} onPress={onPressFalse}>
                                <Text style={styles.buttonText}>Não</Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.bottomView}>
                            <TouchableOpacity style={styles.buttonTrue} onPress={saveError ? onPressTrue : onPressFalse}>
                                <Text style={styles.buttonText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </Card>
            </View>

        </Modal>


    )
}