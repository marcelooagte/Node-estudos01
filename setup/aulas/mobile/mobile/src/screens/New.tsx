
import { View, ScrollView, Text, TextInput } from "react-native";
import { BackButton } from '../components/BackButton'
import { Checkbox } from "../components/Checkbox";
import { useState } from "react";

const availableWeekDays = ['Domingo','Segunda-feira','Treça-Feira','Quarta-Feira','Quinta-Feira','Sexta-feira','Sábado']

export function New(){
  const [weekDays, setWeekDays] = useState<number[]>([]);
  function handleToggleWeekDay(weekDayIndex: number){
    if(weekDays.includes(weekDayIndex)){
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
    }
    else{
      setWeekDays(prevState => [...prevState, weekDayIndex] );
    }
  }


  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView showsVerticalScrollIndicator={false}>
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar hábito 
        </Text>

        <Text className="mt-6 text-white font-simibold text-base">
          Qual o seu comprometimento?
        </Text>

        <TextInput
        className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 focus:border-green-500"        
        />
        <Text className="text-white font-semibold mt-4 mb-3 text-base">          
          Qual a recorrência? 
        </Text>
      {
        availableWeekDays.map((weekDay, index)=>( 
        <Checkbox 
        key={weekDay}
        title={weekDay} />
        ))
      }
     
      </ScrollView>

    </View>
  )
}