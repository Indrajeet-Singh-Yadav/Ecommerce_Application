import { ActivityIndicator, Button, TextInput, Dimensions, FlatList, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from '@react-navigation/native';
import { SearchBar } from 'react-native-screens';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { addProducts } from '../src/redux/slice/products';


const Home = ({ navigation }) => {

  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showOptions, setShowOptions] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const isFocused = useIsFocused();
  const noc = Math.floor(screenWidth / 200);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products[0]);
  const inputRef = useRef(null);
  const [crossTapped, setCrossTapped] = useState(0);
  const [itemsAvail, setitemsAvail] = useState(true);
  useEffect(() => {

    if (isFocused) {
      getData();
    }

  }, [sortBy, isLoading]);


  const searchProducts = () => {

    const filterData = products.filter((item) => item.title.toLowerCase().includes(searchQuery));
    setData(filterData);
    if (filterData.length == 0) {
      setitemsAvail(false);
    }

  }

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

        if (crossTapped != 0) {

          searchProducts();

        }
        if (sortBy == null && crossTapped == 0) {

          let response = await fetch('https://dummyjson.com/products?limit=0');
          let json = await response.json();
          dispatch(addProducts(json.products));
          setData(json.products);
          const catg = json.products.reduce((unique, item) => {
            if (!unique.includes(item.category)) {
              unique.push(item.category);
            }
            return unique;
          }, []);
          setCategory(catg);
        }
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

  const renderCategoryItem = ({ item }) => (

    <TouchableOpacity onPress={() => navigation.navigate('CategoryProducts', { 'item': item })}  >

      <View style={{ elevation: 2, height: 50, width: 150, margin: 10, backgroundColor: 'white', justifyContent: 'center', borderRadius: 20 }}>

        {/* <Image  style={{width:130,height:130,resizeMode:'center'}} source={{uri:item.image}}></Image> */}

        <Text style={{ textTransform: 'capitalize', fontSize: 18, fontWeight: 'bold', color: 'black', alignSelf: 'center', }}>{item}</Text>

      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'}></ActivityIndicator>
      </View>
    );


  }

  return (
    <ScrollView>

      <View>

        <View style={styles.header}>

          <View style={{ flexDirection: 'row', width: screenWidth * .85, height: 40, marginHorizontal: 5, marginTop: 5 }}>
            <TextInput
              style={styles.searchInput}
              ref={inputRef}
              placeholder="Search products, brands & more..."
              placeholderTextColor={'black'}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={
                () => {
                  if (searchQuery.length > 0) {
                    searchProducts();
                    setCrossTapped(1);
                  }
                }

              }

            />
            <TouchableOpacity onPress={() => {
              setSearchQuery('');
              setData(products);
              inputRef.current.blur();
              setCrossTapped(0);
              setitemsAvail(true);

            }} style={styles.icon}>
              {searchQuery.length > 0 && <Ionicons style={{ position: 'absolute', top: 10, right: 15 }} name="close" size={20} color="black" />}
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => {
            if (searchQuery.length > 0) {
              searchProducts();
              setCrossTapped(1);
            }
          }} style={styles.icon}>
            <Ionicons name="search" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ margin: 10, fontSize: 27, fontWeight: 'bold', color: 'black' }}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 10 }}>
            {category.map((item, index) => (
              <TouchableOpacity activeOpacity={0.8} key={index} onPress={() => navigation.navigate('CategoryProducts', { item })}>
                <View style={{ elevation: 2, height: 50, width: 150, margin: 10, backgroundColor: 'white', justifyContent: 'center', borderRadius: 20 }}>
                  <Text style={{ textTransform: 'capitalize', fontSize: 18, fontWeight: 'bold', color: 'black', alignSelf: 'center' }}>{item}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ margin: 10, fontSize: 27, fontWeight: 'bold', color: 'black' }}>Products</Text>
          <View>
            <TouchableOpacity onPress={() => setShowOptions(!showOptions)}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: 'bold', marginTop: 10, fontSize: 27, color: 'black', marginHorizontal: 10 }} >Sort</Text>
                <MaterialCommunityIcons style={{ marginTop: 12, marginHorizontal: 10 }} name='sort' size={27} color='black'></MaterialCommunityIcons>
              </View>


            </TouchableOpacity>

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
        </View>



        {
          !itemsAvail ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: screenHeight * .5 }}><Text style={{ fontSize: 20, fontWeight: '800' }}>No Items Available for {searchQuery}</Text></View>
            : (<FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              numColumns={noc}
            />)
        }





      </View>
    </ScrollView>



  )
}

export default Home

const styles = StyleSheet.create({
  container: {

    flex: 1,
    position: 'relative'

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
    borderRadius: 15,
    position: 'relative'
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
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    //  paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 10,
    backgroundColor: '#f8f8f8',
    height: 60,
  },
})
