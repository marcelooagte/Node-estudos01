import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { appRoutes } from './app.routers';


export function Routers(){
  return (
    <View className="flex-1 bg-background ">
      <NavigationContainer>
      {appRoutes()}            
      </NavigationContainer>
    </View>
  );
}