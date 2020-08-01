

const searchInput = document.querySelector('#search-input'),
    suggestionsPanel = document.querySelector('.suggestions');


searchInput.addEventListener('keyup', function () {

    const input = searchInput.value.toLowerCase();
    suggestionsPanel.innerHTML = '';


    fetch('https://us1.locationiq.com/v1/search.php?key=51b1b23250a6fb&q=' + input + '&format=json')
        .then(response => response.json())
        .then(data => {

            if (!data.error) {
                let countryInfoArray = [{}];

                data.forEach((getData) => {

                    let name = getData.display_name.split(','),
                        country = name.slice(-1),
                        displayName = name[0] + "," + country;
                    eachCountryInfo = {
                        placeName: displayName,
                        latitude: getData.lat,
                        longitude: getData.lon
                    }


                    countryInfoArray.push(eachCountryInfo);


                });

                countryInfoArray.shift();




                const suggestions = countryInfoArray.filter(function (name) {

                    return name.placeName.toLowerCase().startsWith(input);
                });

                suggestions.forEach((suggested) => {
                    const suggestionsInnerDiv = document.createElement('div');
                
                    suggestionsInnerDiv.setAttribute("data-placeName", suggested.placeName);
                    suggestionsInnerDiv.setAttribute("data-lat", suggested.latitude);
                    suggestionsInnerDiv.setAttribute("data-lon", suggested.longitude);
                    let giveIt2Inpt = suggestionsInnerDiv.innerHTML = suggested.placeName;
                    let a = suggestionsPanel.appendChild(suggestionsInnerDiv);
                    a.addEventListener('click', function giveValues() {
                        let getLat = a.getAttribute('data-lat'),
                            getLon = a.getAttribute('data-lon'),
                            getPlaceName = a.getAttribute('data-placeName');
                    


                        searchInput.value = giveIt2Inpt;
                        suggestionsPanel.innerHTML = '';


                        let locationNameShow = document.querySelector(".location-name"),
                            showTempConditon = document.querySelector(".condition-name"),
                            showTempDegree = document.querySelector(".today-temp"),
                            showFeelsLike = document.querySelector(".feels-like"),
                            showSunRise = document.querySelector(".sun-rise"),
                            showSunSet = document.querySelector(".sun-set"),
                            showCloud = document.querySelector(".cloudiness-persent"),
                            showHumidity = document.querySelector(".humidity-persent"),
                            showPressure = document.querySelector(".pressure-level"),
                            showWind = document.querySelector(".wind-level"),
                            showConditionDesc = document.querySelector('.condition-desc'),
                            showConditionIcon = document.querySelector(".condition-icon"),
                            showSearchLabel = document.querySelector(".location-name-label"),
                            monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                            getDayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];


                        locationNameShow.innerHTML = getPlaceName;
                        showSearchLabel.innerHTML = "Searched : ";


                        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + getLat + '&lon=' + getLon + '&units=metric&appid=42f55767c7bb1cbd240aeefce58a66e6')
                            .then(response => response.json())
                            .then(weatherInfo => {

                                let getSunRiseData = new Date((weatherInfo.current.sunrise) * 1000),
                                    getSunSetData = new Date((weatherInfo.current.sunset) * 1000),
                                    convertPressure = weatherInfo.current.pressure / 33.863886666667,
                                    convertWindSpeed2Kmh = weatherInfo.current.wind_speed * 3.01,
                                    getUrlIcon = 'https://openweathermap.org/img/wn/' + weatherInfo.current.weather[0].icon + '@2x.png',
                                    sunRiseTime = getSunRiseData.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
                                    sunSetTime = getSunSetData.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }),
                                    getWeatherMainString = weatherInfo.current.weather[0].main.toLowerCase(),
                                    getWeatherDescString = weatherInfo.current.weather[0].description.toLowerCase(),
                                    compareTwoCondition = getWeatherMainString.localeCompare(getWeatherDescString);


                                showTempDegree.innerHTML = weatherInfo.current.temp + "° C";
                                showTempConditon.innerHTML = weatherInfo.current.weather[0].main;
                                if (compareTwoCondition !== 0) {
                                    showConditionDesc.style.marginTop = "-10px";
                                    showConditionDesc.innerHTML = weatherInfo.current.weather[0].description;

                                }
                                showFeelsLike.innerHTML = ", feels " + weatherInfo.current.feels_like + "° C";
                                showSunRise.innerHTML = sunRiseTime;
                                showSunSet.innerHTML = sunSetTime;
                                showCloud.innerHTML = weatherInfo.current.clouds + "%";
                                showHumidity.innerHTML = weatherInfo.current.humidity + "%";
                                showPressure.innerHTML = convertPressure.toFixed(1) + " inHg";
                                showWind.innerHTML = convertWindSpeed2Kmh.toFixed(1) + " km/h";
                                showConditionIcon.setAttribute("src", getUrlIcon);




                                //next eight days weather forcast

                                let showWeatherForNextDays = document.querySelector(".weather-next-days"),
                                    createInnerChildValue = '';

                                weatherInfo.daily.shift();// remove the first index of array

                                weatherInfo.daily.forEach(daily => {
                                    let dailyTempMin = daily.temp.min,
                                        dailyTempMax = daily.temp.max,
                                        dailyWeatherCondition = daily.weather[0].main,
                                        dailyWeatherConditionDes = daily.weather[0].description,
                                        dailyWeatherConditionIcon = daily.weather[0].icon,
                                        todayDate = new Date(),
                                        dailyDate = new Date(daily.dt * 1000),
                                        date = dailyDate.getDate() + " " + monthName[dailyDate.getMonth()],
                                        weekDayName = getDayName[dailyDate.getDay()],
                                        getDailyWeatherIcon = 'https://openweathermap.org/img/wn/' + dailyWeatherConditionIcon + '@2x.png',
                                        createInnerChild = '';
                                    todayDate.setDate(todayDate.getDate() + 1);// assisgn todayDate as tomorrowDate

                                    createInnerChild = `
                        <div id = "card-${weekDayName}" class= "carousel-item ${todayDate.getDate() === dailyDate.getDate() ? 'active' : ''} list-card">
                        <div class="show-center">
    
                        <div>
                        <span class ="date">${date}</span>
                        <span class ="week-day-name">(${todayDate.getDate() === dailyDate.getDate() ? 'Tomorrow' : weekDayName})</span>
                        </div> 
    
                        <div>
                        <span><img src= "${getDailyWeatherIcon}" class="icon-daily-weathers"></span>
                        <span class ="daily-weather-condition">${dailyWeatherCondition}</span>
                        </div> 
    
                        <div>
                        <span class ="daily-weather-condition-desc">( ${dailyWeatherConditionDes} )</span>
                        </div> 
    
                        <div>
                        <span class ="daily-temp-min">↓${dailyTempMin}° C</span>
                        <span class ="daily-temp-max">↑${dailyTempMax}° C</span>
                        </div> 
                        </div>
                       
                        </div>
                    
                    `;

                                    createInnerChildValue += createInnerChild;

                                });
                                showWeatherForNextDays.innerHTML = createInnerChildValue;
                            });



                    });


                });

                if (input === '') suggestionsPanel.innerHTML = '';


            }


        });
});
