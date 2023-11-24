import React, { useEffect } from 'react';

const WeatherWidget = ({ cityId }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/d3.min.js";
    document.body.appendChild(script);

    if (!window.myWidgetParam) {
      window.myWidgetParam = [];
    }

    window.myWidgetParam.push({
      id: 11,
      cityid: cityId,
      appid: '463bce9969af3f76b2c3f7ddecd37e80',
      units: 'metric',
      containerid: `openweathermap-widget-${cityId}`,
    });

    const widgetScript = document.createElement('script');
    widgetScript.async = true;
    widgetScript.charset = "utf-8";
    widgetScript.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
    document.body.appendChild(widgetScript);
  }, [cityId]);

  return (
    <>
      <div id={`openweathermap-widget-${cityId}`} />
    </>
  );
};

export default WeatherWidget;