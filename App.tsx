import {ThemeProvider} from 'styled-components/native'
import Theme from './src/theme/index';
import {StatusBar} from 'react-native'

import {useFonts, Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto'

import { Loading } from '@components/Loading';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (
    <ThemeProvider theme={Theme}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor='transparent'
        translucent
      />
     {
     fontsLoaded 
      ? <Routes />
      : <Loading /> 
    }
    </ThemeProvider>
  );
}
