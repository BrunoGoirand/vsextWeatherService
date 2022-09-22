import * as request from "request-promise";

const apiKey = "795ddeaffd98c4b782091369db5bbb5";

export interface CityWeather {
  city: string;
  temperature: number;
  description: string;
  lon: number;
  lat: number;
}

export class WeatherService {
  public async getWeather(city: string | undefined): Promise<CityWeather> {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const weatherResponse = JSON.parse(await request.get({ uri: url }));
    console.log(weatherResponse);
    return {
      description: weatherResponse.weather[0].main,
      temperature: weatherResponse.main.temp,
      city: weatherResponse.name,
      lon: weatherResponse.coord.lon,
      lat: weatherResponse.coord.lat,
    };
  }

  public async getWeatherExtended(city: string | undefined): Promise<string> {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    return JSON.parse(await request.get({ uri: url }));
  }
}
