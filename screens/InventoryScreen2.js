import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet,TextInput,Button,Card, ListItem,ScrollView, AsyncStorage,Image,Switch,TouchableHighlight, Alert } from 'react-native';
import Constants from 'expo-constants';
import CardLayout from '../components/CardLayout';
import TabBarIcon from '../components/TabBarIcon';
import * as Location from 'expo-location';
import Accordian from '../components/Accordion';
import { useSelector, useDispatch } from 'react-redux';
import {SearchBar} from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { ScrollView } from 'react-native-gesture-handler';
import { setProductList, clearProductsFromCart} from '../redux/appRedux'
import CartCardLayout from '../components/CartCardLayout';
import { useGestureHandlerRef } from 'react-navigation-stack';
import RazorpayCheckout from 'react-native-razorpay';



export default function App(props) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [totalValue,setTotalValue]  = useState(0);
  const [search,setSearchState] = useState('');
  const [token,setToken] = useState(null);
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const [productsList,setProductsList] = useState(null);
  const [stringProd,setStringProd] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);


  
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
  
  useEffect(() => {
    console.log("useEffect invoked");
    var total_value = 0;
    for(var i = 0;state.cart.length>i;i++){
      total_value = state.cart[i].totalItemValue + total_value;
    }
    setTotalValue(total_value);
  }, [state]);

  const updateSearch = search => {
    console.log("e.target.value",search)
    setSearchState({ search });
  };
  // const addNote =  note =>

  const placeOrder = () =>{
    console.log("state",state);
    var orderList = [];
    var preOrderList = state.cart;
    console.log("preOrderList",preOrderList);
    var retailor_id = state.cart[0].retailer_id;
    console.log("retailor_id",retailor_id);
    var requestObj = {};
    requestObj["retailerId"] = retailor_id;
    requestObj["deliveryBoy"] = "";
    requestObj["customerId"] = state.userInfo.userId;
    requestObj["totalCartValue"] = 0;
    requestObj["address"] = "";
    requestObj["deliveryNote"] = "nothing";
    requestObj["paymentStatus"] = "COD";
    for(var i = 0;i<state.cart.length;i++){
      var temp = {};
      temp["inventoryId"] = preOrderList[i]["inventory_id"];
      temp["quantity"]= preOrderList[i]["quantity"];
      temp["discountCode"] = "";
      temp["discountPercentage"] = 0.00;
      temp["totalItemValue"] = preOrderList[i]["totalItemValue"];
      requestObj["totalCartValue"] = requestObj["totalCartValue"] + temp["totalItemValue"];
      orderList.push(temp);
    }
      requestObj["orderList"] = orderList;
      var status_temp = {};
      status_temp["retailerId"] = retailor_id;
      status_temp["customerId"] = state.userInfo.userId;
      status_temp["status"] = "INITIATED";
      requestObj["status"] = [];
      requestObj["status"].push(status_temp);
      console.log("----->");
      console.log(JSON.stringify(requestObj));
    fetch("https://www.grocyshop.in/api/v1/order/order",{
      method: "POST",
      body:JSON.stringify(requestObj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "http://localhost:5000",
        'Authorization': 'Bearer ' + state.userInfo.token,
      }})
      .then((response)=>{
         //console.log(response);
        if(!response.ok) throw new Error(response.status);
        else return response.json();
        }).then((response)=>{
          console.log("response"+response);
              dispatch(clearProductsFromCart(state.cart));
              Alert.alert("Order has been Successfully Placed :)");
              props.navigation.navigate('Root',{screen:'Orders'});
        }).catch((e)=>{
          Alert.alert("Store is Offline :(");
          console.log(e)})


  }

  return (
    
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      {(state.cart==undefined || state.cart.length<1) && 
      <View style={styles.container}>
      <Image style={styles.image} source = {{uri:'https://emart-grocery.s3.ap-south-1.amazonaws.com/app-img/GSLogoMain+(M).png'}} />
      <Text style={{color:'#fff',fontWeight:"400"}}> No Items Added  </Text>
      </View>
    }
    
    {(state.cart!=undefined && state.cart.length>0) &&
      <View style={styles.container}>
      <CartCardLayout 
                itemsList = {state.cart}
                
      />
      </View>
      
      
      }
    {state.cart!=undefined && state.cart.length>0 &&
      <View>
      <Text style={{fontWeight:"bold",textAlign:"center",fontSize:18,marginTop:20}}>Total:  {totalValue}</Text>
      <View style={{flexDirection:'row',paddingTop:25,paddingHorizontal:20}}>
        <Text style={{paddingTop:7}}>Online Payment</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#041a40" : "#041a40"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text style={{paddingTop:7}}>Cash</Text>
      {!isEnabled &&
      <View style={{flex:1,marginHorizontal:20}}>
        <TouchableHighlight onPress={() => {
          var options = {
            description: 'Order for grocy',
            image: 'https://i.imgur.com/3g7nmJC.png',
            currency: 'INR',
            key: 'rzp_test_DUAY4XD3KWaMYE', // Your api key
            amount: ''+totalValue,
            name: 'GrocyShop',
            prefill: {
              email: 'void@razorpay.com',
              contact: '9191919191',
              name: 'Razorpay Software'
            },
            theme: {color: '#F37254'}
          }
          console.log("options",options);
          RazorpayCheckout.open(options).then((data) => {
            // handle success
            alert(`Success: ${data.razorpay_payment_id}`);
          }).catch((error) => {
            // handle failure
            alert(error);
            alert(`Error: ${error.code} | ${error.description}`);
          });
          }}>
          <Button style={{flex:1,backgroundColor:'#ffff',flexDirection:"row"}} disabled title={"Pay Online"}/> 
          {/* Pay Now </Text>} */}

          </TouchableHighlight>
        </View>}
      {isEnabled &&
        <View style={{flex:1,marginHorizontal:20}}>
                    <Button style={{flex:1,backgroundColor:'#ffff',flexDirection:"row"}} title={"Place Order"} onPress={placeOrder}/> 
        </View>
      
      }


    </View>
    </View>
    }
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
    backgroundColor: '#d95443',
  },
  scrollView: {
    width:'100%',

    backgroundColor: '#d95443',
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
