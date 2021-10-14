import { StyleSheet } from "react-native"
import { theme } from "../../global/theme"

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: "center",
        paddingHorizontal: 0,
        height: 85,
    },
    leftArea: {
        flexDirection: 'row',
        alignItems: "center",
    },
    leftBorder: {
        height: 85,
        width: 6,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        backgroundColor: theme.colors.purple
    },
    city: {
        fontWeight: 'bold',
        fontSize: 16
    },
    textTemperature: {
        marginHorizontal: 17,
        fontSize: 40
    },
    rigthArea: {
        flex: 1,
        marginRight: 20
    },
    righthView: {
        alignSelf: "flex-end",
    }

})