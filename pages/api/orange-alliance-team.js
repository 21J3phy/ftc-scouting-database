import axios from 'axios'
import { API } from "@the-orange-alliance/api";
const ORANGE_ALLIANCE_API_KEY = "EElBgh3bJ/qwzVORJWPHnj4GzKD0K4B8Q24euT//FEU=";
// OR const { API } = require("@the-orange-alliance/api")

const toa = new API(ORANGE_ALLIANCE_API_KEY, "FTC_Scouting-Database");

const event = await toa.getEvent("1920-FIM-KFQ");
console.log(event.eventName);

// OR

//toa.getEvent("1920-FIM-KFQ").then(event => {
  //console.log(event.eventName);