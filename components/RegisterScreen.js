import { StyleSheet, Text, TextInput, TouchableOpacity, View ,SafeAreaView, ScrollView} from 'react-native'
import React from 'react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ToastManager,{ Toast } from 'toastify-react-native';

const RegisterScreen = ({navigation}) => {

    const {control,handleSubmit,watch,formState:{errors},reset}=useForm();

    // const [name, setName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");

    const password=watch('password');
    
    const onSubmit=(data)=>{
        Toast.success("Registered Successfully");
        console.log(data);
        reset();
        navigation.navigate('HomePage')
    };

  return (
    <SafeAreaView style={{flex:1}}>
    <ScrollView contentContainerStyle={
        {flexGrow:1,alignItems:'center',justifyContent:'center'}
    }>
 
      
        <View style={styles.container}>
            <Text style={{paddingLeft:15,fontSize:28,fontWeight:'500',marginBottom:50}}>REGISTER NOW FOR FREE</Text>
            <Text style={styles.textStyle}>Name</Text>
            <Controller
            control={control}
            name='name'
            rules={{required:'Name is Required'}}
            render={({field:{onChange,value}})=>(
                <TextInput style={styles.textInputStyle} value={value} placeholder='Enter your Name' onChangeText={onChange}/>
            )}/>
            {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

             <Text style={styles.textStyle}>Email</Text>
           <Controller
           control={control}
           name='email'
           rules={{required:'Email is Required'}}
           render={({field:{onChange,value}})=>(
            <TextInput style={styles.textInputStyle} value={value} placeholder='Enter your Email' onChangeText={onChange}></TextInput>
           )}/>
                 {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

            <Text style={styles.textStyle}>Password</Text>
            <Controller
            control={control}
            name='password'
            rules={{required:'Password is Required'}}
            render={({field:{onChange,value}})=>(
                <TextInput style={styles.textInputStyle} secureTextEntry value={value} onChangeText={onChange}></TextInput>
            )}
           />
                 {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}


            <Text style={styles.textStyle}>Confirm Password</Text>
            <Controller
            name='confirmPassword'
            control={control}
            rules={{
                required:'Confirm password is Required',
                validate:value=>value===password||'Password do not match'
            }}
            render={({field:{onChange,value}})=>(
                <TextInput style={styles.textInputStyle} secureTextEntry value={value} onChangeText={onChange}></TextInput>
            )}/>

              {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}
            
            <TouchableOpacity style={styles.buttonStyle} onPress={
                handleSubmit(onSubmit)
                
            }><Text style={styles.btnTextStyle}>REGISTER</Text></TouchableOpacity>

        </View>
        </ScrollView>
        <ToastManager/>
   </SafeAreaView>
  
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
    },
    textStyle:{
        fontSize:18,fontWeight:'600',padding:8,color:'black',marginHorizontal:15
    },
    textInputStyle:{
        borderWidth:2,borderRadius:10,paddingHorizontal:10,borderColor:"#D0D0D0",marginHorizontal:15
    },
    buttonStyle:{
        //margin:20,
        justifyContent:'center',
        backgroundColor:'#668cff',alignItems:'center',borderRadius:15,margin:15
    },
    btnTextStyle:{
        fontSize:20,fontWeight:'bold',padding:8,color:'white'
    },
    error:{
        color:'red',
        margin:10
    }
})