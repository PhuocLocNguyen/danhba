import React, { Component } from 'react';
import {View,Text,Dimensions,Image,TextInput,StyleSheet,TouchableOpacity} from 'react-native';
const {height} = Dimensions.get('window');
export default class Header extends Component{

  render(){
    const {wrapper,textInput,row1,iconStyle,title}=styles;
    return(
    <View style={wrapper}>
      <View style={row1}>

      <Image
        style={iconStyle}
        source={require('../icons/iPhone.png')}
      />

      <Text style={title}>Danh Ba</Text>

      <TouchableOpacity >
        <Image
          style={iconStyle}
          source={require('../icons/add.png')}
        />
      </TouchableOpacity>

      </View>
      <TextInput
        style={textInput}
        placeholder="seach"
       />

    </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper:{
    height:height/8,
    backgroundColor:'#795548',
    padding:10,
    justifyContent: 'space-around'
  },
  row1:{
    flexDirection:'row',
    justifyContent: 'space-between'
  },
  textInput:{
    marginTop:10,
    height:height/18,
    backgroundColor:'#fff',fontSize:12
  },
  iconStyle:{
    width: 25,
    height: 25
  },
  title:{
    color:'#fff',
    fontFamily:'Avenir',
    fontSize:20,
  }
});
