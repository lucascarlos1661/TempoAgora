import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    card: {
        padding: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '35%',
    },
    title: {
        fontFamily: 'Poppins-Bold',
        fontSize: 18
    },
    bottomView: {
        flexDirection: 'row',
    },
    buttonTrue: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        height: 40,
        borderRadius: 8,
        backgroundColor: 'green'
    },
    buttonFalse: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        height: 40,
        borderRadius: 8,
        backgroundColor: 'red',
        marginLeft: 30
    },
    buttonText: {
        fontFamily: 'Poppins-Bold',
        color: 'white'
    }
})