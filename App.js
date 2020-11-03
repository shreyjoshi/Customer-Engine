import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View,Text } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer,DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import { Provider as StoreProvider } from 'react-redux'
import store from './redux/store'
import AppContainer from './navigation'
import AuthNavigation from './navigation/AuthNavigator'



const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <StoreProvider store={store}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        {/* <NavigationContainer  ref={containerRef} initialState={initialNavigationState}>
        <Stack.Navigator>
        <Stack.Screen name="Dashboard" component = {AuthNavigation}
              options={{
                headerStyle: {
                  backgroundColor: '#f4511e',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            /> */}
        {/* <AppContainer/> */}
        {/* </Stack.Navigator> */}

      {/* </NavigationContainer>  */}

        <NavigationContainer  ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator>
          <Stack.Screen name="Dashboard" component = {AuthNavigation}
              // header = "none"
              // navigationOptions= {{
              //   header: null}}
            
              options={{headerMode: 'none', headerShown : false}}
              //   headerStyle: {
              //     backgroundColor: '#f4511e',
              //   },
              //   headerTintColor: '#fff',
              //   headerTitleStyle: {
              //     fontWeight: 'bold',
              //   },
              // }}
            />
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            
          </Stack.Navigator>
        </NavigationContainer>
      </View>
      </StoreProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',

    backgroundColor: '#fff',
  },
});

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
  },
};
