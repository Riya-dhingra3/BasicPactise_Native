import UserContextProvider from "./context/UserContextProvider";
import Todos from "./todos/Todos";
import { createStackNavigator } from "@react-navigation/stack"
import sectionlist from "./sectionlist/sectionlist";

const Stack=createStackNavigator();

export default function App (){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Todo" component={Todos}/>  
            <Stack.Screen name="sectionlist" component={sectionlist} />   
        </Stack.Navigator>
    )
}