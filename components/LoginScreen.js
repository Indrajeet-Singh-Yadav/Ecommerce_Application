import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TextInputComponent, TouchableOpacity, View } from 'react-native'
import React, { useState,useEffect } from 'react'
import ToastManager,{ Toast } from 'toastify-react-native';


const LoginScreen = ({navigation}) => {


    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    
   
    

    const onPress=()=>{

        navigation.navigate('HomePage');
       
        // if(email==password){
        //     Toast.success("Success")
        // }

        setEmail('')
        setPassword('')
    };

  return (
    <ScrollView>
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
        <View  style={styles.imageContainer}>
        <Image style={styles.image} source={require('../assets/splash.png')}/>
        </View>
        <View style={styles.inputContainer}>
            <View style={{width:350,height:370,borderWidth:4,borderRadius:30,padding:15,borderColor:'#D0D0D0'}}>
            <Text style={styles.textStyle}>Email</Text>
            <TextInput style={styles.textInputStyle} onChangeText={(text)=>setEmail(text)} value={email} placeholder='Enter Email Address' keyboardType='email-address'/>    
            <Text style={styles.textStyle}>Password</Text>
            <TextInput style={styles.textInputStyle} onChangeText={(text)=>setPassword(text)} value={password} placeholder='Enter Password' />
            <TouchableOpacity style={styles.buttonStyle}onPress={
               onPress
            } >
                <Text style={styles.btnTextStyle}>LOGIN</Text>
             </TouchableOpacity>
             <View style={{flex:1,flexDirection:'row',}}>
             <Text style={{paddingTop:10,paddingLeft:10,fontSize:15,fontWeight:'bold'}}>Dont't have an Account? </Text>
             <Text onPress={()=>{
               navigation.navigate('Register');
             }} style={{paddingTop:10,fontSize:15,fontWeight:'bold',color:'blue'}}> Register</Text>
             </View>
             
        
            </View>
            
           
        </View>

     
      
    </View>
    </SafeAreaView>
    <ToastManager/>
    </ScrollView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        
    },
    imageContainer:{
        flex:1,justifyContent:'flex-end',marginTop:150
    },
    image:{
        width:250,height:250,
    },
    inputContainer:{
        flex:2,justifyContent:'flex-start',marginTop:50,
      
    },
    textStyle:{
        fontSize:24,fontWeight:'bold',padding:8
    },
    textInputStyle:{
        borderWidth:2,borderRadius:10,margin:10,borderColor:"#D0D0D0"
    },
    buttonStyle:{
        marginTop:8,marginHorizontal:8,        //margin:20,
        backgroundColor:'#668cff',alignItems:'center',borderRadius:20
    },
    btnTextStyle:{
        fontSize:20,fontWeight:'bold',padding:8,color:'white'
    },
})