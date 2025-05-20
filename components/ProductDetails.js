import { Dimensions, Image, SafeAreaView, StatusBar, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../src/redux/slice/favitems';
import { addItemToCart,removeItemFromCart } from '../src/redux/slice/myCart';
import { updateItemQuantity } from '../src/redux/slice/myCart';

const ProductDetails = ({ route, navigation }) => {
  const { width, height } = Dimensions.get('screen');
  const [icon, setIcon] = useState('heart-outline');
  const { item } = route.params;
  const [inCart, setIsInCart] = useState(false);
  const tp = Math.floor(item.price + (item.price * item.discountPercentage) / 100);
  const dispatch = useDispatch();
  const favItems = useSelector(state => state.favs.favs);
    const products = useSelector(state => state.products.products[0]);
   const cartItems = useSelector(state => state.cartItems.cartItems);
  const isFocused = useIsFocused();
  const cartItem=cartItems.find(cart=>cart.id===item.id);
  const quantity=cartItem?.quantity||0;
  const [isBtnLoading,setisBtnLoading]=useState(false);

  
  useEffect(() => {
   checkFavItem();
  }, [])
  

    const removeItem =  () => {
      dispatch(removeItemFromCart(item.id));
     
    }

  const checkFavItem = async () => {

    const exists = favItems.some(fav => fav.id === item.id);
   

    if (exists) {
      setIcon('heart');
    }
    else {
      setIcon('heart-outline');
    }

  }


  const addToFav = () => {

    try {

      if (icon === 'heart-outline') {

        if (favItems.length >= 0) {
          dispatch(addItem(item))
          setIcon('heart');
        }


      }



      if (icon === 'heart') {

        dispatch(removeItem(item.id));
        setIcon('heart-outline');

      }


    } catch (error) {
      console.error("Error in addToFav:", error);
    }
  };





  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Detail Product</Text>

      </View>

      <ScrollView style={{ height: height * .9 }}>
        <View style={{ flex: 1 }}>
          <View style={{ width: width, height: height * 0.4, backgroundColor: '#e1b382' }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
            >
              {item.images.map((imgUrl, index) => (

                <Image
                  key={index}
                  source={{ uri: imgUrl }}
                  style={{
                    width: width * 0.9,
                    height: height * 0.4,
                    resizeMode: 'cover',
                  }}
                />
              ))}
            </ScrollView>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 28, fontFamily: 'Roboto', paddingTop: 20, fontWeight: 'bold', color: 'black', alignSelf: 'flex-start', marginLeft: 15 }}>{item.title}</Text>

          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 14, fontFamily: 'Roboto', fontWeight: '300', color: 'black', alignSelf: 'flex-start', marginLeft: 20 }}>By {item.brand}</Text>
            <TouchableOpacity onPress={
              () => {

                addToFav();
              }


            }>
              <Ionicons style={{ paddingHorizontal: 10 }} name={icon} size={25} color="red" />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginHorizontal: 20 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'black' }}>${item.price}</Text>
              <Text style={{ marginLeft: 10, fontSize: 25, textDecorationLine: 'line-through', fontWeight: '400', color: 'black' }}>${tp}</Text>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name='star-outline' size={24} color="gold" />
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', marginLeft: 5 }}>{item.rating}</Text>
            </View>
          </View>

          <Text style={{ fontSize: 16, paddingTop: 20, fontWeight: '400', color: 'black', alignSelf: 'flex-start', marginLeft: 20 }}>{item.description}</Text>

          <View style={{
            marginTop: 30,
            marginHorizontal: 20,
            marginBottom: 10,
            backgroundColor: '#f9f9f9',
            padding: 15,
            borderRadius: 10,
            elevation: 2,
          }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333' }}>Product Details</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={{ fontWeight: '600', }}>SKU:</Text>
              <Text style={{ fontWeight: '400', color: 'black' }}>{item.sku}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={{ fontWeight: '600', }}>Weight:</Text>
              <Text style={{ fontWeight: '400', color: 'black' }}>{item.weight} kg</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={{ fontWeight: '600', }}>Dimensions:</Text>
              <Text style={{ fontWeight: '400', color: 'black' }}>
                {item.dimensions.width} x {item.dimensions.height} x {item.dimensions.depth} cm
              </Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={{ fontWeight: '600', }}>Warranty:</Text>
              <Text style={{ fontWeight: '400', color: 'black' }}>{item.warrantyInformation}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text style={{ fontWeight: '600', }}>Shipping:</Text>
              <Text style={{ fontWeight: '400', color: 'black' }}>{item.shippingInformation}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: '600', }}>Availability:</Text>
              <Text style={{
                fontWeight: '400',
                color: item.availabilityStatus === 'In Stock' ? 'green' : 'red'
              }}>
                {item.availabilityStatus}
              </Text>
            </View>
          </View>




        </View>
      </ScrollView>
      <View style={{height: 60,justifyContent: 'center',alignItems: 'center',}}>
    
          <TouchableOpacity style={{backgroundColor:'red',paddingVertical: 12,paddingHorizontal: 40,borderRadius: 30,}} 
          disabled={isBtnLoading}
          onPress={() =>{
            setisBtnLoading(true);
            
            if(quantity===0){
              
              dispatch(addItemToCart(item));
              setisBtnLoading(false);
            }
            else{
              dispatch(updateItemQuantity({ id: item.id, quantity: quantity + 1 }));
              setisBtnLoading(false);
            }
          }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Add to Cart</Text>
          </TouchableOpacity>
    
      
        
          
       
       
      </View>
    </SafeAreaView>

  )
}

export default ProductDetails

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    flex: 1,

  },
})