// useThemeUpdater.tsx
import { useEffect } from "react";
import { ThemeTypes } from "../types/models/theme-type.enum";

interface WeatherData {
  current: {
    condition: {
      text: string;
    };
  };
}

interface UseThemeUpdaterProps {
  weatherData: WeatherData | null;
  error: string | null;
  setTheme: (theme: ThemeTypes) => void;
  currentTheme: ThemeTypes;
}

const useThemeUpdater = ({
  weatherData,
  error,
  setTheme,
  currentTheme,
}: UseThemeUpdaterProps) => {
  useEffect(() => {
    if (!weatherData || !weatherData.current || !weatherData.current.condition || typeof weatherData.current.condition.text !== 'string') {
      console.error("Invalid weather data structure");
      return;
    }

    const condition = weatherData.current.condition.text.toLowerCase();
    if (!condition) {
      console.error("Empty weather condition");
      return;
    }

    let newTheme: ThemeTypes;

    if (condition.includes("sunny") || condition.includes("clear")) {
      newTheme = ThemeTypes.Sunny;
    } else if (condition === "partial cloudy" || condition === "partly cloudy") {
      newTheme = ThemeTypes.PartlyCloudy;
    } else if (
      condition === "cloudy" ||
      condition.includes("overcast") ||
      condition.includes("fog") ||
      condition.includes("mist")
    ) {
      newTheme = ThemeTypes.Cloudy;
    } else if (
      condition.includes("rain") ||
      condition.includes("storm") ||
      condition.includes("thunder") ||
      condition.includes("drizzle") ||
      condition.includes("sleet") ||
      condition.includes("hail")
    ) {
      newTheme = ThemeTypes.Rainy;
    } else if (
      condition.includes("snow") ||
      condition.includes("blizzard") ||
      condition.includes("ice")
    ) {
      // Assuming we want to use Rainy theme for snow as well
      newTheme = ThemeTypes.Rainy;
    } else {
      console.warn(`Unrecognized weather condition: ${condition}`);
      newTheme = ThemeTypes.PartlyCloudy;
    }

    if (currentTheme !== newTheme) {
      if (typeof setTheme !== 'function') {
        console.error("setTheme is not a function");
        return;
      }
      setTheme(newTheme);
    }

    if (error) {
      console.error("Error fetching weather data:", error);
    }
  }, [weatherData, error, setTheme, currentTheme]);
};

export default useThemeUpdater;
