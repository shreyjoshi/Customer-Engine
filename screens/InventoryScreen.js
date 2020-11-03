import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet,TextInput,Button,Card, ListItem,ScrollView } from 'react-native';
import Constants from 'expo-constants';
import CardLayout from '../components/CardLayout';
import TabBarIcon from '../components/TabBarIcon';
import * as Location from 'expo-location';
import Accordian from '../components/Accordion';
import { useSelector, useDispatch } from 'react-redux';
import {SearchBar} from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { ScrollView } from 'react-native-gesture-handler';

const list = [
  { 
    title: 'Non Veg Biryanis', 
    data: 'Biryani also known as biriyani, biriani, birani or briyani, is a mixed rice dish with its origins among the Muslims of the Indian subcontinent. This dish is especially popular throughout the Indian subcontinent, as well as among the diaspora from the region. It is also prepared in other regions such as Iraqi Kurdistan.',
    itemsList :[
      {  id:1,
         name: 'itemOne',
         avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
         deliveryTime: "42mins",
         added:true,
      },
      {  id:2,
         name: 'itemSecond',
         avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
         deliveryTime: "45mins",
         added:true,
       },
     ]
  },
  { 
    title: 'Pizzas',
    data: 'Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough topped with tomatoes, cheese, and various other ingredients (anchovies, olives, meat, etc.) baked at a high temperature, traditionally in a wood-fired oven. In formal settings, like a restaurant, pizza is eaten with knife and fork, but in casual settings it is cut into wedges to be eaten while held in the hand. Small pizzas are sometimes called pizzettas.',
    itemsList:[
      {  id:1,
         name: 'itemOne',
         avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
         added:true,
         deliveryTime: "42mins"
      },
      {  id:2,
         name: 'itemSecond',
         avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
         added:true,
         deliveryTime: "45mins",
       },
     ]
  },
  { 
   title: 'Drinks',
   data: 'A drink (or beverage) is a liquid intended for human consumption. In addition to their basic function of satisfying thirst, drinks play important roles in human culture. Common types of drinks include plain drinking water, milk, coffee, tea, hot chocolate, juice and soft drinks. In addition, alcoholic drinks such as wine, beer, and liquor, which contain the drug ethanol, have been part of human culture for more than 8,000 years.',
   itemsList:[
    {  id:1,
       name: 'itemOne',
       avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
       deliveryTime: "42mins"
    },
    {  id:2,
       name: 'itemSecond',
       avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
       added:true,
       deliveryTime: "45mins",
     },
   ]
  },
  { 
    title: 'Deserts',
    data: 'A dessert is typically the sweet course that concludes a meal in the culture of many countries, particularly Western culture. The course usually consists of sweet foods, but may include other items. The word "dessert" originated from the French word desservir "to clear the table" and the negative of the Latin word servire',
    itemsList:[
      {  id:1,
         name: 'itemOne',
         avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
         added:true,
         deliveryTime: "42mins"
      },
      {  id:2,
         name: 'itemSecond',
         avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
         added:true,
         deliveryTime: "45mins",
       },
     ]
  },
];


export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [activeSelector,setActiveSelector]  = useState(null);
  const [search,setSearchState] = useState('');
  const state = useSelector(state => state)
  const users = [
   {
      name: 'brynn',
      avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
   },
  ]
  const onChangeText =function(key, value) {
    this.setState({
      [key]: value,
    });
  }
  const updateSearch = search => {
    console.log("e.target.value",search)
    setSearchState({ search });
  };
  // const addNote =  note =>

  const signIn = function() {
    // const { username, password } = this.state;
    // this.setState({userName:this.state.username});
    dispatch(addnote(1))

    console.log("this.props.navigation"+props.navigation.navigate("Dashboard"));//navigation.navigate("Dashboard"))
    // Auth.signIn(username, password)
    //   .then(user => {
    //     this.setState({ user });
    //     console.log('successful sign in!');
    //   })
    //   .catch(err => console.log('error signing in!: ', err));
  }

  // useEffect(() => {
  //   // console.log("notes"+JSON.stringify(state));
  //   (async () => {
  //     let { status } = await Location.requestPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //     }
  //
  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //   })();
  // });

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
    <SearchBar
        platform = "android" 
        placeholder="Type Here..."
        onChangeText={setSearchState}
        value={search}
      />
    {list.map((l, i) => (
      <Accordian 
                title = {l.title}
                data = {l.data}
                itemsList = {l.itemsList}
                key = {i}
                
      />
      ))
      }
    <Text style={styles.paragraph}>{text}</Text>

    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    width:null,
    
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fafafa',
  },
  scrollView: {
    width:'100%',

    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  paragraph: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  input: {
    height: 50,

    width:500,
    margin: 10,
  },
  inputButton: {
    height: 50,
    width:'55%',
    margin: 10,
  },
  image:{
    height: 100,
    resizeMode:'contain',
    width:500,
    margin: 7,
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   justifyContent: 'center',
  //   alignItems:'center',
  //   padding: 16,
  // },
});
