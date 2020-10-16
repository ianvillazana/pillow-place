export default function getDateTime() {
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const min = (today.getMinutes() < 10 ? "0" : "") + today.getMinutes();
  const sec = (today.getSeconds() < 10 ? "0" : "") + today.getSeconds();
  const time = today.getHours() + ":" + min + ":" + sec;
  return date + ' ' + time;
}
