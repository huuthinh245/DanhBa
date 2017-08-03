import React,{Component} from 'react';
import {View,Text,TouchableOpacity,ListView,Image,TextInput,StyleSheet,FlatList} from 'react-native';
import ShowContact from './Showcontact';
import {Button,Card,CardSection,Input} from '../components';
const Realm = require('realm');
import{NavigationActions} from 'react-navigation';
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
let list= realm.objects('ContactManager');
// let list = allList.filtered('like=0');
//let list=lists.slice(0,3);

export default class Contact extends Component{

  state={searchText:''};

  constructor(props){
    super(props);
    this.state={
      searchText:'',
      mang:[],
      refresh:false,
    };
  }
 
  componentDidMount(){
    this.loadLimitData();
  }
  
  //gioi han data hien thi
  loadLimitData(){
    arrLmt=[];
    if(list.length<2 ){
      this.setState({
        mang:list,
      });
    }else{
        for (var i = 0; i <= 2; i++) {
          if(list[i]!==undefined){
          arrLmt.push(list[i]);
        }
        }
        this.setState({
          mang:arrLmt,
        });
    }
  }
  reloadData(){
    arrLmt=[];
    checkArr=[];
    const{mang}=this.state;
    arrAll=mang;
    for(i=mang.length;i<=mang.length+2;i++){
      if(list[i]!==undefined){
          arrLmt.push(list[i]);
      }
    }
    for (var i = 0; i < arrLmt.length; i++) {
            arrAll.push(arrLmt[i]);
    }

     this.setState({
     mang:arrAll,
       refresh:false,
     });
     arrLmt=[];

  }

 

  _keyExtractor = (item, index) => item.id;
  renderItem=({item})=>{
    const liked= !item.like ? 'gray':'#f4bc42';
    return(

      <View style={{marginTop:5,marginBottom:5,flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flex:1.5}}>
            <Image source={require('../../image/avatar.png')}/>
      </View>
        <View style={{flexDirection:'row',flex:5,justifyContent:'flex-start'}}>
            <TouchableOpacity
              onPress={()=>{this.props.navigation.navigate('Up_and_Del',{id:item.id,name:item.name,number:item.number}) }}>
              <Text>ID: {item.id}</Text>
              <Text>Name: {item.name}</Text>
              <Text>Phone: {item.number}</Text>
            </TouchableOpacity>
        </View>
        <View style={{justifyContent:'center',flex:0.5}}>
          <TouchableOpacity
            onPress={()=>this.upDateFavorite(item.id)}>
              <Image source={require('../../image/favorite.png')} style={{tintColor :liked}}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  // them so vao danh sach yeu thich
  upDateFavorite(id){
    realm.write(()=>{
       realm.create('ContactManager', {id: parseInt(id),like:1}, true);
    });
    this.setState({
      mang:list
    });
  }

  onSearch(searchText){
     sortArr=[];
     count=0;
    for(i=0;i<list.length;i++){
      if(list[i].name.toLowerCase().indexOf(searchText.toLowerCase())>-1){
        sortArr.push(list[i]);
        count++;
      }
    }
    if(sortArr.length===0){
      this.setState({
      mang:[],
      searchText:searchText
      });
    }else if(count>0){
      this.setState({
      mang:sortArr,
      searchText:searchText
      });
      count=0;
    }else if(searchText.length===0){
      this.setState({
      mang:list,
      searchText:searchText
      });
    }
  }
  // tao border bottom
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "20%"
        }}
      />
    )
  }
  render(){
    return(
      <View style={{flex:1}}>
        <TextInput
          style={styles.searchBar}
            underlineColorAndroid="rgba(0, 0, 0, 0.0)"
            onChangeText={(searchText) => this.onSearch(searchText)}
            value={this.state.searchText}
            placeholder='type somethings'/>
              <FlatList
                  ItemSeparatorComponent={this.renderSeparator}
                  data={this.state.mang}
                  keyExtractor={this._keyExtractor}
                  renderItem={this.renderItem}
                  refreshing={this.state.refresh}
                  onRefresh={()=>this.reloadData()}
              />
      </View>
    );
  }
}
const styles=StyleSheet.create({
  searchBar: {
  fontSize: 12,
  borderWidth: 1,
  backgroundColor:'#bec4ce'
},
});

