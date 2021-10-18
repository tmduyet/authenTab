import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Tab from './Tab'

export default function TabBar({state,navigation}) {

    const {route} = state
    const  renderItem=()=>{
        return (
            route.map(route=><Tab tab={route} key={route.key}></Tab>)
        )
    }
    return (
        <View style={styles.wrapper}>
           <View style={styles.container}>


           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        height:80,
        backgroundColor:'gray'

    },
    container:{
    }
})
