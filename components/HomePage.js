import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home';
import AddToCart from './AddToCart';
import Favourites from './Favourites';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { getApp } from '@react-native-firebase/app';
import { getMessaging, onMessage, getToken, onNotificationOpenedApp, getInitialNotification } from '@react-native-firebase/messaging';


const Tab = createBottomTabNavigator();



const getTabBarIcon = (routeName, focused, color, size, cartCount) => {
  let iconName;

  if (routeName === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
    return <Ionicons name={iconName} color={color} size={size} />;
  }

  if (routeName === 'Cart') {
    iconName = focused ? 'cart' : 'cart-outline';
    return (
      <View>
        <Ionicons name={iconName} color={color} size={size} />
        {cartCount > 0 && (
          <View style={styles.countContainer}>
            <Text style={styles.count}>{cartCount}</Text>
          </View>
        )}
      </View>
    );
  }

  if (routeName === 'Favourites') {
    iconName = focused ? 'heart' : 'heart-outline';
    return <Ionicons name={iconName} color={color} size={size} />;
  }

  return null;
};

const HomePage = ({navigation}) => {


useEffect(() => {
  const messagingInstance = getMessaging(getApp());

  const unsubscribeForeground = onMessage(messagingInstance, async remoteMessage => {
    console.log('Foreground notification received:', remoteMessage);
  });

  const unsubscribeBackground = onNotificationOpenedApp(messagingInstance, remoteMessage => {
        console.log('Background notification received:', remoteMessage);
    handleNotificationNavigation(remoteMessage);
  });

  getInitialNotification(messagingInstance)
    .then(remoteMessage => {
      if (remoteMessage) {
        handleNotificationNavigation(remoteMessage);
      }
    });

  return () => {
    unsubscribeForeground();
    unsubscribeBackground();
  };
}, []);


  const handleNotificationNavigation = (remoteMessage) => {
    console.log('Notification caused app to open from quit state:', remoteMessage.data.item);
    if (remoteMessage?.data?.item) {
      try {
         const productData = typeof remoteMessage.data.item === 'string' ? JSON.parse(remoteMessage.data.item) : remoteMessage.data.item;
         console.log('Parsed product data:', productData);
        const d=products.find(product => product.id === productData.id);
        navigation.navigate('ProductDetails', { item: d });
      } catch (e) {
        console.log('Error parsing product data:', e);
      }
    }
  };
 
  const products = useSelector(state => state.products.products[0]);
  const cart = useSelector(state => state.cartItems.cartItems);
  const cartCount = cart.length;

  return (




    <Tab.Navigator screenOptions={({ route }) => ({

      headerShown: true,
      headerRight: () => {
        return <MaterialCommunityIcons style={{ paddingHorizontal: 5, paddingTop: 5 }} name='logout' size={30} />
      },
      //headerSearchBarOptions:route.name==='Home'?true:false,
      headerTitleAlign: 'center',
      headerTitleStyle: { fontWeight: '700', fontSize: 24, color: 'black' },
      headerBackButtonDisplayMode: true,
      headerLeft: () => {
        return <Image style={{ width: 30, height: 30, margin: 20 }} source={require('../assets/splash.png')}></Image>
      },
      tabBarActiveTintColor: 'red',

      tabBarIcon: ({ focused, color, size }) => {
        return getTabBarIcon(route.name, focused, color, size, cartCount)
      },

    })} >
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Cart' component={AddToCart} options={{ headerTitle: 'My Cart' }} />
      <Tab.Screen name='Favourites' component={Favourites} options={{ headerTitle: 'My Favourites' }} />
    </Tab.Navigator>

  )
}

export default HomePage


const styles = StyleSheet.create({
  countContainer: {
    position: 'absolute',
    left: 12,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  count: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },

});