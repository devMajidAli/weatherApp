import axios from "axios";
import React from "react";
import { CITIES, WEATHER_API_KEY } from "../config";
import { conversionToCelciusFromKelvin, getDay, getUniqueList } from "../assets/genericActions";

interface IState {
    selectedCity: number,
    weather: [{
        dt_txt?: {},
        weather?: [{ main?: string, icon?: string }],
        main?: { temp?: number }
    }]
}

export default class WeatherDetails extends React.Component {
    state: IState = {
        selectedCity: CITIES.OTTAWA,
        weather: [{}]
    }
    componentDidMount(): void {
        this.changeOfCity(this.state.selectedCity);
    }

    changeOfCity(cityId: number) {
        this.setState({ selectedCity: cityId })
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${WEATHER_API_KEY}`).then(
            response => {
                this.setState({ weather: getUniqueList(response.data.list) })
            }
        )
    }
    render() {
        let { weather } = this.state
        return (
            <div className="weather">
                <div className="container">
                    <div className="city-tabs">
                        <button type="button" className={` ${this.state.selectedCity === CITIES.OTTAWA ? "active" : ""}`} onClick={() => this.changeOfCity(CITIES.OTTAWA)}>
                            OTTAWA
                        </button>
                        <button type="button" className={` ${this.state.selectedCity === CITIES.MOSCOW ? "active" : ""}`} onClick={() => this.changeOfCity(CITIES.MOSCOW)}>
                            MOSCOW
                        </button>
                        <button type="button" className={` ${this.state.selectedCity === CITIES.TOKYO ? "active" : ""}`} onClick={() => this.changeOfCity(CITIES.TOKYO)}>
                            TOKYO
                        </button>
                    </div>
                    <div className="weather-details shadow">
                        {weather?.map((list, index) => {
                            if (index === 0) {
                                return (
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="today-weather">
                                                <h4>Today</h4>
                                                <div className="today-weather-details">
                                                    <img height={90} src={`http://openweathermap.org/img/w/${list?.weather?.[0]?.icon}.png`} alt="icon" />
                                                    <div>
                                                        <h1>{`${conversionToCelciusFromKelvin(list?.main?.temp)}°`}</h1>
                                                        <h2>{list?.weather?.[0]?.main}</h2>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            } return null
                        })}
                        <div className="row">
                            {
                                weather?.map((list, index) => {
                                    if (index >= 1 && index < 5) {
                                        return (
                                            <div className={`col-lg-3 col-md-3 col-sm-12 col-12 mt-1 day${index}-col`} key={index}>
                                                <div className={`week-weather day${index}-day`}>
                                                    <h4>{
                                                        getDay(list?.dt_txt)
                                                    }</h4>
                                                    <img height={90} src={`http://openweathermap.org/img/w/${list?.weather?.[0]?.icon}.png`} alt="icon" />
                                                    <h2>{`${conversionToCelciusFromKelvin(list?.main?.temp)}°`}</h2>
                                                </div>
                                            </div>
                                        )
                                    } return null
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
