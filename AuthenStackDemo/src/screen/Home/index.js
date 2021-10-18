import React, { useContext } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { navigationRef } from '../../common/RootNavigation'
import { AuthContext } from '../../common/context';
export default function HomeScreen(props) {
    const {signOut} = useContext(AuthContext)
    return (
    
        <View style={{flex:1 , justifyContent:'center',alignItems:'center'}}>
            <Text>HomeScreen</Text>
            <Button onPress ={()=>signOut()} title={'Sign Out'} ></Button>
        </View>
    )
}

const styles = StyleSheet.create({})
