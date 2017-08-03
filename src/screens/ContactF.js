import React,{Component} from 'react';
import {View,Text,TouchableOpacity,ListView,Image,TextInput,StyleSheet,FlatList} from 'react-native';
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
let allList= realm.objects('ContactManager');
let list = allList.filtered('like=1');


export default class ContactF extends Component{

  constructor(props){
    super(props);
    this.state={
      searchText:'',
      mang:[],
      refresh:false,
    };
  }

  refreshFunction(){
    this.setState({
    mang:list,
    refresh:false,
    });
  }

  componentDidMount(){
    this.loadLimitData();
  }
  loadLimitData(){
    // arrLmt=[];
    // for (var i = 0; i <= 2; i++) {
    //   arrLmt.push(list[i]);
    // }
    this.setState({
      mang:list,
    });
  }
  _keyExtractor = (item, index) => item.id;
  renderItem=({item})=>{
    return(
      <View style={{borderBottomWidth: 1,marginTop:5,marginBottom:5,flexDirection:'row',justifyContent:'space-between'}}>
        <View style={{flex:2}}>
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
              <Image source={require('../../image/favorite.png')} style={{tintColor:'#f4bc42'}}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  upDateFavorite(id){
    realm.write(()=>{
       realm.create('ContactManager', {id: parseInt(id),like:0}, true);
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

  render(){
    return(
      <View style={{flex:1}}>
        <TextInput
          style={styles.searchBar}
            underlineColorAndroid="rgba(0, 0, 0, 0.0)"
            onChangeText={(searchText) => this.onSearch(searchText)}
            value={this.state.searchText}
            placeholder='Search'  />

              <FlatList
                  data={this.state.mang}
                  keyExtractor={this._keyExtractor}
                  renderItem={this.renderItem}
                  refreshing={this.state.refresh}
                  onRefresh={()=>this.refreshFunction()}
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
