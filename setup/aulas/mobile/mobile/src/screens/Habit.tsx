import { useState, useEffect } from "react";
import { View, ScrollView, Text} from "react-native";
import { useRoute } from "@react-navigation/native";
import { BackButton } from "../components/BackButton";
import dayjs from "dayjs";
import { ProgressBar } from "../components/ProgressBar";
import { Checkbox } from "../components/Checkbox";
import { Alert } from "react-native";
import { Loading } from "../components/loading";
import { api } from "../lib/axios";




interface dayInfoProps{
completedHabits: string[];
possibleHabits:{
  id:string,
  title:string,
}[];
}
interface Params{
  date: string;
}

export function Habit(){
  const [loading,setLoading] = useState(true);
  const [dayInfo, setDayInfo] = useState<dayInfoProps | null>(null);
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);
  const route = useRoute(); 
  const {date} = route.params as Params;
 
  const parsedDate = dayjs(date);  
  const dayOfWeek = parsedDate.format('dddd');
  const dayAndMonth = parsedDate.format('DD/MM');

  async function fetchHabits() {
    try{
      setLoading(true);
      const response = await api.get('/day', {params: { date }});
      setDayInfo(response.data);
      setCompletedHabits(response.data.completedHabits)
      
    }
    catch(error){
      console.log(error);
      Alert.alert('Ops','Não foi possível carregar as informações do hábito')
    }
    finally{
      setLoading(false);
    }
  }

  async function handleToggleHabit(habitId: string) {
    if(completedHabits.includes(habitId)){
      setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId ));
    }
    else{
      setCompletedHabits(prevState => [...completedHabits, habitId]);
    }
  }
    useEffect(()=>{
      fetchHabits();
    },[]);

    if(loading){
      return(
        <Loading />
      )
    }
    
 

  return(
    <View className="flex-1 bg-background px-8 pt-16">
   <ScrollView
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{paddingBottom: 100}}
    >
    <BackButton/>

        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
              {dayOfWeek}
        </Text>
        <Text className="text-white font-extrabold text-3xl">
              {dayAndMonth}
        </Text>
        <ProgressBar progress={100}/>
        <View className="mt-6">
        
       { 
            dayInfo?.possibleHabits &&
            dayInfo?.possibleHabits.map(habits =>(                
                <Checkbox 
                key={habits.id}
                title={habits.title}
                checked={completedHabits?.includes(habits.id)}
                onPress={()=>{handleToggleHabit(habits.id)}}
                />   
            ) )
       }
       </View>
   </ScrollView>
    </View>
  )
}