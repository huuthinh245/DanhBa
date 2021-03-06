import React,{Component} from 'react';
import {View,TextInput,Text} from 'react-native';

const Input=({secureTextEntry,placeholder,label,value,onChangeText,editable})=>{
  const{inputStyle,containerStyle,labelStyle}=styles;
return(
  <View style={containerStyle}>
    <Text style={labelStyle}>{label}</Text>
    <TextInput
      editable={editable}
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      value={value}
      style={inputStyle}
      onChangeText={onChangeText}
    />
  </View>
);
};
const styles={
  inputStyle:{
    color:'#000',
    paddingRight:5,
    paddingLeft:5,
    fontSize:18,
    lineHeight:23,
    flex:2
  },
  labelStyle:{
    fontSize:20,
    paddingLeft:20,
    flex:1,
  },
  containerStyle:{
    height:40,
    flex:1,
    flexDirection:'row',
    alignItems:'center',
  }
}
export {Input};
