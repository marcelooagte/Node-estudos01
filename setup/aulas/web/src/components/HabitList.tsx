import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';
import dayjs from 'dayjs';

interface HabitsListProps{
  date: Date,
}

interface habitsInfo
{
    possibleHabits: {
      id: string;
      title: string;
      created_at: string;
    }[],
    completedHabits: string[]

}

export function HabitList( {date}: HabitsListProps ){
  const [habitsInfo, setHabisInfo ] = useState<habitsInfo>()

  useEffect(()=>{
    api.get('/day',{
      params:{
        date: date.toISOString(),
      }
    }).then(response =>setHabisInfo(response.data))
   
  },[]);

  async function handleToggleHabit(habitId: string){
     const isHabitAlReadyCopleted = habitsInfo!.completedHabits.includes(habitId)
     await api.patch(`/habits/${habitId}/toggle`)
     let completedHabits: string[] = []; 
     if(isHabitAlReadyCopleted){
      completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
     }
     else{

     }
  }

  const isDateInPast = dayjs(date)
  .endOf('day')
  .isBefore(new Date())

    return(
      <div className="mt-6 flex flex-col gap-3 ">
        {habitsInfo?.possibleHabits.map(habit => {
          return(
          <Checkbox.Root
          onCheckedChange={() => handleToggleHabit(habit.id)}
          key={habit.id}
          defaultChecked={habitsInfo.completedHabits?.includes(habit.id) }
          disabled={isDateInPast}
                         className="flex items-center gap-3 group">
                           <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500">
                             <Checkbox.Indicator>
                               <Check size={20} className="text-white"/>
                             </Checkbox.Indicator>
                           </div>
                           <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
                            {habit.title}  
                           </span>
           </Checkbox.Root>


          )
        })}

        
           
      </div>
    ) 
 }  

    