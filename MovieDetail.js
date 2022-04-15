import React from 'react';
import { ScrollView,StyleSheet, Dimensions,View, Text,Image,ActivityIndicator} from 'react-native';
import {Constants} from 'expo';
import {search_specific} from './api';


export default class MovieDetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            movie:{},
            isLoading: true,
            rating:[],
            imdbID: this.props.navigation.state.params.imdbID,
            dim : Dimensions.get('window')
        }
        
    }
    static navigationOptions = ({ navigation }) => {
        
        const { state, setParams, navigate } = navigation;
        const params = state.params || {};
        return {
            title: `${params.title}`,
            headerStyle :{
                backgroundColor:'#2a2a2a',
                height: 50,
                color:'#eee'
            },
            headerTintColor:'#eee',
        }
    };
    
    movie_get = async()=>{
        const result = await search_specific(this.state.imdbID)
        const movie = await result
        this.setState({movie})
        Image.prefetch(this.state.movie.Poster)
        this.setState({rating:movie.Ratings})
        this.setState({isLoading:false})
    }
    componentDidMount(){
        this.movie_get()
    }
    showRating(){
        let imdb,rotten,meta,imdbColor='',rottenColor='',metaColor=''
        if(this.state.rating[0]!==undefined){
            imdb = this.state.rating[0].Value.substring(0,3)
            if(imdb>7.5){
                imdbColor='green'
            }else if(imdb>5.0){
                imdbColor='yellow'
            }else{
                imdbColor='red'
            }
        }
        if(this.state.rating[1]!==undefined){
            rotten = this.state.rating[1].Value.substring(0,2)
            if(rotten>70){
                rottenColor='green'
            }else if(rotten>60){
                rottenColor='yellow'
            }else{
                rottenColor='red'
            }
        }
        if(this.state.rating[2]!==undefined){
            meta = this.state.rating[2].Value.substring(0,2)
            if(meta>75){
                metaColor='green'
            }else if(meta>50){
                metaColor='yellow'
            }else{
                metaColor='red'
            }
        }
        return(
            <View>
                <View style={styles.rowView}>
                    {imdb!==undefined &&<Text style={[styles.tex,styles.bold]}>IMDB Rating:  </Text>||null}
                    {imdb!==undefined && <Text style={[styles.tex,styles.italic,{color:imdbColor}]}>{imdb}</Text>||null}
                </View>
                {imdb!==undefined && <View style={{width:20*imdb,height:10,backgroundColor:imdbColor}}></View>||null}
                <View style={styles.rowView}>
                    {rotten!==undefined && <Text style={[styles.tex,styles.bold]}>Rotten Tomatoes:  </Text>||null}
                    {rotten!==undefined && <Text style={[styles.tex,styles.italic,{color:rottenColor}]}>{rotten}</Text>||null}
                </View>
                {rotten!==undefined && <View style={{width:20*(rotten/10),height:10,backgroundColor:rottenColor}}></View>||null}
                <View style={styles.rowView}>
                    {meta!==undefined && <Text style={[styles.tex,styles.bold]}>Metacritic Rating:  </Text>||null}
                    {meta!==undefined && <Text style={[styles.tex,styles.italic,{color:metaColor}]}>{meta}</Text>||null}
                </View>
                {meta!==undefined && <View style={{width:20*(meta/10),height:10,backgroundColor:metaColor}}></View>||null}
            </View>
        )
    }
    view(){
        return(
            <ScrollView>
                <View style={styles.imgContainer}>
                    <Image source={{uri:this.state.movie.Poster}}style={{width:this.state.dim.width,height:300}} />
                </View>
                <View style={styles.anotherContainer}>
                <View style={styles.rowView}>
                    <Text style={[styles.tex,styles.bold]}>{this.state.movie.Title}</Text>
                    <Text style={[[styles.tex,styles.italic]]}>{`  ( ${this.state.movie.Year} ) `}</Text>
                </View>
                <View style={styles.rowView}>
                    <Text style={[[styles.tex,styles.italic]]}>{`${this.state.movie.Rated}, ${this.state.movie.Runtime} `}</Text>
                </View>
                <View style={styles.rowView}>
                    <Text style={[styles.tex,styles.bold,styles.italic]}>{this.state.movie.Plot}</Text>
                </View>
                </View>
                {this.showRating()}
                
            </ScrollView>
        )
    }
    render(){
        return(
            <View style={styles.container}>
            {
                this.state.isLoading===false
                &&this.view()
                ||<ActivityIndicator size="large" color="#0000ff" />
            }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    imgContainer:{
        flex: 1,
        backgroundColor: '#2a2a2a',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#2a2a2a',
        paddingLeft:20,
        paddingRight:20,
        paddingBottom:10,
        paddingTop: Constants.statusBarHeight,
      },
      anotherContainer:{   
        flexDirection:'column',
        flex:1,
        backgroundColor: '#2a2a2a',
      },
      tex:{
        color:'#eee',
        flexWrap: 'wrap'
      },
      rowView:{
        flexDirection:"row",
        paddingTop:10 
      },
      bold:{
          fontWeight:"bold"
      },
      italic:{
          fontStyle:"italic"
      },
      img:{
        width: 400,
        height: 400
      }
})