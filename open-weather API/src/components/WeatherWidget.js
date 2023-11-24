import React, { useEffect } from 'react';

const WeatherWidget = ({ cityId }) => {
  useEffect(() => {
    if (!window.myWidgetParam) {
      window.myWidgetParam = [];
    }

    window.myWidgetParam.push({
      id: 15,
      cityid: cityId,
      appid: '463bce9969af3f76b2c3f7ddecd37e80',
      units: 'metric',
      containerid: `openweathermap-widget-15-${cityId}`,
    });

    const script = document.createElement('script');
    script.async = true;
    script.charset = "utf-8";
    script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
    document.body.appendChild(script);
  }, [cityId]);

  return (
    <div id={`openweathermap-widget-15-${cityId}`} />
  );
};

export default WeatherWidget;