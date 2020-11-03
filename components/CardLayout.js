import React, { useState, useEffect } from 'react';
import { Text,View,  Alert,
  Modal,
  StyleSheet,
  TouchableHighlight,SafeAreaView,FlatList,Platform } from 'react-native';
import ModalLayout from './ModalLayout';
import { Card, ListItem, Button, Icon,SearchBar } from 'react-native-elements'
import { deletenote, ADD_PRODUCT_LIST ,addInventory,deleteInventory,addProductToCart,removeProductFromCart,clearProductFromCart} from '../redux/appRedux';
import { useSelector, useDispatch } from 'react-redux'
import NumericInput from 'react-native-numeric-input'




const list = [
 {  id:1,
    name: 'itemOne',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    deliveryTime: "42mins"
 },
 {  id:2,
    name: 'itemSecond',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    deliveryTime: "45mins",
  },
]


export default function CardLayout(props) {
  const dispatch = useDispatch()

  const [checked,setState] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [item,setItemState] = useState({  id:1,
                                          name: 'brynn',
                                          avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
                                          deliveryTime: "42mins"
                                      });
  const state = useSelector(state => state)
  

  const change = function(itemObj){
    // fetch()
    console.log("param",itemObj);
    var stateInvList = state.inventory;
    for(var i = 0;i<stateInvList.length;i++){
      if(stateInvList[i]["product_id"] == itemObj["id"] && stateInvList[i]["retailer_id"]==state.userInfo.userId){
        itemObj["invObj"] = stateInvList[i];
        setItemState(itemObj);
        break;
      }
    
    }
    console.log("this.modalVisible"+modalVisible);
    setItemState(itemObj);
    setModalVisible(!modalVisible);
    console.log(item);
    console.log(itemObj);
    console.log("here");
      if(!checked)
        setState({checked:false});
  }

  const valueChange = function(l,value){
    if((state.cart && state.cart.length) && state.cart[0].retailer_id != l.retailer_id)
      dispatch(clearProductFromCart("clear"));
    if(value == 0)
      dispatch(removeProductFromCart(l));
    else
      dispatch(addProductToCart(l));
      console.log("value",value);
      console.log(state.cart);
    console.log("l",l);
  }

  const updateInventory = function(obj){
    if(obj.inventoryId==undefined){
      fetch("https://www.grocyshop.in/api/v1/retailer/createInventory",{
          method: "POST",
          body:JSON.stringify(obj),
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
              dispatch(addInventory(response));
            }).catch((e)=>{(console.log(e))})
    }
  }

  const deleteInvItem = function(itemObj){
    console.log("itemObj delete",itemObj)
    alert("Are you sure to remove the selected Item:"+itemObj.productName);
    fetch("https://www.grocyshop.in/api/v1/retailer/deleteInventory/"+itemObj.invObj.inventoryId,{
          method: "GET",
          headers: {
            'Authorization': 'Bearer ' + state.userInfo.token,
            "Access-Control-Allow-Origin": "http://localhost:5000",
          }})
          .then((response)=>{
            if(!response.ok) throw new Error(response.status);
            else return "a"
            }).then((response)=>{
              console.log("in inventory response",response)
              // 
            }).catch((e)=>{(console.log(e))})
      dispatch(deleteInventory(itemObj.invObj.inventoryId));      
                   console.log(state.inventory)

      // headers: {
          //   "Content-type": "application/json; charset=UTF-8",
          //   'Authorization': 'Bearer ' + state.userInfo.token,
          //   "Access-Control-Allow-Origin": "*",
          // }})
          // .then((response)=>{
          //   // if(!response.ok) throw new Error(response.status);
          //     console.log("response ok");
          //     dispatch(deleteInventory(itemObj.invObj.inventoryId));
          //     console.log(state.inventory)
          //   })
          //   // .catch((e)=>{(console.log(e))})
    // dispatch(deletenote(1));
  }
  const ListRender = function(l,i){
    var stateInvList = state.inventory;
    console.log("Rerender");
    console.log("stateInvList",stateInvList);
    for(var i = 0;i<stateInvList.length;i++){
      if(stateInvList[i]["product_id"] == l["id"] && stateInvList[i]["retailer_id"]==state.userInfo.userId){
        l["invObj"] = stateInvList[i];
        l["added"] = true;
        break;
      }
      else if(l["added"]==true){
        l.added = false;
      }
    
    }
    if(l.added == true)
    return(<ListItem
      containerStyle={{width:'100%'}}
      key={l.id}
      leftAvatar={{ source: { uri: "https://emart-grocery.s3.ap-south-1.amazonaws.com/app-img/GSLogoMain+(S).png" },rounded:false }}
      title={l.productName}
      titleStyle = {{marginLeft:5,marginBottom:5}}
      component={TouchableHighlight}
      subtitle={<Text style={{marginTop:2,marginLeft:5,fontWeight:"200"}}>{l.details}</Text>}
      rightSubtitle={<Text style={{marginTop:2,marginRight:15,fontWeight:"200"}}>{l.measurementUnit+" "}</Text>}
      bottomDivider
      checkBox= {{ // CheckBox Props
        checkedIcon: 'times',
        uncheckedIcon: 'times',
        checkedColor:'#cc0c23',
        uncheckedColor: '#fff',
        onPress: () => deleteInvItem(l),
        checked: true,
      }}
      onPress={() =>  
              change(l)}           
      
      chevron
    />);
    else  
    return(
      
      <ListItem
      containerStyle={{width:'100%',backgroundColor:'#d95443',marginHorizontal:0}}
      key={l.id}
      leftAvatar={{ source: { uri: "https://emart-grocery.s3.ap-south-1.amazonaws.com/app-img/GSLogoMain+(S).png" },rounded:false }}
      title={l.product_name}
      titleStyle = {{marginLeft:5,marginBottom:5}}
      component={TouchableHighlight}
      subtitle={<Text style={{marginTop:2,marginRight:15,fontWeight:"500"}}>{"Rs. "+l.price_to_platform +" "}</Text> }
      rightSubtitle={ <View>
                      <NumericInput totalWidth ={100} totalHeight={50} minValue={0} onChange={(value) => valueChange(l,value)} />

                      
                      </View>
                    }
      bottomDivider
      
    />
    );
        
    
  }
  return (
    <View style={styles.container}>
    {modalVisible && <ModalLayout
    modalVisible={modalVisible}
    item={item}
    setModalVisible = {setModalVisible}
    updateInventory = {updateInventory}
    />}

  {props.itemsList && 
    props.itemsList.map((l, i) => (
      ListRender(l,i)
    ))
  }
</View>

  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
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
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  container: {
    flex: 1,
    backgroundColor: '#d95443',
    alignItems:'center',
    padding: 16,
  },
  crossIcon:{
    marginRight:10
  }
});
