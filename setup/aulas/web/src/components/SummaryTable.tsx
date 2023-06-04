import { generateDateFromYearBeginning } from "../utils/generate-date-from-year-beginning"
import { HabitDay } from "./HabitDay"
const weekDays = ['D','S','T','Q','Q','S','S']

const SummaryDates = generateDateFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7  
const amountOfDaystoFill = minimumSummaryDatesSize - SummaryDates.length
console.log(SummaryDates);

export function SummaryTable(){
    return (
        <div className='w-full flex'>
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {weekDays.map((weekDay,i) => {return(
                    <div 
                    key={`${weekDay}-${i}`} 
                    className="font-bold text-zinc-400 text-xl h-10 w-10 flex items-center justify-center">
                        {weekDay}
                    </div>    
                )})}
                
            </div>  
            <div className="grid grid-rows-7 grid-flow-col gap-3">
           {SummaryDates.map(date =>{
            
            return (
                < HabitDay             
                    key={date.toString()}
                    amount={5} 
                    completed={Math.round(Math.random()*5)}             
                />
            )

           })}   
           {amountOfDaystoFill > 0 && Array.from({length: amountOfDaystoFill}).map(( _,i) => 
           {
               return (<div key={i} className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"></div>)
           })}          
            </div>           
        </div>
    )
  }