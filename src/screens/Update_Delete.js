import React,{Component} from 'react';
import {View,Text,TouchableOpacity,TextInput,Image} from 'react-native';
import {Button,Card,CardSection,Input} from '../components';
import{NavigationActions} from 'react-navigation';
const Realm = require('realm');
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
export default class Update_Delete extends Component{
  constructor(props){
    super(props);
    this.state={
      id:String(this.props.navigation.state.params.id),
      name:this.props.navigation.state.params.name,
      number:this.props.navigation.state.params.number
    }
  }
  Update(){
    if(this.state.number.length===0){
      alert("khong bo trong");
    }else{
        realm.write(()=>{
           realm.create('ContactManager', {id: parseInt(this.state.id),name:this.state.name,number:this.state.number}, true);
        });
        this.props.navigation.dispatch(resetAction);
    }
  }
  Delete(){
    if(this.state.number.length===0){
      alert("khong bo trong");
    }else{
      realm.write(()=>{
       contact=realm.create('ContactManager',{id:parseInt(this.state.id)},true);
        realm.delete(contact);
      });
      this.props.navigation.dispatch(resetAction);
    }
  }
  
  render(){
    return(

      <Card>

              <CardSection>
                <Input
                  placeholder='NAME'
                  label='NAME'
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
                  <Button onPress={()=>this.Update()}>
                    <Text>UPDATE</Text>
                  </Button>
              </CardSection>
              <CardSection>
                <Button onPress={()=>this.Delete()}>
                  <Text>DELETE</Text>
                </Button>
              </CardSection>
    </Card>
    );
  }
}
