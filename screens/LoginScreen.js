import React, { useState, useEffect } from 'react';
import { TextInput, Button, StyleSheet, View,Image,AsyncStorage,Text,TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from "react-native-vector-icons/MaterialIcons";
import { addnote, deletenote ,addCategory,addUserToken,addUserName} from '../redux/appRedux'


export default function Login(props) {
  const dispatch = useDispatch()
  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [enabler,setEnabler] = useState(false);

  const onChangeText =function(key, value) {
    if(key =="username")
      setUserName(value);
    else if(key == "password")
      setPassword(value);
  }

  const state = useSelector(state => state)

  // const addNote =  note =>

  const getToken = async () => {
    return await AsyncStorage.getItem('token');
};

  const setToken = async (token) => {
    await AsyncStorage.setItem('token',token);
  }

  const setUserInfo = async (userInfo) => {
    await AsyncStorage.setItem('userInfo',userInfo);
  }

  const getUserInfo = async () =>{
    return await AsyncStorage.getItem('userInfo');
  }

  useEffect (() =>{
    if(enabler==false){
    getToken().then((token) =>{console.log("token123",token)
    setEnabler(true);
    getUserInfo().then((userInfo)=>{
      if(token!=undefined || token!='')
      {
      dispatch(addUserName(userName))
      dispatch(addUserToken(JSON.parse(token)))
      props.navigation.navigate('Root');
      // console.log("state.userInfo.token at login",state.userInfo.token);
      }
    })
    
    });
  }
    // if((state.userInfo.token && state.userInfo.token!='') || getToken().then(token =>{if(token!='') return true}))
    //   {
    //     async () => {
    //       try {
    //         props.navigation.navigate('Root');

    //       } catch (error) {
    //         // Error saving data
    //       }
    //     };
    //   }
  })

  const signUp = () => {
      props.navigation.navigate("Register");
    };

  const signIn = function() {
    console.log("props.app_state1",JSON.stringify(state));
    if(userName==undefined || userName == '' || password == undefined || password == '' ){
      alert("Enter Valid Username/Password");
      return;
    }
    var reqObj = {};
    reqObj.username = userName;
    reqObj.password = password;
    // props.navigation.navigate('Root');
    fetch("https://www.grocyshop.in/authenticate",{
      method: "POST",
      body:JSON.stringify(reqObj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "http://localhost:5000",
      }})
      .then((response)=>{
        if(!response.ok) throw new Error(response.status);
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
           console.log("this.props.navigation",props.navigation);
  }
  
    return (
      <View style={styles.container}>
      <Image style={styles.image} source = {{uri:'https://emart-grocery.s3.ap-south-1.amazonaws.com/app-img/GSLogoMain+(M).png'}} />
        
        <TextInput
          onChangeText={value => onChangeText('username', value)}
          style={styles.input}
          placeholder="Mobile number"
          value = {userName}
        />
        <TextInput
          onChangeText={value => onChangeText('password', value)}
          style={styles.input}
          value = {password}
          secureTextEntry={true}
          placeholder="password"
        />
        <View style= {styles.inputButtonView}>
        <TouchableOpacity style={styles.inputButton} onPress={signIn}>
          <Text style={{color:'white'}}>Sign In
          <Icon name={ 'keyboard-arrow-right'} size={10}  />
          </Text>
        {/* <Button  title="Sign In" onPress={signIn} /> */}
        </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={signUp}>
        <View style={{marginVertical:10}}>
          <Text
          >New here? <Text style={{textDecorationLine: 'underline'}}>Sign Up</Text></Text>
        </View>
        </TouchableOpacity>
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
