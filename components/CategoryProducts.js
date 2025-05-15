import { StyleSheet, Text, View, Dimensions, Image, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect, } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const CategoryProducts = ({ route, navigation }) => {
  const { item } = route.params;
  const screenWidth = Dimensions.get('screen').width;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const isFocused = useIsFocused();
  const noc = Math.floor(screenWidth / 200);
   const products = useSelector(state => state.products.products[0]);



  useEffect(() => {
    if (isFocused&&products.length>0) {
      getData();
    }

  }, [sortBy,products,isFocused]);




  const getData = async () => {

    try {
      if (sortBy != null) {

       if (sortBy === 'asc') {

          const sData = [...data].sort((a, b) => a.price - b.price);
          setData(sData);
          
        }

        if (sortBy === 'desc') {
          const sData = [...data].sort((a, b) => b.price - a.price);
          setData(sData);
        }

      } else {

        const fdata=[...products].filter(product => 
          product.category == item);
        setData(fdata);
      }


    }
    catch (error) {
      console.log("error", error);
    }
    setIsLoading(false);


  };

  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { 'item': item })}  >
        <View style={styles.box}>

          <Image style={{ width: 150, height: 150 }} source={{ uri: item.thumbnail }}></Image>
          <Text style={{ fontWeight: 'bold', color: 'black', }}>{item.title}</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', }}>${item.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'}></ActivityIndicator>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{item}</Text>

      </View>

      <View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontWeight: 'bold', marginTop: 10, fontSize: 27, color: 'black', marginHorizontal: 10 }}>Products</Text>
          <TouchableOpacity onPress={() => setShowOptions(!showOptions)}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: 'bold', marginTop: 10, fontSize: 27, color: 'black', marginHorizontal: 10 }} >Sort</Text>
              <MaterialCommunityIcons style={{ marginTop: 12, marginHorizontal: 10 }} name='sort' size={27} color='black'></MaterialCommunityIcons>
            </View>
          </TouchableOpacity>
        </View>




        {showOptions && (
          <View style={styles.dropDown} >
            <TouchableOpacity onPress={() => {
              setSortBy('asc')
              setShowOptions(!showOptions)
            }
            } >
              <Text style={{ fontWeight: '600', color: sortBy === 'asc' && 'red', fontSize: 16, marginBottom: 5 }} >Low to High</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setSortBy('desc')
              setShowOptions(!showOptions)
            }} >
              <Text style={{ fontWeight: '600', color: sortBy === 'desc' && 'red', fontSize: 16, marginBottom: 5 }} >High to Low</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setSortBy(null)
              setShowOptions(!showOptions)
            }} >
              <Text style={{ fontWeight: '600', color: sortBy == null && 'red', fontSize: 16 }} >Popularity</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <ScrollView>

      <View>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={noc}
        />
      </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default CategoryProducts

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
    flex:1

  },
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
  },
  dropDown: {
    position: 'absolute',
    top: 50,
    right: 0,
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 8,
    padding: 10,
    zIndex: 1000,
    minWidth: 150,
    marginRight: 10,
    alignItems: 'center'
  }
})