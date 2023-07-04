import { View, ScrollView, Text} from "react-native";
import { useRoute } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";
import dayjs from "dayjs";

interface Params{
  date: string;
}


export function Habit(){
  const route = useRoute(); 

  const {date} = route.params as Params;
  const parsedDate = dayjs(date);
  const dayOfWeek = parsedDate.format('dddd')

  
  return(
    <View className="flex-1 bg-background px-8 pt-16">
   <ScrollView
           showsVerticalScrollIndicator={false}
           contentContainerStyle={{paddingBottom:100}}
    />
    <BackButton/>
    <Text>
      Dia da semana 
    </Text>

    </View>
  )
}