
function switchTab(tabId) {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });
  document.getElementById(tabId).classList.add("active");
}

function changeLanguage() {
  const lang = document.getElementById("language").value;
  alert("Language changed to: " + lang + " (Functionality coming soon)");
}

// Simulated fetch of air quality data
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("location").innerText = "Karimnagar, Telangana";
  document.getElementById("pollutants").innerText = "PM2.5: 57 | PM10: 120 | CO: 0.6 | NO2: 30 | SO2: 8 | O3: 22";
  document.getElementById("suggestions").innerText = "Avoid outdoor activity | Wear a mask | Use air purifier";
  document.getElementById("health-tips").innerText = "Asthmatic? Stay indoors. Elderly should reduce exertion.";
});
