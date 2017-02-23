let express = require('express')
let app = express()
let port = 3000

app.use(express.static(__dirname + '/dist'))

app.get('/*', function (req, res) {
  res.redirect('/')
})

app.listen(port)

console.log(`Server listening in port ${port}`)
