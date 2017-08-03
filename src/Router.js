import React from 'react';
import{Image,StyleSheet,Text,TouchableOpacity} from 'react-native';
import {StackNavigator,TabNavigator,NavigationActions ,TabBarBottom} from 'react-navigation';
import Contact from './screens/Contact';
import ContactF from './screens/ContactF';
import Insert from './screens/Insert';
import Update_Delete from './screens/Update_Delete';

let currentIndex;
const Tabbar = TabNavigator({
  Contact:{
    screen: Contact,
    navigationOptions:({navigation})=>({

       title:'CONTACT',
        //tao button headerRight
        headerRight:
            <TouchableOpacity onPress={() => navigation.navigate('Insert_Contact')}>
              <Image  source={require('../image/plus.png')}  style={{width: 30, height: 30}} />
            </TouchableOpacity>,
      tabBarLabel:'contact',
      tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../image/user.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),
    })
  },
  Favorite:{
    screen:ContactF,
    navigationOptions:{
      title:'FAVORITE',
      tabBarLabel:'favorite',
      tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../image/favorite.png')}
        style={[styles.icon, {tintColor: tintColor}]}
      />
    ),

    }
  }
},{
  tabBarPosition:'bottom',
  //swipeEnabled:true, //for ios
  tabBarOptions:{
    style:{
      height:60,
      backgroundColor:'#42e2f4',
    },
    showIcon: true,//use for showing icon in android
    activeTintColor:'#f4a641',
    inactiveTintColor:'steelblue',
  }
});

const MyRouter = {
  getStateForAction: (action, state) => ({}),
};
export const ContactStack =StackNavigator({
  Main_Contact:{
    screen: Tabbar,
  },
Insert_Contact:{
  screen:Insert,
  navigationOptions:{
    title:'INSERT'
  }
},
Up_and_Del:{
  screen:Update_Delete,
  navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.name}`,
    }),
}
});

// export const ContactFStack=StackNavigator({

//   Main_ContactF:{
//     screen:ContactF,
//     navigationOptions:{
//         title:'FARVORITE CONTACT',
//     }
//   }
// });

const styles = StyleSheet.create({
  icon: {
    width: 18,
    height: 18,
  },
});



