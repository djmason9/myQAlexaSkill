# myQAlexaSkill
Alexa skill to allow control over your myQ connected garage door

### Features
Ask Alexa to open close and check the status of your door.

- "alexa ask my garage to close"

- "alexa ask my garage to open"

- "alexa ask my garage whats up"

### Usage
You will need to know how to set up a basic alexa skill.

## Intent Schema
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
