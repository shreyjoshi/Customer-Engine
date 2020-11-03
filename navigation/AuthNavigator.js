import { createStackNavigator } from 'react-navigation-stack'
import Login from '../screens/LoginScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import TabBarIcon from '../components/TabBarIcon';
import SignUp from '../screens/signUp';
import LocationScreen from '../screens/LocationScreen';
// import Signup from '../screens/Signup'


// const AuthNavigation = createStackNavigator(
//   {
//     Login: { screen: Login },
//     // Signup: { screen: Signup }
//   },
//   {
//     initialRouteName: 'Login'
//   }
// )

const BottomTab = createBottomTabNavigator();

export default function AuthNavigation({ navigation, route }) {
    // navigation.setOptions({ header: "none" });

  return (
    <BottomTab.Navigator
    initialRouteName="Login"
    screenOptions={{
        headerMode: 'none'
      }}
    tabBarOptions={{
        activeTintColor: 'red',
      }}
    >
      <BottomTab.Screen 
        name="Login" 
        component={Login} 
        headerMode="none"
        options={{
          title: 'Login',
          backgroundColor:"red",
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} backgroundColor={"red"} name="md-log-in" />,
        }}/>
        <BottomTab.Screen 
        name="Register" 
        component={SignUp} 
        headerMode="none"
        options={{
          title: 'SignUp',
          backgroundColor:"red",
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} backgroundColor={"red"} name="md-add-circle" />,
        }}/>
        {/* <BottomTab.Screen 
        name="local" 
        component={LocationScreen} 
        headerMode="none"
        options={{
          title: 'Location',
          backgroundColor:"red",
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} backgroundColor={"red"} name="md-log-in" />,
        }}/> */}
    </BottomTab.Navigator>
  );
}

// export default MyStack;