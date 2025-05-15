import { SafeAreaView, StatusBar, StyleSheet, Text, FlatList, View, Dimensions, ActivityIndicator, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../src/redux/slice/favitems';

const Favourites = ({ navigation }) => {

  const screenWidth = Dimensions.get('screen').width;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();
  const [isFav, setIsFav] = useState(true)
  const noc = Math.floor(screenWidth / 200);
  const favItems = useSelector(state => state.favs.favs);
  const dispatch = useDispatch();


  useEffect(() => {
    if (isFocused) {

    }
  }, [isFocused]);






  const renderItem = ({ item }) => (

    <View style={styles.container}>

      <View style={styles.box}>
        <TouchableOpacity style={{ position: 'absolute', top: 5, right: 10 }} onPress={() => {
          dispatch(removeItem(item.id));
        }} >
          <Ionicons name='heart' size={20}></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { 'item': item })}  >
          <Image resizeMode='cover' style={{ width: 120, height: 120 }} source={{ uri: item.thumbnail }}></Image>
        </TouchableOpacity>
        <Text style={{ fontWeight: 'bold', color: 'black', }}>{item.title}</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', }}>${item.price}</Text>
      </View>

    </View>

  );

  //  if(isLoading){
  //           return(
  //             <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
  //                 <ActivityIndicator size={'large'}></ActivityIndicator>
  //             </View>
  //           );
  //         }


  return (

    <SafeAreaView style={{ flex: 1, }}>


      {favItems.length > 0 ? (
        <FlatList
          data={favItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={noc}
        />
      )

        :
        (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ fontSize: 24 }}>No Favourite Items</Text></View>
        )
      }



    </SafeAreaView>
  )
}

export default Favourites

const styles = StyleSheet.create({
  container: {

    flex: 1,
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#D0B9A7',

    // backgroundColor:'grey',
    height: 220,
    width: 190,
    borderRadius: 15
  }
})