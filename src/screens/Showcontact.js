import React,{Component} from 'react';
import {View,Text,TouchableOpacity,ListView} from 'react-native';


const ShowContact=({data})=>{
  const{name,number}=data
      return(
          <View style={{flex:1}}>
              <Text>{name}</Text>
              <Text>{number}</Text>
          </View>
      );
}
export default ShowContact;
