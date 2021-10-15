import { StyleSheet } from "react-native"
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

export const styles = StyleSheet.create({
    container: {
        marginTop: getStatusBarHeight(),
    },
    topView: {
        height: 30,
        width: 30,
    },
    title: {
        fontSize: 30,
        marginTop: 10,
        fontFamily: 'Poppins-Bold'
    }
})