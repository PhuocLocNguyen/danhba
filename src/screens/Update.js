import React, { Component } from 'react';
import {StyleSheet,View,Text,TextInput,TouchableOpacity,Image,Dimensions} from 'react-native';
import Communications from 'react-native-communications';
import {connect} from 'react-redux';
const {height} = Dimensions.get('window');
import Contacts from './Contacts';
const BookSchema = {
  name: 'Books8',
  primaryKey: 'id',
  properties: {
    id : 'string',  // primary key
    ten: 'string',
    sdt: 'string',
    favorite:'bool'
  }
};
 class Update extends Component{
  constructor(props) {
    super(props);
    this.state = {
    ten: this.props.navigation.state.params.name,
    sdt: this.props.navigation.state.params.phone,
  }
}
onLoadFavorite(){
this.props.dispatch({ type: 'LOAD_FAVORITE' });
}

update(){
  if(this.state.ten===''||this.state.sdt===''){
    alert("ten sdt ko dc de trong")
  }else{
  let realm = new Realm({schema: [BookSchema]});
  realm.write(() => {
    realm.create('Books8', {id:this.props.navigation.state.params.maso,ten: this.state.ten, sdt: this.state.sdt}, true);
    var a=realm.objects('Books8');
    this.props.navigation.navigate('ManHinh_Contacts');
    this.onLoadFavorite();
  });
  }
}
  delete(){
    let realm = new Realm({schema: [BookSchema]});
    realm.write(() => {
      let book = realm.create('Books8', {id:this.props.navigation.state.params.maso}, true);
      realm.delete(book);
      var a=realm.objects('Books8');
      this.props.navigation.navigate('ManHinh_Contacts');
      this.onLoadFavorite();
    });
  }

  render(){
    return(
      <View style={styles.container}>
      <View style={styles.iconUser}>
          <Image
              style={{width: 50, height: 50}}
              source={require('../icons/User.png')}
          />
      </View>

      <View style={styles.viewText}>
      <Text style={styles.text}>Name: </Text>
      </View>

      <View style={styles.viewInput}>
      <TextInput
       style={styles.Input}
       onChangeText={(ten) => this.setState({ten})}
       value={this.state.ten}
       />
       </View>

       <View style={styles.viewText}>
       <Text style={styles.text}>Phone: </Text>
       </View>

       <View style={styles.viewInput}>
     <TextInput
      style={styles.Input}
      onChangeText={(sdt) => this.setState({sdt})}
      value={this.state.sdt}
      />
      </View>

      <View style ={styles.welcome}>

      <View style ={styles.button}>
      <TouchableOpacity onPress = {()=>this.update()}>
      <Text style ={styles.texButton}>Update</Text>
      </TouchableOpacity>
      </View>

      <View style ={styles.button}>
      <TouchableOpacity onPress = {()=>this.delete()}>
      <Text style ={styles.texButton}>Delete</Text>
      </TouchableOpacity>
      </View>

      <View style ={styles.button}>
      <TouchableOpacity onPress = {()=>Communications.phonecall(this.props.navigation.state.params.phone, true)}>
      <Text style ={styles.texButton}>Call</Text>
      </TouchableOpacity>
      </View>
      </View>



      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewText:{
    height:height/30,
    padding:10,
    margin:10,

  },
  button:{
    height:height/15,
    backgroundColor: '#3366FF',
    margin:10,
  },
  welcome: {
    marginTop:20,
    height:height/14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',


  },
  text: {
      fontSize: 20,
      marginLeft:10,
  },
  texButton: {
    textAlign: 'center',
    fontSize: 20,
    margin:5,
    color: '#F5FCFF',

  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  Input: {
    fontSize: 20,
    borderWidth: 1,
    color: 'black',
    borderColor: '#484848',
    borderRadius: 1,
    backgroundColor:"#fff"
  },
  iconUser:{
      padding:10,
      justifyContent: 'center',
      alignItems: 'center',
  },
  viewInput: {
    height:height/14,
    padding:10,
    margin:10,
  },
});
export default connect()(Update);
