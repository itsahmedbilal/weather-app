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
  const { weatherData, error, isLoading } = useWeatherReport(debouncedSearchLocation);
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
    const iconComponents: Record<ThemeTypes, JSX.Element | null> = {
      [ThemeTypes.PartlyCloudy]: (
        <div className="partly-cloudy-container">
          <SunComponent />
          <CloudComponent />
        </div>
      ),
      [ThemeTypes.Sunny]: <SunComponent />,
      [ThemeTypes.Rainy]: (
        <div className="rain-container">
          <CloudComponent /> <RainDropsComponent />
        </div>
      ),
      [ThemeTypes.Cloudy]: (
        <div className="cloudy-container">
          <CloudComponent /> <CloudComponent />
        </div>
      ),
      [ThemeTypes.Stormy]: null, // Add this line
    };

    return iconComponents[theme];
  }, [theme]);

  const renderWeatherInfo = useMemo(() => {
    if (error) return <p className="error-message">Error: {error}</p>;
    if (isLoading) return <p className="loading-message">Loading...</p>;
    if (!weatherData) return null;

    const { current, location } = weatherData;
    const weatherInfoItems = [
      { label: "Temperature", value: `${current.temp_c}°C` },
      { label: "Feels like", value: `${current.feelslike_c}°C` },
      { label: "Humidity", value: `${current.humidity}%` },
      { label: "Wind", value: `${current.wind_kph} km/h` },
      { label: "Pressure", value: `${current.pressure_mb} mb` },
      { label: "UV Index", value: current.uv },
    ];

    return (
      <>
        <h2>
          {location.name}, {location.country}
        </h2>
        {weatherInfoItems.map(({ label, value }) => (
          <strong key={label}>
            {label}: {value}
          </strong>
        ))}
      </>
    );
  }, [weatherData, error, isLoading]);

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
