import { TouchableOpacity, View} from 'react-native';
import { Feather } from '@expo/vector-icons'
//abaixo importado por padrão 
//import { Colors } from 'react-native/Libraries/NewAppScreen';
import Colors from 'tailwindcss/colors'

export function Checkbox(){
    return(
        <TouchableOpacity
        activeOpacity={0.7}
        className=" flex-row mb-2 items-center "
        >
            <View className='h-8 w-8 bg-green-500 rounded-lg items-center justify-center'>
            <Feather
            name="check"
            size={20}
            color={Colors.black}
            />
            </View>

        </TouchableOpacity>
    );

}