import React,{Component} from 'react';
import {View,Text} from 'react-native';
import {ContactStack} from './Router';

export default class App extends Component{
  render(){
    return(
      <ContactStack />
    );
  }
}
