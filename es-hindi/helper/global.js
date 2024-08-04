import moment from "moment-timezone";

const dateConversion = (value) => {
  const dt = new Date(parseInt(value * 1000));
  return (
    dt.toLocaleDateString("en-us", { month: "long" }).toUpperCase() +
    " " +
    dt.toLocaleDateString("en-us", { day: "numeric" }) +
    "," +
    dt.getFullYear() +
    "," +
    dt.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }) +
    " IST"
  );
};
const photoGallerydateConversion = (value) => {
  const date = new Date(value);
  return (
    date.toLocaleDateString("en-us", { month: "long" }) +
    " " +
    date.toLocaleDateString("en-us", { day: "numeric" }) +
    ", " +
    date.getFullYear() +
    ", " +
    date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }) +
    " IST"
  );
};

const longDateConversion = (value) => {
  const date = new Date(value);
  return (
    date.toLocaleDateString("en-us", { month: "long" }) +
    " " +
    date.toLocaleDateString("en-us", { day: "numeric" }) +
    ", " +
    date.getFullYear() +
    ", " +
    date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }) +
    " IST"
  );
};
const blogTimeConversion= (value) => {
  const blogTime = moment(value ? liveTime(String(value)) : "")
  .tz("Asia/Kolkata")
  .format("MMMM DD, YYYY, HH:mm z");
  return blogTime;
};
const blogTimeConversionForLiceBlog= (value) => {
  const date = new Date(value);  
  return (
    date.toLocaleDateString("en-us", { month: "long" }) +
    " " +
    date.toLocaleDateString("en-us", { day: "numeric" }) +
    ", " +
    date.getFullYear() +
    ", " +
    date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }) +
    " (IST)"
  );
};
const liveTime = (time) => {
  return time.replace(
    /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
    "$1-$2-$3 $4:$5:$6"
  );
};
const shortDateConversion = (value) => {
  const date = new Date(value);
  return (
    date.toLocaleDateString("en-us", { month: "short" }) +
    " " +
    date.toLocaleDateString("en-us", { day: "numeric" }) +
    ", " +
    date.getFullYear()
  );
};
module.exports = {
  dateConversion,
  photoGallerydateConversion,
  longDateConversion,
  blogTimeConversion,
  blogTimeConversionForLiceBlog,
  shortDateConversion
};
