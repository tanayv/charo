# Charo :vhs:
View and translate lyrics from your Spotify playback

![The Charo Application](./docs/assets/charo.png)

## Using the Application

Due to rate limits on the translation API that this application, it's not feasible to have one application to serve multiple people by hosting it publicly.

You can still use this application by deploying it on your own with API keys of your own. Once you create these API keys, you need to include them in your keys.json file (for local deployment) or Config variables (for deployment on Heroku). 

This project requires Node and NPM to be installed. 


### Step 1 of 5: Deployment


#### Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/tanayv/charo.git)

#### Local
- Clone the repository using the following command
    ````
    git clone https://github.com/tanayv/charo.git

    ````

- Install dependencies for the application
    ````
    npm install && cd react && npm install
    ````

- Create a `keys.json` file in the root directory of the project, and add the various API keys you create in the next steps to it. It should follow the template below. 

    ````
    {
        "SPOTIFY_CLIENT_ID": "<VALUE>",
        "GENIUS_SECRET": "<VALUE>",
        "YANDEX_API_KEY": "<VALUE>",
        "TRANSLATION_KEY": "<VALUE>"
    }

    ````


### Step 2 of 5: Creating a Spotify Client ID
- Go to the Spotify for Developers platform using [this link](https://developer.spotify.com/dashboard/#) and create a new account . (It's probably going to use your normal Spotify account if you haven't created an account already).
- Click on "Create a client ID", and follow through the tutorial by filling the necessary information.
- Depending on your deployment configuration, store the API key in your config variables or ``keys.json`` file
- Add the URL for server where your application is running to the list of Redirect URIs in the client settings.

### Step 3 of 5: Creating a Genius API Key
- Go to Genius Developers API Client creation dashboard using [this link](https://genius.com/api-clients). (You need to create a Genius developer account which, similar to Spotify, just gets registered on top of your existing Genius account if you have one)
- Create a new API client, and you should be able to access the "Client secret", which is what we need for this application.

### Step 4 of 5: Creating a Yandex Translate API Key
- Go to the Yandex Translate Developers dashboard using [this link](https://translate.yandex.com/developers/keys), and create a new account. 
- Create a new Translate API Key. 


### Step 5 of 5: Setting Up Language Configuration
- Currently, the application only does translation based on the settings defined in the config variables or keys.json file.
- [Here](https://tech.yandex.com/translate/doc/dg/concepts/api-overview-docpage/#api-overview__languages) is a list of languages that the translation that the Yandex translate API supports.
- Set the required language in the format of `'inputLang-outputLang'`. For example, for French to English translations I would use `'fr-en'`.

## Dependencies

## Contributing
