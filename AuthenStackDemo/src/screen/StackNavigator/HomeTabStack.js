import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useRef,useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import DetailScreen from '../DetailScreen';
import HomeScreen from '../Home';
import SettingScreen from '../SettingScreen';
import LottieView from 'lottie-react-native';
import TabBar from './tabHome/TabBar';
const HomeTabNavigator = createBottomTabNavigator();

export default function HomeTabStack() {
  const HomeIconAnimation = useRef(null);
  const [HomeFocus, setHomeFocus] = useState(false)

  return (
    <HomeTabNavigator.Navigator
    tabBar={(props)=><TabBar {...props} ></TabBar>}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <HomeTabNavigator.Screen name="HomeScreen" component={HomeScreen}/>
      <HomeTabNavigator.Screen name="SettingScreen" component={SettingScreen} />
      <HomeTabNavigator.Screen name="DetailScreen" component={DetailScreen} />
    </HomeTabNavigator.Navigator>
  );
}

const styles = StyleSheet.create({});
