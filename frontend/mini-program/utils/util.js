const formatTime = date => {
  console.log('date', date)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//时间戳转换成日期时间
function formatUnixtime(unixtime) {
  var dateTime = new Date(parseInt(unixtime))
  var year = dateTime.getFullYear();
  var month = dateTime.getMonth() + 1;
  var day = dateTime.getDate();
  var hour = dateTime.getHours();
  var minute = dateTime.getMinutes();
  var second = dateTime.getSeconds();
  var now = new Date();
  var now_new = Date.parse(now.toDateString());  //typescript转换写法
  var milliseconds = now_new - dateTime;
  var timeSpanStr = year + '-' + month + '-' + day;
  return timeSpanStr;
}

function string2date(strTime = '2019-03-03') {
  return new Date(Date.parse(strTime.replace(/-/g, "/"))); 
}

function getDateString(start = '', during = 0) {
  if (!start) {
    return this.formatTime(new Date())
  }
  const startDate = +this.string2date(start);
  return this.formatTime(new Date(startDate + during * 1000 * 60 * 60 * 24))
}

module.exports = {
  formatTime: formatTime,
  formatUnixtime,
  string2date,
  getDateString,
}
