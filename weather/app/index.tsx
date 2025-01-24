import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export default function Index() {
  const [weather, setWeather] = useState<any>();

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=38.5382&lon=-121.7617&appid=${API_KEY}&units=imperial`);
      setWeather(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (!weather) {
    return <ActivityIndicator/>;
  }
  
  return (
    <SafeAreaView className="flex justify-center items-center">
      <Text className="text-blue-500 font-bold text-2xl">How's the Weather Down There?</Text>
      <Text className="text-zinc-900 font-bold text-[70px]">{weather.main.temp}°F</Text>
      <Text className="text-zinc-900 font-bold text-xl">Current Location: {weather.name}</Text>
    </SafeAreaView>
  );
};