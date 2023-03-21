const moment = require("moment");

const getDatesDiff = function (orderDate, arrivalDate) {
  let start = moment(orderDate, "DD-MM-YYYY");
  let end = moment(arrivalDate, "DD-MM-YYYY");
  let daysLeft = moment.duration(end.diff(start)).asDays(); // if you want to change day asMinutes()

  return Math.floor(daysLeft);
};

// console.log(getDatesDiff("25-03-2023", "03-04-2023"));

const getPassedDays = function (orderDate) {
  return getDatesDiff(orderDate, moment());
};

// console.log(getPassedDays("15-03-2023"));

module.exports = { getDatesDiff, getPassedDays };
