import React, { Component } from 'react';
import {StyleSheet,View,Text,TextInput,TouchableOpacity,ListView,TouchableHighlight,RefreshControl,Image,Dimensions} from 'react-native';
import { Sae  } from 'react-native-textinput-effects';
import {connect} from 'react-redux';
import Add from './Add';
import AddPhone from './AddPhone';
const {height} = Dimensions.get('window');
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
let realm = new Realm({schema: [BookSchema]});
var a=realm.objects('Books8');

class Contacts extends Component{
  constructor(props) {
    super(props);
    var fs =new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!=r2});
    this.state = {
    ten: '',
    sdt:'',
    c:6,
    refreshing:false,
    dataSource:fs,
    datatable:this.genRow(),
    seachName:'',

  }
}

//----------load 5 thằng đầu tiên-----------
  genRow(){
    var datas=[];
     for(var i=0; i<a.length; i++)
     {
       datas.push(a[i]);

     }
     var mang_moi = datas.slice(0,5);
     return mang_moi;
  }

//---------- Load more ----------
  onEndReached(){
    // this.setState({
    //   refreshing:true
    // });
    var datas=[];
    if(this.state.c<=a.length+10){
      for(var i=0; i<=this.state.c; i++)
      {
        if(a[i]!==undefined){
          datas.push(a[i]);
        }
      }
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(datas),
        //refreshing:false,
        c:this.state.c+3
      });
    }
  }
  onLoadFavorite(){
  this.props.dispatch({ type: 'LOAD_FAVORITE' });
}
//----------cập nhật yêu thích----------
  updateFavorite(property){
    if(property.favorite===true){
      let realm = new Realm({schema: [BookSchema]});
      realm.write(() => {
        realm.create('Books8', {id:property.id,favorite:false}, true);
      });
      this.onLoadFavorite();
    }else{
      let realm = new Realm({schema: [BookSchema]});
      realm.write(() => {
        realm.create('Books8', {id:property.id,favorite:true}, true);
      });
      this.onLoadFavorite();
    }


  }
//----------seachName----------
  seachName=(searchedText)=>{
    // var seachName=this.state.dataSource.filter(function(contact){
    //   return contact.ten.toLowerCase().indexOf(searchedText.toLowerCase())>-1;
    //var seachName=this.state.dataSeach.indexOf(searchedText);
    var datas=[];
    var seachName;
     for(var i=0; i<a.length; i++)
     {
       seachName= a[i].ten.indexOf(searchedText);
       if(seachName>-1){
         datas.push(a[i]);
       }
     }
     this.setState({
       dataSource: this.state.dataSource.cloneWithRows(datas),

     });
    }
//-----------------------------------------------------------------------------------------------

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

        <Text style={title}>Contacts</Text>

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
          onChangeText={this.seachName}
         />

      </View>
    </View>
    <View>
    { this.props.listIcon ?
      <View>
      <Add />
      </View> : null }
    </View>
      <ListView
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing}
            onRefresh={this.onEndReached.bind(this)}/>

          }
          onEndReached={this.onEndReached.bind(this)}
          onEndReachedThreshold={5}
          dataSource={this.state.dataSource}
          renderSeparator = {(sectionID, rowID) =>
             {
               return(<View key={`${sectionID} - ${rowID}`}/>);
             }

          }
          //dòng listview
          renderRow={(property, sectionID, rowID)=>

            <View style={styles.rowStyle}>

                  <View style={styles.rowStyleIcon}>
                      <Image
                          style={{width: 50, height: 50}}
                          source={require('../icons/iPhone.png')}
                      />
                  </View>


                  <View style={styles.rowStyle1}>
                      <TouchableOpacity  key={rowID} data={property}
                          onPress = {()=>this.props.navigation.navigate('ManHinh_Update',{maso:property.id,name:property.ten,phone:property.sdt})}>
                          <Text style={styles.rowText}>Name: {property.ten}</Text>
                          <Text style={styles.rowTextSdt}>Phone: {property.sdt}</Text>
                      </TouchableOpacity>
                  </View>

                  <View style={styles.rowStyle2}>
                      <TouchableOpacity  key={rowID} data={property}
                          onPress = {()=>this.updateFavorite(property)}>

                            <View>
                              <Image
                                  style={{width: 25, height: 25}}
                                  source={require('../icons/Heart.png')}
                              />
                          </View>

                      </TouchableOpacity>

                  </View>

            </View>
           }
       />
  </View>

  );
}
  componentDidMount() {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.state.datatable)

      });
    }
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#F5FCFF',
    marginBottom: 5,
  },
  Input: {
    height: 40,
    width: 420,
    fontSize: 18,
    borderWidth: 1,
    color: '#F5FCFF',
    borderColor: '#102027',
    borderRadius: 1,
    backgroundColor:'#4b2c20',
  },

  rowStyle: {
        backgroundColor: '#fff',
        flex: 1,
        borderBottomWidth:1,
        borderBottomColor:'#102027',
        flexDirection: 'row',
        padding:5,
        margin:8

    },
    rowStyleIcon: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    rowStyle1: {
          flex: 3,
      },
    rowStyle2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
        },
    rowText: {
        fontSize: 15,
        color: '#484848',
        marginLeft:5
    },
    rowTextSdt: {
        fontSize: 15,
        color: '#484848',
        marginLeft:5
    },
    add: {
      margin: 10,
      justifyContent: 'center',
      alignItems: 'center',
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

    listIcon:state.listIcon,
  };
}
export default connect(lay_tu_redux)(Contacts);
