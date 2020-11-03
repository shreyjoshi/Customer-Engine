import React, { useState, useEffect } from 'react';
import { TextInput, Button, StyleSheet, View,Image,AsyncStorage, Alert,TouchableOpacity,Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { addnote, deletenote ,addCategory,addUserToken,addUserName} from '../redux/appRedux'
import Icon from "react-native-vector-icons/MaterialIcons";

import LocationScreen from './LocationScreen';

export default function Login(props) {
  const dispatch = useDispatch()
  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [mobileNumber,setMobileNum] = useState('');
  const [confirmPass,setConfirmPass] = useState('');
  const [email,setEmail] = useState('');
  const [expandAddress,setExpandAddress] = useState(false);
  const [address,setAddress] = useState('');

  const onChangeText =function(key, value) {
    if(key =="name")
      setUserName(value);
    else if(key == "password")
      setPassword(value);
    else if(key == "mobile")
      setMobileNum(value);
    else if(key == "confirmPass")
      setConfirmPass(value);
    else if(key == "email")
      setEmail(value);  
  }
  const state = useSelector(state => state)

  // const addNote =  note =>

  useEffect (() =>{
    if(state.userInfo.token && state.userInfo.token!='')
      {
        async () => {
          try {
            await AsyncStorage.setItem('token',state.userInfo.token );
            props.navigation.navigate('Root');

          } catch (error) {
            // Error saving data
          }
        };
      }
  })

  const getLocalInfo = function(reqObj){
    console.log("here",reqObj.address);
    setAddress(reqObj.address);
    setExpandAddress(false);
    
  }

  const closeModal = function(){
    setExpandAddress(false);
  }

  const setToken = async (token) => {
    await AsyncStorage.setItem('token',token);
  }

  const setUserInfo = async (userInfo) => {
    await AsyncStorage.setItem('userInfo',userInfo);
  }

  const signIn = function() {
    console.log("props.app_state1",JSON.stringify(state));
    if(password==undefined || password == '' || confirmPass == undefined || confirmPass == '' ){
      alert("Mismatch password");
      return;
    }

    if(email==undefined || email=='' || userName==undefined || userName == '' || mobileNumber == undefined || mobileNumber == '' ){
      alert("Missing Field(s)");
      return;
    }

    var reqObj = {};
    reqObj.userName = userName;
    reqObj.passcode = password;
    reqObj.mobileNo = mobileNumber;
    reqObj.emailId = email;
    reqObj.addressList = [address];
    // reqObj.addressList.push(address);
    // props.navigation.navigate('Root');
    fetch("https://www.grocyshop.in/api/v1/consumer/createConsumer",{
      method: "POST",
      body:JSON.stringify(reqObj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "http://localhost:5000",
      }})
      .then((response)=>{
        // console.log(response);
        if(!response.ok) throw new Error(response.status);
        else return response.json();
        }).then((response)=>{
          console.log("response");
          
          //console.log("props.app_state",JSON.stringify(state));
              //  AsyncStorage.setItem('token',response.token );
              var reqObjSignIn={};
              reqObjSignIn.username = mobileNumber;
              reqObjSignIn.password = password;
              // console.log("reqObjSignIn - "+JSON.stringify(reqObjSignIn))
              Alert.alert("Successfully Registered");
              fetch("https://www.grocyshop.in/authenticate",{
                  method: "POST",
                  body:JSON.stringify(reqObjSignIn),
                  headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    "Access-Control-Allow-Origin": "http://localhost:5000",
                  }})
                  .then((response)=>{
                    if(!response.ok) throw new Error(JSON.stringify(response));
                    else return response.json();
                    }).then((response)=>{
                      setToken(JSON.stringify(response));
                      setUserInfo(userName);
                      console.log("response",response);
                      dispatch(addUserName(userName))
                      dispatch(addUserToken(response))
                      
                      dispatch(deletenote(1));
                      console.log("props.app_state",JSON.stringify(state));
                          //  AsyncStorage.setItem('token',response.token );
                          props.navigation.navigate('Root');
              
                      

                    }).catch((e)=>{(console.log(e))})
              // setUserName("");
              // setPassword("");
              // setConfirmPass("");
              // setEmail("");
              // setAddress("");
              // setMobileNum("");   
              //props.navigation.navigate('Auth', { screen: 'Login' });
              props.navigation.navigate('Login');
  
          

        }).catch((e)=>{(console.log(e))})
          //  console.log("this.props.navigation",props.navigation);
  }

  const addAddress = function(){
    setExpandAddress(!expandAddress); 
  }

  
    return (
      <View style={styles.container}>
      <Image style={styles.image} source = {{uri:'https://emart-grocery.s3.ap-south-1.amazonaws.com/app-img/GSLogoMain+(M).png'}} />
        
        <TextInput
          onChangeText={value => onChangeText('email', value)}
          style={styles.input}
          placeholder="Email"
          value = {email}
        />
        <TextInput
          onChangeText={value => onChangeText('name', value)}
          style={styles.input}
          placeholder="Name"
          value = {userName}
        />
        <TextInput
          onChangeText={value => onChangeText('mobile', value)}
          style={styles.input}
          value = {mobileNumber}
          keyboardType = {"numeric"}
          placeholder="Mobile Number"
        />
        <TextInput
          onChangeText={value => onChangeText('password', value)}
          style={styles.input}
          value = {password}
          secureTextEntry={true}
          placeholder="Password"
        />
        <TextInput
          onChangeText={value => onChangeText('confirmPass', value)}
          style={styles.input}
          value = {confirmPass}
          secureTextEntry={true}
          placeholder="Confirm Password"
        />
        {(address ==undefined || address == '') && <View style= {styles.inputButtonView}>
        <TouchableOpacity style={styles.inputButton} onPress={addAddress}>
          <Text style={{color:'white'}}>Add Address
          <Icon name={ 'keyboard-arrow-down'} size={10}  />
          </Text>
        {/* <Button  title="Sign In" onPress={signIn} /> */}
        </TouchableOpacity>
        </View>}
        {/* <View style= {styles.inputButton}> */}
        {/* <Button style={styles.inputButton} title="Add Address" onPress={addAddress} /> */}
        {expandAddress &&
          <LocationScreen
          modalVisible={expandAddress}
          getLocationStatus = {getLocalInfo}
          closeModal = {closeModal}
          />
        }
        {address!='' &&
        <TouchableOpacity style={styles.inputButton} onPress={signIn}>
        <Text style={{color:'white'}}>Sign Up
        <Icon name={ 'keyboard-arrow-down'} size={10}  />
        </Text>
      {/* <Button  title="Sign In" onPress={signIn} /> */}
      </TouchableOpacity>
        }
        {/* </View> */}
      </View>
    );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    // paddingLeft:50,
    paddingHorizontal:20,
    width:"100%",
    margin: 10,
  },
  inputButtonView:{
    width:'100%'
  },  
  inputButton: {
    width:'40%',
    marginLeft:'auto',
    height:40,
    borderColor:'#e20000',
    borderRadius:30,
    justifyContent: 'center', 
    alignItems:'center',
    backgroundColor:'#cf2f29'
    

  },
  image:{
    height: 100,
    resizeMode:'contain',
    width:500,
    margin: 7,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems:'center',
    padding: 16,
  },
});
