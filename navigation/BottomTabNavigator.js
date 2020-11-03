import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { TextInput, Button, StyleSheet, View,Image,AsyncStorage,Text,TouchableOpacity,TouchableHighlight, ImagePropTypes,Linking } from 'react-native';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import InventoryScreen2 from '../screens/InventoryScreen2';
import NotificationScreen from '../screens/NotificationScreen';
import RetailSelector from '../screens/RetailSelector';
import { HeaderBackButton } from 'react-navigation-stack';
import { Ionicons } from '@expo/vector-icons'; 

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Shops';

const dialCall = () => {
 
  let phoneNumber = '';

  if (Platform.OS === 'android') {
    phoneNumber = 'tel:${8905636166}';
  }
  else {
    phoneNumber = 'telprompt:${8905636166}';
  }

  Linking.openURL(phoneNumber);
};
export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route),
    headerRight: () => (
      <View style={{flexDirection:'row'}}>
      <TouchableHighlight onPress={()=>{
        dialCall()
        }}>
        <View style={{flexDirection:"row"}}>
        <Text style={{fontStyle:"italic",marginTop:3}}>Dial & Order</Text>
        <Ionicons name="md-call" style={{marginRight:20,marginLeft:10}}size={24} color="green" />
        </View>
        </TouchableHighlight>
      <TouchableHighlight style={{marginLeft:10}}onPress={()=>{
                    console.log("here on logout");
                    AsyncStorage.clear();
                    navigation.navigate('Dashboard');
                    // navigation.navigate('Auth')
        }}>
        <Ionicons name="md-log-out" style={{marginRight:10}}size={24} color="red" />
        </TouchableHighlight>
        </View>
      
    ),
    headerLeft:null
  });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}  tabBarOptions={{
      activeTintColor: 'red',
    }}>
      <BottomTab.Screen
        name="Shops"
        component={RetailSelector}
        
        options={{
          title: 'Shops',
          backgroundColor:"white",
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} backgroundColor={"red"} name="md-home" />,
          headerRight: () => (
            
            <TouchableHighlight onPress={()=>{}}>
              <Icon name = "md-logout-out"/>
              </TouchableHighlight>)
        }}
      />
      <BottomTab.Screen
        name="Cart"
        component={InventoryScreen2}
        options={{
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} backgroundColor={"red"} name="md-cart" />,
        }}
      />
      <BottomTab.Screen
        name="Orders"
        component={NotificationScreen}
        options={{
          title: 'Orders',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} backgroundColor={"red"} name="ios-notifications" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Products':
      return 'Products';
    case 'Shops':
      return 'Shops';
    case 'Cart':
      return 'Cart';
    case 'Orders':
      return 'Orders';
  }
}
