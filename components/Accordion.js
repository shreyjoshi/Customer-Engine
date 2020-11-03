import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager,ImageBackground} from "react-native";
// import { Colors } from './Colors';
import Icon from "react-native-vector-icons/MaterialIcons";
import CardLayout from './CardLayout';
import OrderCardLayout from './OrderCardLayout';
import ModalLayout from './ModalLayout';
import { connect } from 'react-redux';
import * as actionCreator from '../redux/appRedux';


class Accordian extends Component{

    constructor(props) {
        super(props);
        this.state = { 
          data: props.data,
          expanded : false,
          modalVisible:true
        }

    }
    componentDidMount(){
        console.log("this.props.key",this.props.title,this.props.keyValue);
        console.log("this.props.itemsList",this.props.itemsList);
        // if(this.props.keyValue == '0')
        //     this.setState({expanded:true});
    }
    
  
  render() {
    if(this.props.typeOrders){
        return (
        
            <View style={styles.container}>
                 <TouchableOpacity ref={this.accordian} style={styles.row} onPress={()=>this.toggleExpand()}>
                     <Text style={[styles.title, styles.font]}>{this.props.title.toUpperCase()}</Text>
                     <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30}  />
                 </TouchableOpacity>
                 <View style={styles.parentHr}/>
                 {
                     this.state.expanded &&
                     <View style={styles.child}>
                         <OrderCardLayout
                         itemsList = {this.props.itemsList}   
                         /> 
                     </View>
                 }
                 
            </View>
         )
    }
    else if(this.props.categoryAcc==true){
        return (
            <View style={styles.container}>
            <TouchableOpacity ref={this.accordian} style={styles.row} onPress={()=>this.toggleExpandCategory(this.props.title)}>
            <ImageBackground style={styles.imagestyle} source={require('../assets/images/Supermarket.png')} >

            <Text style={[styles.title, styles.font]}>{this.props.title.toUpperCase()}</Text>
            <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30}  />
            </ImageBackground>
            </TouchableOpacity>
            {/* <Text>JSON.stringify(this.props.retailerId)</Text>
            <Text>{JSON.stringify(this.props.retailorId)}</Text> */}
            {
                this.state.expanded && this.state.categoryItem &&
                // <View style={styles.child}>
                    // this.state.categoryItem.map((l,i)=>(
                        <CardLayout
                        itemsList = {this.state.categoryItem}
                        />
                    // ))
                    // <ModalLayout
                    // modalVisible={true}
                    // retailorId = {this.props.retailorId}
                    // item={[]}
                    // // setModalVisible = {setModalVisible}
                    // // updateInventory = {updateInventory}
                    // // itemsList = {this.props.itemsList}   
                    // /> 
                // </View>
            }
            
       </View>
        )
    }
    return (
        
       <View style={styles.container}>
            <TouchableOpacity ref={this.accordian} style={styles.row} onPress={()=>this.toggleExpand()}>
            <ImageBackground style={styles.imagestyle} source={require('../assets/images/Supermarket.png')} >

            <Text style={[styles.title, styles.font]}>{this.props.title.toUpperCase()}</Text>
            <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30}  />
            </ImageBackground>
            </TouchableOpacity>
            {/* <Text>JSON.stringify(this.props.retailerId)</Text>
            <Text>{JSON.stringify(this.props.retailorId)}</Text> */}
            {
                this.state.expanded &&
                    <ModalLayout
                    modalVisible={this.state.expanded}
                    retailorId = {this.props.retailorId}
                    shopName = {this.props.title}
                    item={[]}
                    setModalVisible = {this.setModalVisible}
                     
                    /> 
            }
            
       </View>
    )
  }

  setModalVisible = ()=>{
      this.setState({expanded: false});
  }

  toggleExpand=()=>{
    

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    
    this.setState({expanded : !this.state.expanded})
  }
  toggleExpandCategory=(l)=>{
    fetch("https://www.grocyshop.in/api/v1/retailer/findRetailerAndCategory?retailerid="+this.props.retailorId+"&category="+l,{
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          'Authorization': 'Bearer ' + this.props.userInfo.token,
          "Access-Control-Allow-Origin": "http://localhost:5000",
        }})
        .then((response)=>{
          if(!response.ok) throw new Error(response.status);
          else return response.json();
          }).then((response)=>{
            console.log("response in get FindRetailor ",response);
            // setRetailorList(response);
            console.log("categoryList",response);
            var temp  = {};
            var productsList = [];
            this.setState({categoryItem:response});
            // this.setState({modalVisible: !this.state.modalVisible});
            this.setState({expanded : !this.state.expanded})

            // dispatch(setCategoryList(response));
            // console.log("state.category",state.category);
          }).catch((e)=>{(console.log(e))})
  }

}

const mapStateToProps = state => ({
    ...state
   })

   export default connect(mapStateToProps, actionCreator)(Accordian);


const styles = StyleSheet.create({
    container:{
        width:"95%",
        marginLeft:10,
        paddingHorizontal:'auto',
        marginHorizontal:"auto",
        height:"auto",
        // justifyContent:'space-between',
        flexDirection: 'column',


    },
    title:{
        fontSize: 32,
        fontWeight:"bold",
        paddingVertical:30,
        flex:1,
        textAlign:"center",
        opacity:1,
        elevation:5,
        color: "#fff",
    },
    imagestyle:{
        flex:1,
        textAlign:"center",
        opacity:1,
        flexDirection: 'row',
        justifyContent:'space-between',
        borderRadius:20,
        borderTopLeftRadius: 15, 
        borderTopRightRadius: 15,
        overflow: "hidden",
        shadowColor: '#000',
        shadowRadius: 10,
        shadowOpacity: 1,

    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:10,
        borderRadius:24
        // backgroundColor: Colors.CGRAY,
    },
    parentHr:{
        height:1,
        // color: Colors.WHITE,
        width:'100%'
    },
    child:{
        // backgroundColor: Colors.LIGHTGRAY,
        padding:16,
    }
    
});