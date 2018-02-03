'use strict';

const baseDomain = 'myqexternal.myqdevice.com';
const API_VER = '/api/v4';

const Alexa = require('alexa-sdk');
var https = require('https');
const APP_ID = "[YOUR APP ID FOR THE ALEXA SKILL]";  // TODO replace with your app ID (OPTIONAL).


let config = new Object();

let states = {
    2: 'Closed',
    8: 'Opening/Closing',
    9: 'Open'
  };

let types = {
    close: 0,
    open: 1
};

const languageStrings = {
    'en-US': {
        translation: {
            SKILL_NAME: 'Garage Information',
            GET_STATE_MESSAGE: "Your garage is ",
            HELP_MESSAGE: 'You can ask about your garage being open or closed... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Ok, be that way then!',
            SKILL_NAME: 'The Garage',
        },
    }
};


//header files
function headers(token) {
    let base = {
        'Culture': 'en',
        'BrandId': '2',
        'MyQApplicationId': 'OA9I/hgmPHFp9RYKJqCKfwnhh28uqLJzZ9KOJf1DXoo8N2XAaVX6A1wcLYyWsnnv',
        'ApiVersion': '4.1',
        'Content-Type' : 'application/json'
    }
    if (token) {
        return Object.assign(base, {
            "SecurityToken" : token
        })
    } else {
        return base
    }
}

//set up the auth token
function getToken(callback){
    var loginCreds = {"password":"[YOUR PASSWORD]","username":"[YOUR USERNAME]"};
    config.deviceId = "[YOUR DEVICE ID]";


    makeRequest("post",API_VER + '/User/Validate',loginCreds, res => {
            var resObj = JSON.parse(res)
            if (resObj.SecurityToken === undefined) {
                console.log(resObj);
            }else{
                config.token = resObj.SecurityToken;
            }
            callback();
        });
}

function openGarage(cb){
    getToken(()=>{
        var body = {
            'attributeName':'desireddoorstate',
            'AttributeValue':types['open'],
            'myQDeviceId':config.deviceId
          };
          console.log(body);
        makeRequest("put",API_VER + "/DeviceAttribute/PutDeviceAttribute",body, cb);
    });
    
}

function closeGarage(cb){
    getToken(()=>{
        var body = {
            'attributeName':'desireddoorstate',
            'AttributeValue':types['close'],
            'myQDeviceId':config.deviceId
          };
          console.log(body);
        makeRequest("put",API_VER + "/DeviceAttribute/PutDeviceAttribute",body, cb);
    });
}

function getState(cb){
    getToken(()=>{
        makeRequest("get",API_VER + "/DeviceAttribute/GetDeviceAttribute?myQDeviceId=" + config.deviceId + "&attributeName=doorstate",undefined, cb);
    });
}

function makeRequest(type, path, bodyData, callback){

    var options = {
        host:  baseDomain,
        // port: '443',
        path: path,
        method: type,
        headers: headers(config.token)
    };
    console.log(JSON.stringify(headers(config.token)));
    var req = https.request(options, res => {
        res.setEncoding('utf8');
        var returnData = "";
        res.on('data', chunk =>  {
            returnData += chunk;
        });
        res.on('end', () => {
            console.log(returnData);
            callback(returnData);
        });
        req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
        });
    
    });

    if(bodyData){
        req.write(JSON.stringify(bodyData)); //add to body 
    }
    req.end();
}


const handlers = {
    'LaunchRequest': function () {
        this.emit(':ask',"Welcome, ask me about your garage door.");
    },
    'GarageIntent': function () {
        this.emit('GetGarageState');
    },
    'GarageIntentOpen' : function(){        
        openGarage(() => {                    
            this.response.speak('Your garage is opening.');
            this.emit(':responseReady');
        });
    },
    'GarageIntentClose' : function(){
        closeGarage(() => {                    
            this.response.speak('Your garage is shutting.');
            this.emit(':responseReady');
        });
    },
    'GetGarageState': function () {
        
        getState(res => {     
            console.log(res);
            this.response.speak('Your garage is ' + states[JSON.parse(res).AttributeValue]);
            this.emit(':responseReady');
        });
    },

    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};


exports.handler = (event, context, callback) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();

};


