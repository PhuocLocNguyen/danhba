import React, { Component } from 'react';
import {View,Text} from 'react-native';
import {SideMenu} from './Router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
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
let favo = realm.objects('Books8').filtered('favorite = true');
function genRowFavorite(){
  var datas=[];
     for(var i=0; i<favo.length; i++)
     {
       datas.push(favo[i]);

     }
    return datas;
}
export default class App extends Component{
  render(){
    return(
      <Provider store={store}>
      <SideMenu />
      </Provider>
    );
  }
}

const defaultState={
  arrFavorite:genRowFavorite(),
  listIcon : false
};

const reducer=(state=defaultState,action)=>{
  switch(action.type){
    case 'OPEN_ADD':
      return {...state, listIcon: !state.listIcon};
    case 'CLOSE_ADD':
      return {...state, listIcon: false};
    case 'LOAD_FAVORITE':
            return {...state, arrFavorite:genRowFavorite()};
  default:
    break;
    }
  return state;

}

const store=createStore(reducer);
