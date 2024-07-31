import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { BackButton } from "../components/BackButton";
import { CheckBox } from "../components/Checkbox";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { api } from "../lib/axios";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

export function New() {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex)
      );
    } else {
      setWeekDays((prevState) => [...prevState, weekDayIndex]);
    }
  }

  async function handleCreateNewHabit() {
    try {
      if (!title.trim() || weekDays.length === 0) {
        Alert.alert("Novo Hábito", "Informe o novo hábito e escolha os dias.");
      }

      await api.post("/habits", { title, weekDays });
      setTitle('')
      setWeekDays([])

      Alert.alert('Novo Hábito', 'Hábito criado com sucesso.')
    } catch (error) {
      console.log(error);
      Alert.alert("Ops!", "Não foi possivel criar o novo hábito.");
    }
  }

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className="text-white mt-6 font-extrabold text-3xl">
          Criar Hábito
        </Text>
        <Text className="text-white mt-6 font-semibold text-base">
          Qual o seu Comprometimento?
        </Text>
        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 focus: border-green-600"
          onChangeText={setTitle}
          value={title}
          placeholder="Ex.: Dormir bem"
          placeholderTextColor={colors.zinc[400]}
        />
        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          {" "}
          Qual a Recorrência?
        </Text>
        {availableWeekDays.map((weekDay, i) => (
          <CheckBox
            key={weekDay}
            title={weekDay}
            checked={weekDays.includes(i)}
            onPress={() => handleToggleWeekDay(i)}
          />
        ))}
        <TouchableOpacity
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
          onPress={handleCreateNewHabit}
          activeOpacity={0.7}
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text className="font-semibold text-base text-white ml-2">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
