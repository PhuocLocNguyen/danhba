import React,{Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Image} from 'react-native';
import {connect} from 'react-redux';
 class AddPhone extends Component{
  render(){
      return(
<View style={styles.container}>
        <TouchableOpacity onPress={()=>this.props.dispatch({ type: 'CLOSE-ICON'})}>
         <Image
           style={styles.iconStyle}
           source={require('../icons/add1.png')}
         />
       </TouchableOpacity>
       </View>
      );
  }
}
const styles = StyleSheet.create({
  iconStyle:{
    width: 25,
    height: 25
  },
  
});
export default connect()(AddPhone);
