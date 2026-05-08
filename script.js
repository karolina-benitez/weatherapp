window.onload = () => {
    navigator.geolocation.getCurrentPosition(pos => {
        let { latitude: lat, longitude: lon } = pos.coords;
        let tempUnit = 'C';

        const link = `https://weather-proxy.freecodecamp.rocks/api/current?lat=${lat}&lon=${lon}`;
        
        fetch(link).then(response => response.json())
        .then(data => {
            // console.log(data);
            let t_unit = 'C';
            let { name: loc } = data,
                { feels_like, temp } = data.main,
                { main, description, icon } = data.weather[0];

            const locationElement = document.getElementById('location');
            const temperatureElement = document.getElementById('temperature');
            const tempUnitElement = document.getElementById('tempUnit');
            const tempUnitButton = document.getElementById('tempUnitButton');
            const descriptionElement = document.getElementById('description');
            const iconElement = document.getElementById('icon');

            locationElement.textContent = loc;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;
            tempUnitButton.addEventListener('click', toggleTempUnit);

            switch(main.toLowerCase()) {
                case 'drizzle':
                  iconElement.src = 'https://www.svgrepo.com/show/38428/drizzle.svg';
                  break;
                case 'rain':
                  iconElement.src = 'https://www.svgrepo.com/show/522247/rain-2.svg';
                  break;
                case 'thunderstorm':
                  iconElement.src = 'https://www.svgrepo.com/show/414509/thunder.svg';
                  break;
                case 'clouds':
                  iconElement.src = 'https://www.svgrepo.com/show/532037/clouds.svg';
                  break;
                case 'snow':
                  iconElement.src = 'https://www.svgrepo.com/show/532060/snow.svg';
                  break;
              default:
                  iconElement.src = 'https://www.svgrepo.com/show/302515/sunny-weather.svg';
            }
  
          function toggleTempUnit() {
            console.log("✅✅✅✅✅✅ button clicked")
              if(t_unit == 'C'){
                  t_unit = 'F';
                  temperatureElement.textContent = `${Math.round(temp * 9/5 + 32)}°F`;
              }
              else {
                  t_unit = 'C';
                  temperatureElement.textContent = `${Math.round(temp)}°C`;
              }
          }     
        });
    }); 
}
