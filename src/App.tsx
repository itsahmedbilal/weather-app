import "./App.css";
import SunComponent from "./components/SunComponent/SunComponent";
import CloudComponent from "./components/CloudComponent/CloudComponent";
import RainDropsComponent from "./components/RainDropsComponent";
import useDebounce from "./hooks/use-debounce";
import { useState, useMemo, useCallback } from "react";
import useWeatherReport from "./hooks/use-weather-report";
import { ThemeTypes } from "./types/models/theme-type.enum";
import useThemeUpdater from "./hooks/use-theme-updater";

function App() {
  const [location, setLocation] = useState("Islamabad, Pakistan");
  const debouncedSearchLocation = useDebounce<string>(location, 1000);
  const { weatherData, error } = useWeatherReport(debouncedSearchLocation);
  const [theme, setTheme] = useState<ThemeTypes>(ThemeTypes.PartlyCloudy);

  useThemeUpdater({
    weatherData,
    error,
    setTheme,
    currentTheme: theme,
  });

  const handleLocationChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setLocation(event.target.value);
    },
    []
  );

  const renderWeatherIcon = useMemo(() => {
    switch (theme) {
      case ThemeTypes.PartlyCloudy:
        return (
          <div className="partly-cloudy-container">
            <SunComponent />
            <CloudComponent />
          </div>
        );
      case ThemeTypes.Sunny:
        return <SunComponent />;
      case ThemeTypes.Rainy:
        return (
          <div className="rain-container">
            <CloudComponent /> <RainDropsComponent />
          </div>
        );
      case ThemeTypes.Cloudy:
        return (
          <div className="cloudy-container">
            <CloudComponent /> <CloudComponent />
          </div>
        );
      default:
        return null;
    }
  }, [theme]);

  const renderWeatherInfo = useMemo(() => {
    if (error) return <p>Error: {error}</p>;
    if (!weatherData) return null;

    const { current, location } = weatherData;
    return (
      <>
        <h2>
          {location.name}, {location.country}
        </h2>
        <strong>Temperature: {current.temp_c}°C</strong>
        <strong>Feels like: {current.feelslike_c}°C</strong>
        <strong>Humidity: {current.humidity}%</strong>
        <strong>Wind: {current.wind_kph} km/h</strong>
        <strong>Pressure: {current.pressure_mb} mb</strong>
        <strong>UV Index: {current.uv}</strong>
      </>
    );
  }, [weatherData, error]);

  return (
    <div className={`container ${theme}`}>
      <input
        type="text"
        className="location-picker"
        placeholder="Enter location"
        onChange={handleLocationChange}
        value={location}
      />
      <div className="card">
        <div className="left-card-container">
          <h2>{weatherData?.current.condition.text.toUpperCase()}</h2>
          {renderWeatherIcon}
        </div>
        <div className="right-card-container">{renderWeatherInfo}</div>
      </div>
    </div>
  );
}

export default App;
