import React, { useEffect } from 'react';

const WeatherWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/d3.min.js";
    document.body.appendChild(script);

    window.myWidgetParam = [{
      id: 11,
      cityid: '6173331', // City ID for Vancouver
      appid: '463bce9969af3f76b2c3f7ddecd37e80',
      units: 'metric',
      containerid: 'openweathermap-widget-11',
    }];

    const widgetScript = document.createElement('script');
    widgetScript.async = true;
    widgetScript.charset = "utf-8";
    widgetScript.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
    document.body.appendChild(widgetScript);
  }, []);

  return (
    <>
      <h2>Sample Widget for Vancouver</h2>
      <div id="openweathermap-widget-11" />
    </>
  );
};

export default WeatherWidget;