import { View, Text } from "react-native";
const weekDays = ['D','S','T','Q','Q','S','S']
import { Header } from "../components/Header";
import React from 'react';
import { HabitDay, DAY_SIZE } from "../components/HabitDay";


export function Home(){
    return(
        <View className="flex-1 bg-background px-8 pt-16">
            <Header />
            <View>
                {
                    weekDays.map((weekDay,i)=>(
                        <Text key={`${weekDay}-${i}`}
                        className="text-zinc-400 text-xl font-bold text-center mx-1"
                        >
                            {weekDay}
                        </Text>

                    ))
                }
            </View>
            <HabitDay />
        </View>
    )
}