import { StatusBar, StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { removeCartItem } from '../src/redux/slice/products';
import { removeItemFromCart, updateItemToCart } from '../src/redux/slice/myCart';
import { updateItemQuantity } from '../src/redux/slice/myCart'; // updated import



const CartItem = ({ item, navigation, onQuantityChange }) => {

  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cartItems.cartItems);

  const title = item.title.slice(0, 20);


  useEffect(() => {
    const cartItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (cartItem) {
      setCount(cartItem.quantity);
    }

  }, [cartItems])




  const updateQuantity = (newCount) => {
    dispatch(updateItemQuantity({ id: item.id, quantity: newCount }));
    setCount(newCount);
    onQuantityChange(
      cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: newCount }
          : cartItem
      )
    );
  };


  const { width, height } = Dimensions.get('screen');
  const [count, setCount] = useState(item.quantity || 1);

  //const title = (item.title).slice(0, 20);

  const removeItem = () => {
    dispatch(removeItemFromCart(item.id));


  }

  return (
    <View style={{ marginHorizontal: 10, elevation: 2, borderRadius: 10, flexDirection: 'row', width: width * .95, height: height * .15, backgroundColor: 'white' }}>
      <View style={{ width: width * .25, height: height * .12, elevation: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: '#D0B9A7', borderRadius: 10, margin: 10, }}>
        <Image resizeMode='cover' style={{ width: width * .25, height: height * .12, }} source={{ uri: item.thumbnail }}></Image>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 5, marginTop: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', }}>{title}</Text>
          <TouchableOpacity onPress={() =>
            removeItem()
          }>
            <Ionicons name="close" size={28} color="black" />
          </TouchableOpacity>

        </View>
        <Text style={{ marginHorizontal: 5, marginTop: 10, fontSize: 15, fontWeight: '400', color: 'black' }}>{item.category}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginHorizontal: 5 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: 'black' }}>{item.price}</Text>
          <View style={{ flexDirection: 'row', borderRadius: 20, elevation: 2, width: 120, backgroundColor: '#D0B9A7', justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => {
              if (count > 1) {
                updateQuantity(count - 1);
              }
              if (count == 1) {
                removeItem();
              }
            }}>
              <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black', paddingHorizontal: 15 }}>-</Text>
            </TouchableOpacity>

            <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black' }}>{count}</Text>

            <TouchableOpacity
              onPress={() => {
                updateQuantity(count + 1);
              }}

            >
              <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black', paddingHorizontal: 15 }}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem

const styles = StyleSheet.create({})