import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home  from './Home';
import Cadastrar  from './CadastrarMusicas';
import Alterar  from './AlterarMusicas';


const Stack = createStackNavigator();

export default function Rotas() {
    return(
        <Stack.Navigator>
            <Stack.Screen  name="Home" component={Home}  />
            <Stack.Screen  name="Cadastrar" component={Cadastrar}  />
            <Stack.Screen  name="Alterar" component={Alterar}  />
        </Stack.Navigator>
    );
}