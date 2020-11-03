import React, { useState, useEffect } from 'react';
import { Text,View,  Alert,Platform,
  Modal,
  StyleSheet,
  TouchableHighlight,TextInput,Button,TouchableOpacity,ImageBackground,ScrollView } from 'react-native';
  import { useSelector, useDispatch } from 'react-redux';
  import Accordian from './Accordion';
  import Icon from "react-native-vector-icons/MaterialIcons";
  import { SafeAreaView } from 'react-native-safe-area-context';
  import { Ionicons } from '@expo/vector-icons'; 


import { addUserToken } from '../redux/appRedux';

export default function ModalLayout(props) {
  const [checked,setState] = useState(false);
  // const [modalVisible, setModalVisible] = useState(false);
  const [sellPrice,setSellPrice] = useState(0);
  const [platformPrice,setPlatformPrice] = useState(0);
  const [expanded,setExpanded] = useState(false);
  // const state = useSelector(state => state)
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  


  useEffect(() => {

    console.log("in inventory2",props.retailorId);
    console.log("state.category",state.category);
    let stateProductList = state.products;
    let stateInventoryList = state.inventory;
    var response = [];
    for(var key in stateProductList){
        var catItemList = stateProductList[key];
        console.log("catItemList",catItemList);
        // console.log("stateInventoryList",stateInventoryList,"stateInventoryList.length",stateInventoryList.length);
        for(var j=0;j<catItemList.length;j++){
            for(var i = 0;i<stateInventoryList.length;i++){
                // console.log('catItemList[j]["id"]',catItemList[j]["id"]);
                console.log('stateInventoryList[i]["product_id"]',stateInventoryList[i]["product_id"]);
                if(stateInventoryList[i]["product_id"] == catItemList[j]["id"]){
                    // console.log("in if 1");
                    if(stateInventoryList[i]["retailer_id"] == props.retailorId){
                        // console.log("in if 2");
                        var temp_product = catItemList[j];
                        temp_product["added"] = true;
                        temp_product["inventory_obj"] = stateInventoryList[i];
                        response.push(temp_product);
                        break;
                    }
                }
                    
            }
        }
    }
    console.log("response1234",response);
    var temp  = {};
          var productsList = [];

          for(var i = 0;i<response.length;i++){
            var category = response[i]["category"];
            if(temp[category] == undefined || temp[category].length==0)
              {
                temp[response[i]["category"]]=[];
              }
              console.log("-->i");
              console.log(response[i]);
              temp[category].push(response[i]);
              console.log('temp[response[i]["category"]]');
              console.log(temp[category]);
              if(i==response.length-1){
                // temp = JSON.parse(temp);
                console.log("temp123",JSON.stringify(temp));
                for (var key in temp) {
                  // if(temp.hasOwnProperty(key)){
                  console.log("key1",key,temp[key]);
                    var val = temp[key];
                    console.log("key",key);
                    console.log("var",val);
                    var temp_var = {};
                    temp_var.category  = key;
                    temp_var.itemsList = val
                    productsList.push(temp_var);
                  // }
      
                }
                console.log("productsList123",productsList);
                setProductsList(productsList);
              }
            }


    // console.log('props["item"]["invObj"]',props["item"]["invObj"]);
    var sellPrice = props["item"]["invObj"] ? +props["item"]["invObj"]["sellingPrice"]:0;
    setSellPrice(sellPrice);
    var platformPrice = props["item"]["invObj"] ? props["item"]["invObj"]["priceToPlatform"]:0;
    setPlatformPrice(platformPrice);
  
  }, []);


  const onChangeText=function(str,value){
    if(str =="sellPrice")
      setSellPrice(value);
    else if(str == "platformPrice")
      setPlatformPrice(value);
  }

return(
<View style={styles.container}>
{props.modalVisible && <Modal
    style={styles.modalContent}
    show={false}
    animationType="slide"
    transparent={false}
    coverScreen={true}
    visible={props.modalVisible}
    onRequestClose={() => {
      props.setModalVisible();
    }}
  >
    {/* <View style={styles.centeredView}> */}
      <SafeAreaView style={styles.modalView}>
        <ScrollView style={styles.scrollView}>

      

        {(state.category && state.category.length>0) && state.category.map((l,i)=> (
        <Accordian
         categoryAcc  = {true}
         title = {l}
         retailorId={props.retailorId}
         shopName = {props.title}
         />
        ))}
        {/* <Text style={styles.modalProductText}>{props.item.productName}</Text>
        <Text style={styles.modalCategoryText}>{props.item.category}</Text>
         */}
        
          
      </ScrollView>
      </SafeAreaView>
      <TouchableHighlight
          style={{ ...styles.openButton, backgroundColor: "#e0aeab" }}
          onPress={() => {
            props.setModalVisible();
          }}
        >
          <View style={{flexDirection:'row',alignItems:'center', alignContent:'center'}}>
          <Ionicons name="md-arrow-back" size={24} color="red" style={{marginLeft:'auto'}} />
          <Text style={{alignItems:'stretch',textAlign:'center',color:"red",marginLeft:'auto'}}>BACK</Text>
          </View>
        </TouchableHighlight>
    {/* </View> */}
  </Modal>}
  
  
  </View>
)
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
  modalContent:{
    // justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 0,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    margin: 0,
    marginHorizontal:'auto',
    paddingLeft:0,
    paddingRight:0
  },
  ModalLayout:{
    marginTop:100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal:0
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 22
  },
  modalView: {
    // width:750,
    margin: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex:1
  },
  openButton: {
    backgroundColor: "red",
    borderRadius: 2,
    padding: 10,
    elevation: 4,
    paddingHorizontal:'auto',
    alignContent:"center"

  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal:"auto",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalProductText:{
    marginBottom: 15,
    marginTop: 20,
    textAlign: "center",
    fontWeight:'400',
    color:'red',
    fontSize:18
  },
  modalCategoryText:{
    marginBottom: 25,
    marginTop: 5,
    textAlign: "center",
    fontSize:13
  },
  input: {
    height: 50,
    paddingLeft:50,
    width:500,
    margin: 10,
  },
  inputButton: {
    width:400,
    margin: 10,
  },
});
