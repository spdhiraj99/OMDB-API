import {createStackNavigator,createAppContainer} from 'react-navigation';
import MovieDetail from './MovieDetail'
import SearchMovie from './SearchMovie'

const AppNavi = createStackNavigator({
  Search: {screen: SearchMovie},
  Detail: {screen: MovieDetail},
  
},{
  initialRouteName: 'Search',
  headerStyle :{
    backgroundColor:'#2a2a2a',
    height: 30,
    color:'#eee'
  },
  headerTintColor:'#eee'
}
);
const AppNavigator = createAppContainer(AppNavi);
export default AppNavigator;