import React,{Component} from 'react';
import {View,Text,TouchableOpacity,TextInput} from 'react-native';
const Realm = require('realm');
import {Button,Card,CardSection,Input} from '../components';
import { NavigationActions } from 'react-navigation';
const Schema = {
  name: 'ContactManager',
  primaryKey: 'id',
  properties: {
    id:    'int',    // primary key
    name: 'string',
    number: 'string',
    like:'int'
  }
};
let realm=new Realm({schema:[Schema]});
let list=realm.objects('ContactManager');
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Main_Contact'})
  ]
})
export default class Insert extends Component{

  constructor(props){
    super(props);
    this.state={
      id:'',
      name:'',
      number:'',
    }
  }

  Insert(){

    if(this.state.name.length===0 || this.state.number.length===0){
      alert('Không bỏ trống');
    }else if(list.length===0){
       realm.write(() => {
         realm.create('ContactManager', {id:1,name: this.state.name,number:this.state.number,like:0});
       });
        this.props.navigation.dispatch(resetAction);

    }else{
      var val = list[list.length - 1];
      realm.write(() => {
        realm.create('ContactManager', {id:(val.id+1),name: this.state.name,number:this.state.number,like:0});
      });
       this.props.navigation.dispatch(resetAction);
       
    }
  }
  render(){

    // const{containerStyle,buttonStyle,textButtonStyle,inputStyle,containerInput}=styles
    return(
      <Card>
      <CardSection>
        <Input
          placeholder='name'
          label='name'
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
        />
      </CardSection>
      <CardSection>
        <Input
          placeholder='sdt'
          label='SDT'
          onChangeText={(number) => this.setState({number})}
          value={this.state.number}
        />
      </CardSection>
      <CardSection>
          <Button onPress={()=>this.Insert()}>
            <Text>Them</Text>
          </Button>
      </CardSection>
    </Card>
    );
  }
}
