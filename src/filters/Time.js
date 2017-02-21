
export default function (time) {
  let date = new Date(time)
  return date.getMinutes() + ':' + date.getSeconds()
}
