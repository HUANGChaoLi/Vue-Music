class Resource {
  searchByKeyword (http, keyword, callback) {
    http.jsonp('http://api.dagoogle.cn/music/search?keyword=' + keyword)
    .then(function (res) {
      callback(null, res.body.data)
    }, function () {
      callback(new Error('网络错误'))
    })
  }
  searchUrlByHash (http, hash, callback) {
    http.jsonp('http://m.kugou.com/app/i/getSongInfo.php?hash=' + hash + '&cmd=playInfo&format=jsonp')
    .then(function (res) {
      callback(null, res.body.url)
    }, function () {
      callback(new Error('网络错误'))
    })
  }
}

export default new Resource()
