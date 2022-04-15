import React from 'react';
import { StyleSheet, Text,View,Button,TextInput,Keyboard,FlatList} from 'react-native';
import {search_movie} from './api';
import {Constants} from 'expo';
import MovieRow from './MovieRow'

export default class SearchMovie extends React.Component {
    state={
      movies: [],
      name:"",
      isLoading:false
    }
    static navigationOptions ={
        title: 'Movie DB (OMDB)',
        headerStyle :{
            backgroundColor:'#2a2a2a',
            height: 30,
            color:'#eee'
        },
        headerTintColor:'#eee'
    };
    
    movie = async ()=>{
      this.setState({isLoading:true})
      if(this.state.name.length>3){
        const result = await search_movie(this.state.name)
        const movies = await result
        this.setState({movies,isLoading:false})
      }else{
        this.setState({movies:[]})
      }
      Keyboard.dismiss()
    }
    render() {
        return(
          <View style={styles.container}>
            <TextInput style={styles.textinp} placeholder="Type movie name to Search" onChangeText={(text)=>this.setState({name:text})}/>
            <Button title="Search" onPress={this.movie} />
            {this.state.isLoading===false&&
            <FlatList
              data={this.state.movies}
              keyExtractor={(item, index) => item.imdbID}
              renderItem={(element) => <MovieRow navigation ={this.props.navigation} movie={element.item}/>}
            />||<Text style={styles.tex}>Loading</Text>}
          </View>
          
        )
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2a2a2a',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
    },
    textinp:{
      width:300,
      height:40,
      marginBottom:10,
      padding:10,
      backgroundColor:'#123',
      color:'#fff',
      borderStyle:"solid",
      borderEndColor:'#149022',
      borderRadius:40,
      borderColor:'#124563',
      textDecorationColor:'#fff',
      marginTop:10
    },
    tex:{
      padding:10,
      color:'#eee',
    }
  
  });
  