import React, { useState, useEffect } from 'react';
import { Text,View,  Alert,
  Modal,
  StyleSheet,
  TouchableHighlight,SafeAreaView,FlatList,Platform } from 'react-native';
import ModalLayout from './OrderModelLayout';
import { Card, ListItem, Button, Icon,SearchBar } from 'react-native-elements'
import { deletenote, ADD_PRODUCT_LIST } from '../redux/appRedux';
import { useSelector, useDispatch } from 'react-redux'



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
  const [item,setItemState] = useState(null);
  const state = useSelector(state => state)
  

  const change = function(itemObj){
    // fetch()
    console.log("param",itemObj);
    // var stateInvList = state.inventory;
    // for(var i = 0;i<stateInvList.length;i++){
    //   if(stateInvList[i]["product_id"] = itemObj["id"] && stateInvList[i]["retailer_id"]=="RET_000001"){
    //     itemObj["invObj"] = stateInvList[i];
    //     setItemState(itemObj);
    //     break;
    //   }
    
    // }
    console.log("this.modalVisible"+modalVisible);
    setItemState(itemObj);
    //setModalVisible(!modalVisible);
    console.log(item);
    console.log(itemObj);
    console.log("here");
      if(!checked)
        setState({checked:false});
  }
  const cancelItem = function(itemObj){
    alert("Are you sure to remove the selected Item:"+itemObj.name);
    dispatch(deletenote(1));
  }
  const setOrderStatus = function(status){
      if(item){
        var reqBody = {};
        reqBody.orderId = item.orderId;
        reqBody.customerId = item.customerId;
        reqBody.status = status;
        reqBody.retailerId = item.retailerId;
        console.log("reqBody",JSON.stringify(reqBody));
        fetch("https://www.grocyshop.in/api/v1/order/newStatus",{
          method: "POST",
          body:JSON.stringify(reqBody),
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
            //   dispatch(setInventoryList(response));
            }).catch((e)=>{(console.log(e))})
      }
      console.log("status",status);
  }
  const ListRender = function(l,i){
    var stateInvList = state.inventory;
    for(var i = 0;i<stateInvList.length;i++){
      if(stateInvList[i]["product_id"] == l["id"] && stateInvList[i]["retailer_id"]==state.userInfo.userId){
        l["invObj"] = stateInvList[i];
        l["added"] = true;
        break;
      }
    
    }
    
    return(<ListItem
      containerStyle={{width:'100%'}}
      contentContainerStyle = {{width:1200}}
      key={l.id}
      leftAvatar={{ source: { uri: "https://emart-grocery.s3.ap-south-1.amazonaws.com/app-img/GSLogoMain+(S).png" },rounded:false }}
      title={"Order Id: "+l.orderId}
      titleStyle = {{marginLeft:5,marginBottom:5}}
      component={TouchableHighlight}
      subtitle={<Text style={{marginTop:2,marginLeft:5,fontWeight:"400"}}>{"note: " + l.deliveryNote}</Text>}
      rightTitle={<Text style={{marginTop:2,marginRight:15,fontWeight:"500"}}>{"₹"+l.totalCartValue}</Text>}
      rightSubtitle = {<Text style={{marginTop:2,marginRight:15,fontWeight:"200"}}>{l.paymentStatus+" "}</Text>}
      bottomDivider
      onPress={() =>  
              change(l)}           
      chevron
    />);
        
    
  }
  return (
    <View style={styles.container}>
    {modalVisible && <ModalLayout
    modalVisible={modalVisible}
    order={item}
    setModalVisible = {setModalVisible}
    setOrderStatus = {setOrderStatus}
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
    backgroundColor:"#d47a6e",
    alignItems:'center',
    padding: 16,
  },
  crossIcon:{
    marginRight:10
  }
});
