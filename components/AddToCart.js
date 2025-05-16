import { StatusBar, StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import CartItem from './CartItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const AddToCart = () => {

  const isFocused = useIsFocused();
  const { width, height } = Dimensions.get('screen');
  const [subTot, setSubTot] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const cartItems = useSelector(state => state.cartItems.cartItems);



  useEffect(() => {
    if (isFocused) {
      calculateTotal(cartItems);
    }

  }, [isFocused, cartItems]);

  const QuantityChange = (updatedCart) => {
    calculateTotal(updatedCart);
  };


  const calculateTotal = (cartItems) => {

    let s = 0;
    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      s += item.price * (item.quantity || 1);
    }

    setSubTot(s);


    setIsLoading(false);
  };



  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'}></ActivityIndicator>
      </View>
    );


  }


  return (

    <ScrollView style={{ paddingTop: 10 }}>

      {cartItems.map((item, index) => (



        <View key={item.id} style={{ marginBottom: 10 }}>
          <CartItem item={item} onQuantityChange={QuantityChange} ></CartItem>
        </View>
      ))}

      {
        cartItems.length > 0 ?
          (
            <View style={{ width: width * .95, height: height * .15, borderRadius: 20, borderWidth: 0, marginHorizontal: 10, marginTop: 20, backgroundColor: 'white', elevation: 2, marginBottom: 20 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Sub-Total</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>${Math.floor(subTot)}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Delivery Fee</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>$20</Text>
              </View>

              <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, width: width * .9, marginHorizontal: 10, marginTop: 20 }}>

              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginTop: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Total</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>${Math.floor(subTot + 20)}</Text>
              </View>


            </View>
          ) :
          (
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={{ fontSize: 20 }}>No items in Cart</Text>
            </View>
          )
      }



    </ScrollView>

  )
}

export default AddToCart

const styles = StyleSheet.create({})