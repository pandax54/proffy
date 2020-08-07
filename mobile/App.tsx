import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';

// aula 04 24:00
import Landing from './src/pages/Landing';
// aula 04 58:00
import AppStack from './src/routes/AppStack';

// aula 04 37:00 - google fonts
// expo google fonts aula 04 35:30
import { AppLoading } from 'expo';
import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';


// rotas no react nartive: aula 52:00 --> react navigation
// https://reactnavigation.org/docs/hello-react-navigation
// yarn add @react-navigation/native
// expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
// yarn add @react-navigation/stack
// yarn add @react-navigation/bottom-tabs

export default function App() {
  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <>
        <AppStack />
        <StatusBar style="light " />
      </>
    );
  }
}




