# Weather Checker

The weather data is read from OpenWeatherMap by the server using the fetch API. The server also has its own API endpoints for the React frontend. These are used to return data to the React frontend.

* Notes:
    * Stylesheets are in Sass format (configured in the package.json file)
    * Concurrently is used to run the server and client scripts at the same time
    * The list of cities and countries are stored on the server as json files
    * The server's .env file contains the API key
    * The layout uses react-grid-system
    * The country and city selectors use Material-UI
    * The weather data is fetched by the server using node-fetch
    * moment.js is used to format the server time for logging