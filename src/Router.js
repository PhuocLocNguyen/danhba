import React from 'react';
import {StackNavigator,TabNavigator,TouchableOpacity,Image,View,Text,DrawerNavigator} from 'react-navigation';
import Contacts from './screens/Contacts';
import Favorite from './screens/Favorite';
import Add from './screens/Add';
import Update from './screens/Update';
import Menu from './screens/Menu';

export const ContactStack= StackNavigator({
  ManHinh_Contacts:{screen: Contacts,
                navigationOptions:{
                  header:null,
                }
              },
  ManHinh_Add:{screen: Add,
                navigationOptions:{
                    title: "Add"
                }
              },
  ManHinh_Update:{screen: Update,
                navigationOptions:{
                title: "Update"
                }
              },


})

export const FavoriteStack= StackNavigator({
  ManHinh_Favorite:{screen: Favorite,
                navigationOptions:{
                    header:null,
                }
              },

})


export const Tabbar = TabNavigator({
  Contacts: {
    screen: ContactStack,
    navigationOptions:{
      tabBarLabel:'Contacts',

    }
  },
  Favorite: {
    screen: FavoriteStack,
    navigationOptions:{
      tabBarLabel:'Favorite'
    }
  }
},
  {
    tabBarPosition: 'bottom',
    tabBarOptions:{
      inactiveTintColor:'#4b2c20',
      activeTintColor:'#e64a19',
      style:{
        backgroundColor:'#6effe8'
      }
    }


})
export const SideMenu = DrawerNavigator({
  Tab:{
        screen:Tabbar,
      },
    },
  {
      drawerWidth: 300,
      drawerPosition: 'left',
      contentComponent: props => <Menu {...props} />
  }
);
