import { ActivityIndicator, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import axios from "axios";
import * as Location from 'expo-location';

const API_KEY = process.env.EXPO_PUBLIC_API_KEY;

export default function Index() {
  const [weather, setWeather] = useState<any>();
  const [location, setLocation] = useState<Location.LocationObject>();
  const [errorMsg, setErrorMsg] = useState<string>();

  useEffect(() => {
    if (location) { 
      fetchWeather();
    }
  }, [location]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const fetchWeather = async () => {
    try {
      const lat = location.coords.latitude;
      const long = location.coords.longitude;
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=imperial`);
      setWeather(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!weather) {
    return (
      <SafeAreaView className="flex justify-center items-center">
        <ActivityIndicator/>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView className="flex justify-center items-center">
      <Text className="text-blue-500 font-bold text-2xl">How's the Weather Down There?</Text>
      <Text className="text-zinc-900 font-bold text-[70px]">{Math.round(weather.main.temp)}°F</Text>
      <Text className="text-zinc-900 font-bold text-xl">Current Location: {weather.name}</Text>
    </SafeAreaView>
  );
};