import React from 'react';
import { Button, Text, StyleSheet, styles, View, TouchableOpacity, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Homedriver from './Pickvandriver/Homedriver';
import Pickuppoint from './Pickvandriver/Pickuppoint';
import Deliverypoint from './Pickvandriver/Deliverypoint';
import Login from './Pickvandriver/login';
import { DrawerContent } from './Pickvandriver/DrawerContent';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Pickvan({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="Homedriver">
      <Stack.Screen name="Homedriver" component={Homedriver} options={{
        title: 'PickVan',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        },
        headerStyle: {
          backgroundColor: '#B0D8D8',
        },

        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()} >
            <Image style={{ width: 25, height: 25, marginLeft: 15, marginRight: 20 }}
              source={require('./images/menu.png')}
            />
          </TouchableOpacity>
        )
      }} />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}>
      </Stack.Screen>

      <Stack.Screen name="Pickuppoint" component={Pickuppoint} options={{
        title: 'จุดรับผู้โดยสาร',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        },
        headerStyle: {
          backgroundColor: '#B0D8D8',
        },
      }} />

      <Stack.Screen name="Deliverypoint" component={Deliverypoint} options={{
        title: 'จุดส่งผู้โดยสาร',
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        },
        headerStyle: {
          backgroundColor: '#B0D8D8',
        },
      }} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={props => <DrawerContent {...props} />}
        initialRouteName="Homedriver"
        screenOptions={{
          headerShown: false,
        }}>
        <Drawer.Screen name="Pickvan" component={Pickvan} />
      </Drawer.Navigator>
    </NavigationContainer>

  );
}