
let myq = require('myq-node')
 
myq.login('[USER_NAME]', '[PASSWORD]','[DEVICE_ID]')
//Email and password are reqired, device ID is optional 
 
myq.getDevices().then(devices => {
  console.log("getting the devices");
  console.log(devices) //returns array of devices 
}).catch(console.log) //Don't forget to catch errors 
 
/*If you set a device ID then it will use one for the rest of the methods, if not just provide
one now*/
 
myq.getState().then(state => {
  console.log(state)
}).catch(console.log)

// myq.openDoor().then(door => {
//   console.log(door) //If this does not work, try other device Ids' 
// }).catch(console.log)

 