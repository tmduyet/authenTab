import React, { useContext } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import {navigationRef}  from '../../common/RootNavigation'
import { AuthContext } from '../../common/context'

export default function LoginScreen(props) {

    const {signIn} = useContext(AuthContext)
    
    return (
        <View style={styles.container}>
            <Button onPress={()=>signIn()} title={"Đăng nhập"}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})
