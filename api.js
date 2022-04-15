import {Image,Asset} from 'expo'
export const search_movie = async (name)=>{
    try{
        let pg =1,movies=[],canDo=true
        while(canDo){
            const response = await fetch(`http://www.omdbapi.com/?s=${name}&page=${pg}&apikey=269f1d56`);
            const resJson = await response.json();
            if(resJson.Search === undefined){
                canDo=false
                break
            }
            movies.push.apply(movies,resJson.Search)
            pg+=1
        }
        return movies
    }catch(err){
        console.log(err)
    }
}
export const search_specific = async (id)=>{
    try{
        const response = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=269f1d56`);
        const resJson = await response.json();
        return resJson;
    }catch(err){
        console.log(err)
    }
}