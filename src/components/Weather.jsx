import React, { useEffect,useRef,useState } from 'react'
// import { debounce } from "lodash";
import { motion } from "framer-motion";
import './Weather.css'
import clear_icon from '../photos/clear.png'
import cloud_icon from '../photos/cloud.png'
import drizzle_icon from '../photos/drizzle.png'
import humidity_icon from '../photos/humidity.png'
import rain_icon from '../photos/rain.png'
import search_icon from '../photos/search.png'
import snow_icon from '../photos/snow.png'
import wind_icon from '../photos/wind.png'
import thunderstorm_icon from '../photos/thunderstorm.png'
import mist_icon from '../photos/mist.png'
import scattered_clouds_icon from '../photos/scattered_cloud.png'
import broken_clouds_icon from '../photos/broken_clouds.png'

const Weather = () => {

  const inputref =useRef();
  const [weather_data,setweather_data] = useState(false);
  // const [loading, setLoading] = useState(false);

  const all_Icons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": scattered_clouds_icon,
    "03n": scattered_clouds_icon,
    "04d": broken_clouds_icon,
    "04n": broken_clouds_icon,
    "09d": drizzle_icon,
    "09n": drizzle_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": thunderstorm_icon,
    "11n": thunderstorm_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": mist_icon,
    "50n": mist_icon,
  }
  // const weather_condition ={
  //   //"Main": "mere mei likha hua"
  //   "Clouds": "few clouds",
  //   "Clouds": "scattered clouds",
  //   "Clouds": "broken clouds",
  //   "Clouds": "overcast clouds",
  //   "Clear": "clear sky",
  //   "Mist": "mist",
  //   "Smoke": "smoke",
  //   "Haze": "haze",
  //   "Dust": "sand/dust whirls",
  //   "Fog": "fog",
  //   "Smog": "smog",
  //   "Sand": "sand",
  //   "Dust": "dust",
  //   "Ash": "volcanic ash",
  //   "Squall": "squalls",
  //   "Tornado": "tornado",
  //   "Snow": "light snow",
  //   "Snow": "snow",
  //   "Snow": "heavy snow",
  //   "Snow": "sleet",
  //   "Snow": "light shower sleet",
  //   "Snow": "shower sleet",
  //   "Snow": "light rain and snow",
  //   "Snow": "rain and snow",
  //   "Snow": "light shower snow",
  //   "Snow": "shower snow",
  //   "Snow": "heavy shower snow",
  //   "Rain": "light rain",
  //   "Rain": "moderate rain",
  //   "Rain": "heavy intensity rain",
  //   "Rain": "very heavy rain",
  //   "Rain": "extreme rain",
  //   "Rain": "freezing rain",
  //   "Rain": "light intensity shower rain",
  //   "Rain": "shower rain",
  //   "Rain": "heavy intensity shower rain",
  //   "Rain": "ragged shower rain",
  //   "Drizzle": "light intensity drizzle",
  //   "Drizzle": "drizzle",
  //   "Drizzle": "heavy intensity drizzle",
  //   "Drizzle": "light intensity drizzle rain",
  //   "Drizzle": "drizzle rain",
  //   "Drizzle": "heavy intensity drizzle rain",
  //   "Drizzle": "shower rain and drizzle",
  //   "Drizzle": "heavy shower rain and drizzle",
  //   "Drizzle": "shower drizzle",
  //   "Thunderstorm": "thunderstorm with light rain",
  //   "Thunderstorm": "thunderstorm with rain",
  //   "Thunderstorm": "thunderstorm with heavy rain",
  //   "Thunderstorm": "ragged thunderstorm",
  //   "Thunderstorm": "thunderstorm with light drizzle",
  //   "Thunderstorm": "thunderstorm with drizzle",
  //   "Thunderstorm": "thunderstorm with heavy drizzle",
  //   "Thunderstorm": "light thunderstorm",
  //   "Thunderstorm": "thunderstorm",
  //   "Thunderstorm": "thunderstorm",
  // }
  const weather_condition = {
    "Clouds": ["few clouds", "scattered clouds", "broken clouds", "overcast clouds"],
    "Clear": ["clear sky"],
    "Mist": ["mist"],
    "Smoke": ["smoke"],
    "Haze": ["haze"],
    "Dust": ["sand/dust whirls", "dust"],
    "Fog": ["fog"],
    "Smog": ["smog"],
    "Sand": ["sand"],
    "Ash": ["volcanic ash"],
    "Squall": ["squalls"],
    "Tornado": ["tornado"],
    "Snow": ["light snow", "snow", "heavy snow", "sleet", "light shower sleet", "shower sleet", "light rain and snow", "rain and snow", "light shower snow", "shower snow", "heavy shower snow"],
    "Rain": ["light rain", "moderate rain", "heavy intensity rain", "very heavy rain", "extreme rain", "freezing rain", "light intensity shower rain", "shower rain", "heavy intensity shower rain", "ragged shower rain"],
    "Drizzle": ["light intensity drizzle", "drizzle", "heavy intensity drizzle", "light intensity drizzle rain", "drizzle rain", "heavy intensity drizzle rain", "shower rain and drizzle", "heavy shower rain and drizzle", "shower drizzle"],
    "Thunderstorm": ["thunderstorm with light rain", "thunderstorm with rain", "thunderstorm with heavy rain", "ragged thunderstorm", "thunderstorm with light drizzle", "thunderstorm with drizzle", "thunderstorm with heavy drizzle", "light thunderstorm", "thunderstorm"]
  };
  

  // const REACT_APP_API="88035929b75c45b9a3130811252702"
  const REACT_APP_API="6d67dcfb669023a9eafc1710fd5fd239"

  const search = async(city)=>{
    if(city===""){
      alert("Please enter a city name");
      return;
    }
    // setLoading(true);
    // setWeatherData(null);
    try {
      // const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`;
      // const url = `https://api.weatherapi.com/v1/current.json?key=${REACT_APP_API}&q=${city}`;
      const url = `https://api.openweathermap.org/data/2.5/weather?appid=${REACT_APP_API}&q=${city}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();

      if(!response.ok){
        alert(data.message);
        return;
      }

      console.log(data);
      const icon= all_Icons[data.weather[0].icon] || clear_icon;
      // const title= weather_condition[data.weather[0].main];
      const title = weather_condition[data.weather[0].main]?.[0] || "Unknown";
      setweather_data({
        humidity: data.main.humidity,
        temp: Math.floor(data.main.temp),
        wind_speed: data.wind.speed,
        location: data.name,
        icon: icon,
        weather_cond: title
      });
    //   localStorage.setItem("lastCity", city);
    // } catch (error) {
    //   alert(error.message);
    // } finally {
    //   setLoading(false);
    // }
    } catch (error) {
      setweather_data(false);
      console.error("Error fetching weather data:", error);
    }
  } 
  
  useEffect(()=>{
    search("guna");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  return (
      
      <div className='weather' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',color: 'white'}}>
        <motion.div 
          className="weather-container"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        ></motion.div>


        <h1 className="title">Weather App 🌤️</h1>



        <div className="search-bar">
          <input ref={inputref} type="text" placeholder="Enter City..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                search(inputref.current.value);
              }
            }} 
          />
          <img src={search_icon} alt="search" onClick={()=>search(inputref.current.value)}/>
        </div>



        {/* {loading && <div className="loading">Loading...</div>} */}

        
        {weather_data?<>
          <img src={weather_data.icon} alt="clear" className='weather-icon'/>
          <div style={{display:'flex',flexDirection:'column', alignItems:'center',marginTop:'-1.65vw'}} className="loc-temp">
            <p className='condition'>{weather_data.weather_cond}</p>
            <p className='temp'>{weather_data.temp}°C</p>
            <p className='loc'>{weather_data.location}</p>
          </div>
          <div className="weather-data">
            <div className="col" id='1'>
              <img style={{width:'2.5vw'}} src={humidity_icon} alt="" />
              <div>
                <p>{weather_data.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <hr style={{fontWeight:'100'}}/>
            <div className="col" id='2'>
              <img style={{width:'2.5vw'}} src={wind_icon} alt="" />
              <div>
                <p>{weather_data.wind_speed} Km/h</p>
                <span>wind speed</span>
              </div>
            </div>
          </div>
        </>:<></>}
      </div>
  )
}

export default Weather