async function fetchData() {
  try {
    const locRes = await fetch('https://ipapi.co/json/');
    const loc = await locRes.json();
    const lat = loc.latitude;
    const lon = loc.longitude;
    document.getElementById("location").textContent = `Location: ${loc.city}, ${loc.region}`;

    const aqiRes = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=pm2_5`);
    const aqi = await aqiRes.json();
    const pm25 = aqi.hourly.pm2_5[0];
    document.getElementById("aqi").textContent = `AQI (PM2.5): ${pm25}`;
    document.getElementById("health").textContent = pm25 <= 50 ? "Health Tips: Air quality is Good" : (pm25 <= 100 ? "Health Tips: Moderate" : "Health Tips: Poor air quality - Limit outdoor activity");

    const fireRes = await fetch("https://firms.modaps.eosdis.nasa.gov/mapserver/wfs.cgi?SERVICE=WFS&VERSION=1.1.0&REQUEST=GetFeature&TYPENAME=fires_modis_24&OUTPUTFORMAT=application/json&SRSNAME=EPSG:4326");
    const fireData = await fireRes.json();
    const nearby = fireData.features.filter(f => {
      const [fLon, fLat] = f.geometry.coordinates;
      return Math.abs(fLat - lat) < 1 && Math.abs(fLon - lon) < 1;
    });
    document.getElementById("fire-alerts").textContent = `Nearby Fire Alerts: ${nearby.length}`;
  } catch (e) {
    console.error(e);
    document.getElementById("aqi").textContent = "AQI: Error";
    document.getElementById("fire-alerts").textContent = "Fire Alerts: Error";
  }
}
fetchData();