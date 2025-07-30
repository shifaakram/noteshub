import 'dotenv/config'; // THIS MUST BE THE FIRST LINE OF THE FILE

// --- ADD THIS LINE FOR DEBUGGING ---
console.log('DEBUG (app.config.js): process.env.GEMINI_API_KEY =', process.env.GEMINI_API_KEY);
// -----------------------------------

export default ({ config }) => {
  return {
    ...config, // Spreads existing default config properties

    // ALL properties that were inside "expo": { ... } in app.json
    // should be directly here at the top level of this returned object.
   "owner": "shifaakram",
    "name": "noteshub",
     "slug": "noteshub",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "upssnotes",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "package": "com.shifaakram.upssnotes", // <--- 🌟 ADD THIS LINE 🌟
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      
      "edgeToEdgeEnabled": true
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ],
      "expo-font",
      "expo-asset"
    ],
    "experiments": {
      "typedRoutes": true
    },

    // Your 'extra' field correctly placed at the top level
    extra: {
      geminiApiKey: process.env.GEMINI_API_KEY, // This line reads from your .env
       "eas": {
        "projectId": "9f259b83-ca95-45a5-bc49-43a71f95612c"
      }
    },
  }; // This closes the return object
}; // This closes the default exported function