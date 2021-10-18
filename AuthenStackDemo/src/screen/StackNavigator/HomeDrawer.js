import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DetailScreen from '../DetailScreen'
import HomeTabStack from './HomeTabStack'


const Drawer = createDrawerNavigator()
export default function HomeDrawer() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen options={{title:'Trang chu'}} name = 'HomeDrawer' component={HomeTabStack}></Drawer.Screen>
            <Drawer.Screen name = 'Details' component={DetailScreen}></Drawer.Screen>
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({})
