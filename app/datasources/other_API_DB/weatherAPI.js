import { RESTDataSource } from 'apollo-datasource-rest';

class WeatherAPI extends RESTDataSource {
    //!always call super !!!!
    constructor() {
        super();
        //Sets the base URL for the REST API
        this.baseURL = 'https://api.openweathermap.org/data/3.0/';
    }

    async getWeatherByCity(position) {
        // https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
        return await this.get('onecall', {
            lat: position.x,
            lon: position.y,
            appid: process.env.API_KEY
        });
    }
}

export { WeatherAPI };
