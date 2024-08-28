import { useState, useEffect } from "react";
import { WeatherData } from "../types/models/weather-data.interface";

const API_KEY = "5f92954848604c6cb4f153024242808";
const BASE_URL = "http://api.weatherapi.com/v1/current.json";

const useWeatherReport = (location: string) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!location) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = new URL(BASE_URL);
        url.searchParams.append('key', API_KEY);
        url.searchParams.append('q', location);

        const response = await fetch(url.toString(), { method: 'GET' });
        
        if (!response.ok) {
          throw new Error(`Failed to fetch weather data: ${response.statusText}`);
        }
        
        const data: WeatherData = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  return { weatherData, loading, error };
};

export default useWeatherReport;
