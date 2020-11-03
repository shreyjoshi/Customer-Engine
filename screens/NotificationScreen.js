import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet,ScrollView,Image } from 'react-native';
import Accordian from '../components/Accordion';
import { useSelector, useDispatch } from 'react-redux';
import {SearchBar} from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [activeSelector,setActiveSelector]  = useState(null);
  const [search,setSearchState] = useState('');
  const [token,setToken] = useState(null);
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const [orderList,setOrderList] = useState(null);
  const [stringProd,setStringProd] = useState('');


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
    console.log("state.inventory",state.inventory);
    console.log("state.userInfo",state.userInfo);
      console.log("abc");
      console.log("token",token);
      setToken({token});
      fetch("https://www.grocyshop.in/api/v1/order/getConsumerOrder?id="+state.userInfo.userId,{
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': 'Bearer ' + state.userInfo.token,
            "Access-Control-Allow-Origin": "http://localhost:5000",
        }})
        .then((response)=>{
            if(!response.ok) throw new Error(response.status);
            else return response.json();
            }).then((response)=>{
            //console.log("response in  order Tab",response);
            let orderList = {};
            for(var  i =0;i<response.length;i++){
                console.log("here 123",response[i]["retailerId"]);
                   // console.log("here 1234");
                var statusLevel = response[i]["status"];
                var curr_status = "INITIATED";
                for(var status_index = 0;status_index<statusLevel.length;status_index++ ){
                    curr_status = statusLevel[status_index]["status"];
                }
                if(orderList[curr_status]==undefined){
                    orderList[curr_status] = [];
                    }

                    orderList[curr_status].push(response[i]);
                    console.log("here");
                    console.log("orderListbefore",orderList);

                    // if(i == response.length-1){
                        //console.log("orderList",orderList);
                        setStringProd(JSON.stringify(orderList));
                        // setOrderList(orderList);
                        var finalList = [];
                        for(var key in orderList){
                            var temp = {};
                            temp["status"]  = key;
                            var val = orderList[key];
                            temp["orders"] = val;
                            finalList.push(temp);
                        }
                        console.log("finalList",finalList);
                        setOrderList(finalList);

                }
            
            
            }).catch((e)=>{(console.log(e))})
      setInterval(function(){
        fetch("https://www.grocyshop.in/api/v1/order/getConsumerOrder?id="+state.userInfo.userId,{
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': 'Bearer ' + state.userInfo.token,
            "Access-Control-Allow-Origin": "http://localhost:5000",
        }})
        .then((response)=>{
            if(!response.ok) throw new Error(response.status);
            else return response.json();
            }).then((response)=>{
            console.log("response in  order Tab",response);
            let orderList = {};
            for(var  i =0;i<response.length;i++){
                console.log("here 123",response[i]["retailerId"]);
                    console.log("here 1234");
                var statusLevel = response[i]["status"];
                var curr_status = "INITIATED";
                for(var status_index = 0;status_index<statusLevel.length;status_index++ ){
                    curr_status = statusLevel[status_index]["status"];
                }
                if(orderList[curr_status]==undefined){
                    orderList[curr_status] = [];
                    }

                    orderList[curr_status].push(response[i]);
                    console.log("here");
                    console.log("orderListbefore",orderList);

                        console.log("orderList",orderList);
                        setStringProd(JSON.stringify(orderList));
                        // setOrderList(orderList);
                        var finalList = [];
                        for(var key in orderList){
                            var temp = {};
                            temp["status"]  = key;
                            var val = orderList[key];
                            temp["orders"] = val;
                            finalList.push(temp);
                        }
                        console.log("finalList",finalList);
                        setOrderList(finalList);
                        

                }
            
            
            }).catch((e)=>{(console.log(e))})
            console.log("hitting again");
    },600000)


    console.log('mounted',token);
  
  }, []);



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
        containerStyle={{backgroundColor:'#d95443'}}
        value={search}
      />
    {(orderList==undefined || orderList.length<1) && 
      <View style={styles.container}>
      <Image style={styles.image} source = {{uri:'https://emart-grocery.s3.ap-south-1.amazonaws.com/app-img/GSLogoMain+(M).png'}} />
      <Text style={{color:'#fff',fontWeight:"400"}}> Check Network or No Orders Till Now  </Text>
      </View>
    }
    {orderList && orderList.length && orderList.map((l, i) => (
      <Accordian 
                title = {l.status}
                data = {l.data}
                itemsList = {l.orders}
                typeOrders = {true}
                key = {i}
                keyValue = {i.toString()}
      />
      ))
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
  }
  
});
