import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import HomePage from './components/HomePage';
import ProductDetails from './components/ProductDetails';
import Home from './components/Home';
import AddToCart from './components/AddToCart';
import Favourites from './components/Favourites';
import CategoryProducts from './components/CategoryProducts';
import { Provider } from 'react-redux';
import {mystore,persistedStore} from './src/redux/store/myStore';
import { PersistGate } from 'redux-persist/integration/react';
import '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';


  

const Stack=createNativeStackNavigator();




const App = () => {

  

  useEffect(() => {
    getFCMToken();
   requestUserPermission();
}, []);

const requestUserPermission=async()=> {
const granted = await PermissionsAndroid.request(
  PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
);

  if(granted===PermissionsAndroid.RESULTS.GRANTED){
     
    console.log("Permission Granted");
  }
  else{
    console.log("Permission Not Granted");
  }

  

     
};



const getFCMToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
  } catch (error) {
    console.log('Error getting FCM token:', error);
  }
};


  return (
    <Provider store={mystore}>
    <PersistGate loading={null} persistor={persistedStore}>
    
  
    <NavigationContainer>
       <StatusBar
          barStyle={'dark-content'}    
        />
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name='Register' component={RegisterScreen}/>
        <Stack.Screen name='HomePage' component={HomePage}/>
        <Stack.Screen name='ProductDetails' component={ProductDetails}/>
        <Stack.Screen name="CategoryProducts" component={CategoryProducts}/>
        <Stack.Screen name="Favourites" component={Favourites}/>

      </Stack.Navigator>
    </NavigationContainer>
        </PersistGate>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex:1,
    //backgroundColor:"blue",
    justifyContent:"center",
    //alignContent:'center',
    alignItems:'center'
  }
})