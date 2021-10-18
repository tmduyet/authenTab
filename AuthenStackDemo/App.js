/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useReducer,
} from 'react';

import {
  ActivityIndicator,
  LogBox,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import HomeTabStack from './src/screen/StackNavigator/HomeTabStack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeDrawer from './src/screen/StackNavigator/HomeDrawer';
import LoginScreen from './src/screen/Login';
import {navigationRef} from './src/common/RootNavigation';
import {AuthContext} from './src/common/context'
import AsyncStorage from '@react-native-async-storage/async-storage';;
const WAppStack = createNativeStackNavigator();
LogBox.ignoreLogs(['Remote debugger']);
const WAppStackContainer = () => {
  const wAppStack = [
    {
      name: 'home',
      component: HomeDrawer,
    },
  ];
  return (
    <WAppStack.Navigator
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
      }}>
      {wAppStack.map((value, index) => (
        <WAppStack.Screen
          key={index}
          name={value.name}
          component={value.component}></WAppStack.Screen>
      ))}
    </WAppStack.Navigator>
  );
};

const App = () => {

  const initialLoginStatus = {
    isLoading: true,
    userName: 'duyet',
    userToken: null,
  };

  const loginReducer = (state, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...state,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...state,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...state,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...state,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };

      default:
        return state;
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginStatus);
  const authContext = useMemo(
    () => ({
      signIn:  async(username, password) => {
        // gọi lên db để lấy dữ liệu người dùng về
        let action = {
          type: 'LOGIN',
          id: username,
          token: 'newtoken',
        };
       
        try {
          await AsyncStorage.setItem('token', action.token)
          dispatch(action);
        } catch (e) {
          console.log(e);
        }
      },
      signOut:  async() => {
        let action = {
          type: 'LOGOUT',
        };
        try {
          await AsyncStorage.removeItem('token')
          dispatch(action);
        } catch (e) {
          console.log(e);
        }
     
      },
      signUp: () => {
        let action = {
          type: 'LOGOUT',
        };
        
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      try {
        const value = await AsyncStorage.getItem('token')
        console.log('token:',value);
        if(value !== null) {
          dispatch({type:'LOGIN',id:123,token:value})
        }
        else
        {
          dispatch({type:'LOGOUT'})
        }
      } catch(e) {
        // error reading value
      }
    }, 1000);
  }, []);

  
  if (loginState.isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large"></ActivityIndicator>
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer ref={navigationRef}>
        {loginState.userToken !== null ? (
          <WAppStackContainer></WAppStackContainer>
        ) : (
          <WAppStack.Navigator>
            <WAppStack.Screen
              name="login"
              component={LoginScreen}></WAppStack.Screen>
          </WAppStack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
