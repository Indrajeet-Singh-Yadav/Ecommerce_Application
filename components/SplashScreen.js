import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'





const SplashScreen = ({navigation}) => {

  useEffect(() => {
    console.log("hello");
    setTimeout(() => {
    navigation.replace('Login');
    }, 3000);
  }, []);

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.ImageContainer}>
      <Image style={styles.Image} source={require('../assets/splash.png')}/>
    </View>
    </SafeAreaView>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  ImageContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  Image:{
    // width:100,
    // height:100
  }
})