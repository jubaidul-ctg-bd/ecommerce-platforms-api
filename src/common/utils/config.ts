const devUrl ='http://192.168.0.107:3000';
const liveUrl = 'http://api.ebhubon.com';

let temp = devUrl;
// console.log("process.env.NODE_ENV",process.env.NODE_ENV);
if (process.env.NODE_ENV == "production"){
  temp = liveUrl;
}




export const baseUrl = temp;