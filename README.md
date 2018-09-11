# Charo :vhs:
View and translate lyrics from your Spotify playback

![The Charo Application](./docs/assets/charo.png)

## Using the Application

Due to API rate limits on the translation API that this application, it's not feasible to have one application to serve multiple people. Until I figure out a way to make that happen and have a common platform, you can still use this application by deploying it on your own with API keys of your own.  

### Step 1 of 5: Setting up the Spotify API Connection
- Go to the Spotify for Developers platform and create a new account using [this link](https://developer.spotify.com/dashboard/#). (It's probably going to use your normal Spotify account if you haven't created an account already).
- Click on "Create a client ID", and follow through the tutorial by filling the necessary information.
- Once the client shows up in your dashboard, copy and paste the Client ID into `react > src > actions > index.js`
```
var loginConfig = {
        "baseUrl": "https://accounts.spotify.com/authorize",
        "urlParams": {
            "client_id": "<INSERT_CLIENT_ID_HERE",
            "redirect_uri": url + "/auth/callback/",
            "scope": "user-read-currently-playing user-read-playback-state",
            "response_type": "token",
            "state": "ya2na322112tna13h21dra1121223232v1"
        }
    }
```

### Step 2 of 5: Creating a Genius API Key
- 

### Step 3 of 5: Creating a Yandex Translate API Key

### Step 4 of 5: Deployment: On Heroku or Locally

### Step 5 of 5: (Optional) Changing Language Configuration

## Dependencies

## Contributing
