import * as request from "request-promise";

export interface CityWeather {
  city: string;
  temperature: number;
  description: string;
  lon: number;
  lat: number;
}

export class WeatherService {
  apiKey: string;

  constructor() {
    this.apiKey = process.env.OpenWeatherMap as string;
    //console.log("Weather: reading API key [%s]", this.apiKey);
  }
  public async getWeather(city: string | undefined): Promise<CityWeather> {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`;
    //console.log("Weather: getWeather url requested [%s]", url);
    const weatherResponse = JSON.parse(await request.get({ uri: url }));
    return {
      description: weatherResponse.weather[0].main,
      temperature: weatherResponse.main.temp,
      city: weatherResponse.name,
      lon: weatherResponse.coord.lon,
      lat: weatherResponse.coord.lat,
    };
  }

  public async getWeatherExtended(city: string | undefined): Promise<string> {
    //console.log("Weather: getWeatherExtended url requested [%s]", url);
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`;
    return JSON.parse(await request.get({ uri: url }));
  }
}
