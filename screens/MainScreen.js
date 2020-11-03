import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet,ScrollView,Image,BackHandler,Alert,AsyncStorage } from 'react-native';
import Accordian from '../components/Accordion';
import { useSelector, useDispatch } from 'react-redux';
import {SearchBar} from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { setProductList,setInventoryList, replaceCart} from '../redux/appRedux'



export default function App(props) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [activeSelector,setActiveSelector]  = useState(null);
  const [search,setSearchState] = useState('');
  const [token,setToken] = useState(null);
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const [productsList,setProductsList] = useState(null);
  const [stringProd,setStringProd] = useState('');


  const onChangeText =function(key, value) {
    this.setState({
      [key]: value,
    });
  }


    

    useEffect(() => {
      BackHandler.addEventListener('hardwareBackPress', function () {
        console.log("here123");
        if (Actions.state.index === 1) {
          BackHandler.exitApp()
        }
        BackHandler.exitApp()
        console.log("abc");
        return true
      });

    
    }, []);



  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        console.log("onBack");
        return true;
        // if (isSelectionModeEnabled()) {
        //   disableSelectionMode();
        //   return true;
        // } else {
        //   return false;
        // }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  const getCartInfo = async () => {
    return await AsyncStorage.getItem('cartList');
};


  useEffect(() => {

    

    // console.log("state.userInfo",state.userInfo);
      // console.log("abc");
      // console.log("token",token);
      setToken({token});
      console.log("yaya");
      var userCart = getCartInfo();
      console.log("userCart",userCart);
      userCart = JSON.parse(userCart);
      if(userCart.length && state.onboard){
        dispatch(replaceCart(userCart))
      }
      fetch("https://www.grocyshop.in/api/v1/product/getAllProduct",{
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
          // console.log("response",response);
          var temp  = {};
          var productsList = [];

          for(var i = 0;i<response.length;i++){
            var category = response[i]["category"];
            if(temp[category] == undefined || temp[category].length==0)
              {
                temp[response[i]["category"]]=[];
              }
              // console.log("-->i");
              // console.log(response[i]);
              temp[category].push(response[i]);
              // console.log('temp[response[i]["category"]]');
              // console.log(temp[category]);
              if(i==response.length-1){
                // temp = JSON.parse(temp);
                // console.log("temp123",JSON.stringify(temp));
                for (var key in temp) {
                  // if(temp.hasOwnProperty(key)){
                  // console.log("key1",key,temp[key]);
                    var val = temp[key];
                    // console.log("key",key);
                    // console.log("var",val);
                    var temp_var = {};
                    temp_var.category  = key;
                    temp_var.itemsList = val
                    productsList.push(temp_var);
                  // }
      
                }
                // console.log("productsList",productsList);
                setProductsList(productsList);
                var stringTemp = JSON.stringify(productsList);
                setStringProd(stringTemp);
                // console.log(stringProd);
              }
            }
          
          dispatch(setProductList(temp));
          // console.log(temp);
          var productsList = [];
        
        }).catch((e)=>{(console.log(e))})


        fetch("https://www.grocyshop.in/api/v1/retailer/getAllInventory",{
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
              console.log("in inventory response",response)
              dispatch(setInventoryList(response));
            }).catch((e)=>{(console.log(e))})


    console.log('mounted',token);
  
  }, []);

  const updateSearch = search => {
    console.log("e.target.value",search)
    setSearchState({ search });
  };

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  // const navigateStack = 

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView style={styles.scrollView}>
    <SearchBar
        platform = "android" 
        placeholder="Type Here..."
        onChangeText={setSearchState}
        containerStyle={{backgroundColor:"#d95443"}}
        value={search}
      />
    {/* <Text>:->{stringProd}</Text> */}
    {(productsList==undefined || productsList.length<1) && 
      <View style={styles.container}>
      <Image style={styles.image} source = {{uri:'https://emart-grocery.s3.ap-south-1.amazonaws.com/app-img/GSLogoMain+(M).png'}} />
      <Text style={{color:'red',fontWeight:"400"}}> Check Network or No Item Available</Text>
      </View>
    }
    {productsList && productsList.length && productsList.map((l, i) => (
      <Accordian 
                title = {l.category}
                data = {l.data}
                itemsList = {l.itemsList}
                key = {i}
                keyValue = {i.toString()}
                navigationStack = {this.props.navigation}
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
    backgroundColor:'#d95443',
    // justifyContent: "center",
    alignItems: "center",
    // backgroundColor: '#fafafa',
  },
  scrollView: {
    width:'100%',

    backgroundColor: '#d95443',
    // marginHorizontal: 20,
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
