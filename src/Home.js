import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { FaThermometerThreeQuarters } from 'react-icons/fa';
import { FaSnowflake } from 'react-icons/fa';
import "./index.css";

// SpeechBubble component to display text within a speech bubble container
const SpeechBubble = ({ text }) => (
  <div className="speech-bubble">
    <span>{text}</span>
  </div>
);
class PenguinWeather extends Component {
  state = {
    weather: null,
    isFetchingWeather: false,
    season: null,
    isLightOn: false,
  };

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove);
    this.setSeason();
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove);
  }

  setSeason = () => {
    const random = Math.random(); // Generate a random number between 0 and 1
  
    if (random < 0.5) {
      // Random number is less than 0.5, set season as summer
      this.setState({ season: 'summer', isLightOn: true });
      this.turnLightOn();
    } else {
      // Random number is greater than or equal to 0.5, set season as winter
      this.setState({ season: 'winter', isLightOn: false });
      this.turnLightOff();
    }
  };

  handleMouseMove = (event) => {
    const eyes = document.querySelectorAll('.eye');
    eyes.forEach((eye) => {
      const eyeBounds = eye.getBoundingClientRect();
      const eyeCenterX = eyeBounds.left + eyeBounds.width / 2;
      const eyeCenterY = eyeBounds.top + eyeBounds.height / 2;
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const rad = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);
      const rot = rad * (180 / Math.PI) * -1 + 180;
      eye.style.transform = `rotate(${rot}deg)`;
    });
  };

  handleClick = () => {
    if (!this.state.isFetchingWeather) {
      this.setState({ isFetchingWeather: true });
  
      const { season, isLightOn } = this.state;
      const weatherConditions = {
        summer: {
          sunny: ['Sunny and warm at 25°C', 'Hot with a slight breeze', 'Clear skies and perfect for swimming'],
          cloudy: ['Cloudy with a chance of showers', 'Partly cloudy with a gentle breeze', 'Warm with scattered clouds'],
        },
        winter: {
          sunny: ['Snowy with a temperature of -5°C', 'Cold and frosty', 'Bundle up! Snow is falling'],
          cloudy: ['Cloudy with a chance of snow flurries', 'Overcast skies and chilly temperatures', 'Stay indoors, it might snow'],
        },
      };
  
      const currentWeatherConditions = weatherConditions[season];
      if (currentWeatherConditions) {
        const weatherOptions = currentWeatherConditions[isLightOn ? 'sunny' : 'cloudy'];
        const randomWeather = weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
  
        setTimeout(() => {
          this.setState({ weather: randomWeather, isFetchingWeather: false });
        }, 1500);
      } else {
        console.log(`Weather conditions for the season "${season}" are not defined.`);
      }
    }
  }; 

  turnLightOn = () => {
    this.setState({ isLightOn: true });
  };

  turnLightOff = () => {
    this.setState({ isLightOn: false });
  };

  render() {
    const { weather, isFetchingWeather, season, isLightOn } = this.state;

    return (
      <div>
        <div>
          <button title="sunny" onClick={this.turnLightOn} className="main-btn"><FaThermometerThreeQuarters /></button>
          &nbsp; &nbsp;
          <button title="cloudy" onClick={this.turnLightOff} className="main-btn"><FaSnowflake /></button>
        </div>

        <div id="bulb" className={isLightOn ? "bulb-container on" : "bulb-container"}></div>
        <h3 style={{ textAlign: "center" }}>Welcome to Penguin's Weather Report!</h3>
    
        <div className="penguin-container">
          {/* Penguin SVG code */}
      
          <div className="penguin">
            <div className="penguin-bottom">
              <div className="right-hand"></div>
              <div className="left-hand"></div>
              <div className="right-feet"></div>
              <div className="left-feet"></div>
            </div>
            <div className="penguin-top">
              <div className="right-cheek"></div>
              <div className="left-cheek"></div>
              <div className="eye"></div>
              <div className="eye"></div>
              <div className="belly"></div>
              <div className="right-eye">
                <div className="sparkle"></div>
              </div>
              <div className="left-eye">
                <div className="sparkle"></div>
              </div>
              <div className="blush-right"></div>
              <div className="blush-left"></div>
              <div className="beak-top"></div>
              <div className="beak-bottom"></div>
            </div>
          </div>
        </div>

        <br />

        <div>
          <button className="main-btn" onClick={this.handleClick} disabled={isFetchingWeather}>
            {isFetchingWeather ? 'Fetching Weather...' : `Check Penguin's Weather`}
          </button>
          {weather && (
            <div className="weather-response">
              <SpeechBubble text={`The penguin asks: "Is it ${isLightOn ? 'Summer' : 'Winter'} today?"`} />
              <SpeechBubble text={weather} />
            </div>
          )}
        </div>

        <br />
        <br />

        <footer className="footer-content">
          <p className="mt-"><i className="fa fa-code"></i>&nbsp;&nbsp;with&nbsp;&nbsp;<i className="fa fa-heart"></i>&nbsp;&amp;&nbsp;&nbsp;<i className="fa fa-coffee"></i></p>
          <p>© {new Date().getFullYear()} <a href="https://anyaparanya.com" className="link-grey" target="_blank" rel="nofollow">anyaParanya</a></p>
        </footer>
      </div>
    );
  }
}

export default PenguinWeather;
