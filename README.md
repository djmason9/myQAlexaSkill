# myQAlexaSkill
Alexa skill to allow control over your myQ connected garage door

### Features
Ask Alexa to open close and check the status of your door.

- "alexa ask my garage to shut"

- "alexa ask my garage to open"

- "alexa ask my garage whats up"

### Usage
You will need to know how to set up a basic alexa skill.

### Invocation Name
```javascript
my garage
```

### Intent Schema
```javascript
{
  "intents": [
    {
      "intent": "AMAZON.CancelIntent"
    },
    {
      "intent": "AMAZON.HelpIntent"
    },
    {
      "intent": "AMAZON.StopIntent"
    },
    {
      "intent": "GarageIntent"
    },
    {
      "intent": "GarageIntentOpen"
    },
    {
      "intent": "GarageIntentClose"
    }
  ]
}
```
### Sample Utterances
``` javascript
GarageIntent whats up with my garage
GarageIntent whats up
GarageIntentOpen to open
GarageIntentClose to shut
```

### The Code
You should be able to copy and paste the index.js file into your lambda console (function code)

You will just need to change 4 things in the file.
``` javascript
// your id will look something like amzn1.ask.skill.d246ed4f-4a80-477a-a9bf-12345678
const APP_ID = "[YOUR APP ID FOR THE ALEXA SKILL]";  // TODO replace with your app ID (OPTIONAL).

//the user name and password you use for the mobile app
var loginCreds = {"password":"[YOUR PASSWORD]","username":"[YOUR USERNAME]"};
// your device id
config.deviceId = "[YOUR DEVICE ID]";
```
