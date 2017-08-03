import React, { Component } from 'react';
import {StyleSheet,View,Text,TextInput,TouchableOpacity,Dimensions} from 'react-native';
const {height} = Dimensions.get('window');
import {connect} from 'react-redux';
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
 class Add extends Component{
  constructor(props) {
    super(props);
    this.state = {
    ten: '',
    sdt:'',
  }
}
s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
   .toString(16)
   .substring(1);
  }
  getuid = () => {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
    this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }
write(){
  if(this.state.ten===''||this.state.sdt===''){
    alert("ten sdt ko dc de trong")
  }else{
    let realm = new Realm({schema: [BookSchema]});
    realm.write(() => {
    var a=realm.objects('Books8');
    // if(a.length>0){
    //   var b = a.length-1;
    //   var maxId=parseInt(a[b].id);
    // }else{
    //   var maxId=a.length;
    // }
    realm.create('Books8', {id:this.getuid() ,ten: this.state.ten, sdt:this.state.sdt,favorite:false });
    //this.props.dispatch({ type: 'CLOSE-ICON'});
    this.props.navigation.navigate('ManHinh_Contacts');
  });
}

}
  render(){
    return(
      <View style={styles.container}>
      <View style={styles.viewInput}>
      <TextInput
       style={styles.Input}
       placeholder = ' Nhập tên : '
       onChangeText={(ten) => this.setState({ten})}
       value={this.state.text}
       />
       </View>

      <View style={styles.viewInput}>
     <TextInput
      style={styles.Input}
      placeholder = ' Nhập số điện thoại: '
      onChangeText={(sdt) => this.setState({sdt})}
      value={this.state.text}
      />
      </View>

      <View style={styles.viewAdd}>
      <TouchableOpacity onPress = {()=>this.write()}>
      <Text style ={styles.add}>Add</Text>
      </TouchableOpacity>
      </View>


      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height:height,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#F5FCFF',
  },
  add: {
    fontSize: 20,
    textAlign: 'center',
    color: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center',

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
  viewInput: {
    height:height/14,
    padding:10,
    margin:10,
  },
  viewAdd: {
    height:height/14,
    padding:10,
    margin:10,
    marginTop:20,
    backgroundColor: '#3366FF',
  }
});
export default connect()(Add);
