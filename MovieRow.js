import React from 'react';
import {StyleSheet,Text, View ,Image, Platform,TouchableNativeFeedback} from 'react-native';
export default class MovieRow extends React.Component{
    constructor(props){
      super(props)
      this.state={
        movie : this.props.movie,
        title : this.props.movie.Title
       }
      
    }
    componentDidUpdate(prevProps){
      if(prevProps.movie != this.props.movie){
        this.setState({movie:this.props.movie,title:this.props.movie.title})
      }
      
    }
    onPressed(imdbID,title){
      this.props.navigation.navigate(
        'Detail',
        {imdbID:imdbID,title:title}
        )
    }
   
   render(){
     return(
      <TouchableNativeFeedback
        onPress={()=> this.onPressed(this.state.movie.imdbID,this.state.movie.Title)}
        background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
          <View style={styles.rowView}>
            <Image source={{uri:`${this.state.movie.Poster}`}}style={styles.img} />
            <View style={{flexDirection:"column",marginVertical:10 ,padding:10 ,flexWrap:"wrap"}}>
              <Text style={[styles.tex1,styles.tex_bold]}>{this.state.movie.Title}</Text>
              < Text style={[styles.tex1,styles.tex_ital]}>{this.state.movie.Year}({this.state.movie.Type})</Text>
            </View>
          </View>
      </TouchableNativeFeedback>
     );
    }
}
const styles = StyleSheet.create({
  tex1:{
    padding:10,
    color:'#eee',
    width:220
  },
  tex_bold:{
    fontWeight:"bold",
  },
  tex_ital:{
    fontStyle:"italic"
  },
  rowView:{
    flex:1,
    flexDirection:"row",
    padding:10 
  },
  img:{
    width: 100,
    height: 100
  }
});