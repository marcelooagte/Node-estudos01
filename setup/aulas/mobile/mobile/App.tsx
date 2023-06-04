
import './src/lib/dayjs'
import { StatusBar } from 'react-native';

import 
  {
   useFonts, 
   Inter_400Regular,
   Inter_600SemiBold,
   Inter_700Bold,
   Inter_800ExtraBold
  } from '@expo-google-fonts/inter';
import { Loading } from './src/components/loading';
import { Routers } from './src/routers';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  })
  if(!fontsLoaded){
    return(<Loading />)
  }
  return (
    <>
       <Routers />
      <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent/> 
      
    </>
  );
}

