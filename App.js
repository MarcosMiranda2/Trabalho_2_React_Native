import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Tela1 from './screens/Tela1';
import Tela2 from './screens/Tela2';

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tela1" component={Tela1} options = {{headerShown:false}} />
        <Stack.Screen name="Tela2" component={Tela2} options={{title:'Voltar'}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}