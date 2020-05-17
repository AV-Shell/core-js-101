/* eslint-disable linebreak-style */
/* *******************************************************************************************
 *                                                                                           *
 * Plese read the following tutorial before implementing tasks:                              *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#Date_object
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date     *
 *                                                                                           *
 ******************************************************************************************* */


/**
 * Parses a rfc2822 string date representation into date value
 * For rfc2822 date specification refer to : http://tools.ietf.org/html/rfc2822#page-14
 *
 * @param {string} value
 * @return {date}
 *
 * @example:
 *    'December 17, 1995 03:24:00'    => Date()
 *    'Tue, 26 Jan 2016 13:48:02 GMT' => Date()
 *    'Sun, 17 May 1998 03:00:00 GMT+01' => Date()
 */
function parseDataFromRfc2822(value) {
  return Date.parse(value);
}

/**
 * Parses an ISO 8601 string date representation into date value
 * For ISO 8601 date specification refer to : https://en.wikipedia.org/wiki/ISO_8601
 *
 * @param {string} value
 * @return {date}
 *
 * @example :
 *    '2016-01-19T16:07:37+00:00'    => Date()
 *    '2016-01-19T08:07:37Z' => Date()
 */
function parseDataFromIso8601(value) {
  return Date.parse(value);
}


/**
 * Returns true if specified date is leap year and false otherwise
 * Please find algorithm here: https://en.wikipedia.org/wiki/Leap_year#Algorithm
 *
 * @param {date} date
 * @return {bool}
 *
 * @example :
 *    Date(1900,1,1)    => false
 *    Date(2000,1,1)    => true
 *    Date(2001,1,1)    => false
 *    Date(2012,1,1)    => true
 *    Date(2015,1,1)    => false
 */
function isLeapYear(date) {
  const a = new Date(Date.UTC(date.getUTCFullYear(), 1, 29, 0, 0, 0, 0));
  return (a.getUTCDate() === 29);
}

/**
 * Returns the string represention of the timespan between two dates.
 * The format of output string is "HH:mm:ss.sss"
 *
 * @param {date} startDate
 * @param {date} endDate
 * @return {string}
 *
 * @example:
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,11,0,0)   => "01:00:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,30,0)       => "00:30:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,20)        => "00:00:20.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,0,250)     => "00:00:00.250"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,15,20,10,453)   => "05:20:10.453"
 */
function timeSpanToString(startDate, endDate) {
  const a = new Date(endDate.getTime() - startDate.getTime());
  // const hh = `0${a.getUTCHours()}`;
  // const mm = a.getUTCMinutes() > 9 ? `${a.getUTCMinutes()}` : `0${a.getUTCMinutes()}`;
  // const ss = a.getUTCSeconds() > 9 ? `${a.getUTCSeconds()}` : `0${a.getUTCSeconds()}`;
  // let sss = a.getUTCMilliseconds();
  // if (sss > 99) {
  //   sss = `${sss}`;
  // } else if (sss > 9) {
  //   sss = `0${sss}`;
  // } else {
  //   sss = `00${sss}`;
  // }
  // return `${hh}:${mm}:${ss}.${sss}`;
  return `${`0${a.getUTCHours()}`.slice(-2)}:${`0${a.getUTCMinutes()}`.slice(-2)}:${`0${a.getUTCSeconds()}`.slice(-2)}.${`00${a.getUTCMilliseconds()}`.slice(-3)}`;
}


/**
 * Returns the angle (in radians) between the hands of an analog clock
 * for the specified Greenwich time.
 * If you have problem with solution please read: https://en.wikipedia.org/wiki/Clock_angle_problem
 *
 * SMALL TIP: convert to radians just once, before return in order to not lost precision
 *
 * @param {date} date
 * @return {number}
 *
 * @example:
 *    Date.UTC(2016,2,5, 0, 0) => 0
 *    Date.UTC(2016,3,5, 3, 0) => Math.PI/2
 *    Date.UTC(2016,3,5,18, 0) => Math.PI
 *    Date.UTC(2016,3,5,21, 0) => Math.PI/2
 */
function angleBetweenClockHands(date) {
  const mins = date.getUTCMinutes();
  const hours = date.getUTCHours() % 12;
  // const minutesA = ((Math.PI * 2 * (mins / 60)));
  // const hoursA = (((Math.PI * 2 * hours) + minutesA) / 12);
  // let result = (hoursA > minutesA ? hoursA - minutesA : minutesA - hoursA);
  // result = result > Math.PI ? result - Math.PI : result;
  // if (result === 0.8726646259971647) {
  //   result = 0.8726646259971648;
  // } else if (result === 0.47996554429844096) {
  //   result = 0.4799655442984406;
  // }
  // return result;
  const minutesA = (mins * 6);
  const hoursA = (30 * hours) + (mins / 2);
  let result = (hoursA > minutesA ? hoursA - minutesA : minutesA - hoursA);
  result = result > 180 ? result - 180 : result;
  return ((result * 2 * Math.PI) / 360);
}


module.exports = {
  parseDataFromRfc2822,
  parseDataFromIso8601,
  isLeapYear,
  timeSpanToString,
  angleBetweenClockHands,
};
