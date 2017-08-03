import React, { Component } from 'react';
import {StyleSheet,View,Text,ListView,Dimensions,Image,TouchableOpacity,TextInput} from 'react-native';
import {connect} from 'react-redux';
const {height} = Dimensions.get('window');
 class Favorite extends Component{
  constructor(props) {
    super(props);
    var fs =new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2});
    this.state = {
    dataSource: fs,
  }
}
render(){
  const {wrapper,textInput,row1,iconStyle,title}=styles;
  return (
    <View style={styles.container}>
      <View>
      <View style={wrapper}>
        <View style={row1}>

        <TouchableOpacity onPress={()=>this.props.navigation.navigate('DrawerOpen')}>
        <Image
          style={iconStyle}
          source={require('../icons/Menu.png')}
        />
        </TouchableOpacity>

        <Text style={title}>Favorite</Text>

         <TouchableOpacity onPress={()=>this.props.navigation.navigate('ManHinh_Add')}>
          <Image
            style={iconStyle}
            source={require('../icons/add1.png')}
          />
        </TouchableOpacity>

        </View>
        <TextInput
          style={textInput}
          placeholder="Seach"

         />

      </View>
    </View>
    <ListView  style={styles.container}
         dataSource={this.state.dataSource.cloneWithRows(this.props.arrFavorite)}
         renderRow={(property, sectionID, rowID)=>
                <View style={styles.rowStyle}>
                          <Text style={styles.rowText}>Name: {property.ten}</Text>
                          <Text style={styles.rowTextSdt}>Phone: {property.sdt}</Text>
                </View>

              }/>
              </View>


  );
}
// componentDidMount() {
//     this.setState({
//       dataSource: this.state.dataSource.cloneWithRows(this.genRow())
//     });
//
//   }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  rowStyle: {
        backgroundColor: '#fff',
        flex: 1,
        borderBottomWidth:1,
        borderBottomColor:'#102027',
        flexDirection: 'row',
        padding:5,
        margin:7


    },

    rowText: {
      flex: 1,
        fontSize: 17,
        marginLeft:10,
        color: '#484848'
    },
    rowTextSdt: {
      flex: 1,
        fontSize: 17,
        marginLeft:10,
        color: '#484848'
    },

    wrapper:{
      height:height/8,
      backgroundColor:'#00b686',
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
function lay_tu_redux(state){
  return{
    arrFavorite:state.arrFavorite,
  };
}
export default connect(lay_tu_redux)(Favorite);
