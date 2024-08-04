import { URL } from "api/Constant";
import fetchUtility from "includes/sFetchUtility";
import moment from "moment";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
Date.prototype.getWeek = function () {
  var dt = new Date(this.getFullYear(), 0, 1);
  return Math.ceil(((this - dt) / 86400000 + dt.getDay() + 1) / 7);
};
export const getRashifalData = async (name, time = "day", isCSR = false) => {
  //time = time.charAt(0).toUpperCase() + time.slice(1);
  const year = new Date().getFullYear();
  const month = monthNames[new Date().getMonth()];
  const week = moment().subtract(1, "day").week(); //new Date().getWeek();
  const filterObj = { rashifal_year: year, slug: name, rashifal_time: time };
  if (time === "month") {
    filterObj["rashifal_month"] = month;
  }
  if (time === "week") {
    filterObj["rashifal_week"] = week;
  }
  if (time === "day") {
    filterObj["rashifal_year"] = `0`;
    filterObj["rashifal_day"] = `${new Date().getFullYear()}-${(
      "0" +
      (new Date().getMonth() + 1)
    ).slice(-2)}-${("0" + new Date().getDate()).slice(-2)} 05:30:00`;
  }

  const baseURL = URL.getURL(URL.GET_ASTRO_ALL, isCSR);
  return await fetchUtility(
    `${baseURL}?fields=id,rashifal_name,description,name,english_name,meta_title,meta_keyword,meta_description&filter=${JSON.stringify(
      filterObj
    )}`
  );
};
