import { StyleSheet } from 'react-native';

// aula 04 30:00 - flex:1 para o elemento usar todo o espaço de tela

// expo google fonts aula 04 35:30
// expo install expo-font @expo-google-fonts/archivo @expo-google-fonts/poppins
// https://github.com/expo/google-fonts

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8257e5',
        justifyContent: 'center',
        padding: 40,

    },
    banner: {
        width: '100%',
        resizeMode: 'contain'
    },
    title: {
        fontFamily: 'Poppins_400Regular',
        color: '#fff',
        fontSize: 20,
        lineHeight: 30,
        marginTop: 80
    },
    titleBold: {
        fontFamily: 'Poppins_600SemiBold',
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 40,
        justifyContent: 'space-between'
    },
    button: {
        height: 150,
        width: '48%',
        backgroundColor: '#333',
        borderRadius: 8,
        padding: 24,
        justifyContent: 'space-between'
    },
    buttonPrimary: {
        backgroundColor: '#9871f5'
    },
    buttonSecondary: {
        backgroundColor: '#04d361'
    },
    buttonText: {
        fontFamily: 'Archivo_700Bold',
        color: '#fff',
        fontSize: 20
    },
    totalConnections: {
        fontFamily: 'Poppins_400Regular',
        color: '#d4c2ff',
        fontSize: 12,
        lineHeight: 20,
        maxWidth: 140,
        marginTop: 40

    }
});

export default styles;
