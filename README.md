# Charo :vhs:
View and translate lyrics from your Spotify playback

![The Charo Application](./docs/assets/charo.png)

## Using the Application

Due to rate limits on the translation API that this application, it's not feasible to have one application to serve multiple people by hosting it publicly.

You can still use this application by deploying it on your own with API keys of your own. Once you create these API keys, you need to include them in your keys.json file (for local deployment) or Config variables (for deployment on Heroku). 

### Step 1 of 5: Setting up the Spotify API Connection
- Go to the Spotify for Developers platform and create a new account using [this link](https://developer.spotify.com/dashboard/#). (It's probably going to use your normal Spotify account if you haven't created an account already).
- Click on "Create a client ID", and follow through the tutorial by filling the necessary information.
- Depending on your deployment configuration, store the API key in your config variables or ``keys.json`` file
- Add the URL for server where your application is running to the list of Redirect URIs in the client settings.
- Also, add the URL for your server configuration in the ``url`` const, in `` react -> src -> actions -> index.js ``, as shown in the example below. This instructs the frontend to include the callback URL in its request to the 
    ```` 
    /** In actions/index.js **/
    
    export const ...
    export const ...

    /* Make changes here (line 13) */
    const url = "http://localhost:8000";

    ````

### Step 2 of 5: Creating a Genius API Key
- Go to Genius Developers API Client creation dashboard using [this link](https://genius.com/api-clients). (You need to create a Genius developer account which, similar to Spotify, just gets registered on top of your existing Genius account if you have one)
- Create a new API client, and you 

### Step 3 of 5: Creating a Yandex Translate API Key

### Step 4 of 5: Deployment: On Heroku or Locally

### Step 5 of 5: (Optional) Changing Language Configuration

## Dependencies

## Contributing
