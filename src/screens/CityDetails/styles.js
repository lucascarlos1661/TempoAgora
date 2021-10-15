import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,    
    },
    centerView: {
        flex: 1,
    },
    card: {
        marginTop: 30,
        height: 140,
        flexDirection: 'row'
    },
    leftCard: {
        flex: 1,
        padding: 30,
        direction: 'rtl',
        justifyContent: 'space-between'
    },
    rightCard: {
        flex: 2,
        padding: 30,
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    textLeft: {
        fontFamily: 'Poppins-Regular'
    },
    textRight : {
        fontFamily: 'Poppins-Bold',
        textAlign: 'right'
    }
})