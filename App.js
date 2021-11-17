import * as React from "react";
import HomeScreen from './screens/Home'
import Reccomended_Movies from "./screens/Recomendation";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

export default function App(){
  return(
   <AppContainer/>
 )


}

const AppStackNavigator = createStackNavigator(
  {
    Home:{
      screen: {HomeScreen}
    },
    Reccomended_Movies:{
      screen:{Reccomended_Movies}
    }
  },
  initialRouteName: {"Home"}
)

const AppContainer = createAppContainer(AppStackNavigator)