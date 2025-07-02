import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import CustomDrawerContent from '../components/CustomDrawerContent';
import HomeScreen from '../screens/HomeScreen';
import ClientListScreen from '../screens/client/ClientListScreen';
import CreateClientScreen from '../screens/client/CreateClientScreen';
import EditClientScreen from '../screens/client/EditClientScreen';

export type DrawerParamList = {
  Home: undefined;
  ClientList: undefined;
  CreateClient: undefined;
  EditClient: { client: Client };
};

export type Client = {
  id: number;
  nome: string;
  cpf: string;
  cnh: string;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveTintColor: '#4B7BE5',
        drawerLabelStyle: { marginLeft: 0, fontSize: 16 },
        drawerStyle: { backgroundColor: '#fff', width: 250 },
        headerStyle: { backgroundColor: '#4B7BE5' },
        headerTintColor: '#fff',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Início' }}
      />
      <Drawer.Screen
        name="ClientList"
        component={ClientListScreen}
        options={{ title: 'Clientes' }}
      />
      <Drawer.Screen
        name="CreateClient"
        component={CreateClientScreen}
        options={{ title: 'Novo Cliente' }}
      />
      <Drawer.Screen
        name="EditClient"
        component={EditClientScreen}
        options={{ title: 'Editar Cliente' }}
      />
   
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;