const path = require('path')
const express = require('express')
const morgan = require('morgan')
const hbs = require('express-handlebars')
const app = express()
const port = 3000


const route = require('./routes');

//toàn bộ tài nguyên trong public đều được share hết để bên ngoài có thể truy cập
app.use(express.static(path.join(__dirname, 'public')))

//milldeware này để nhận diện người dùng gửi dữ liệu lên server (thông qua POST)
app.use(express.urlencoded({
  extended: true // dùng để fix warning: body-parser deprecated undefined extended: provide extended option src\index.js
}))
app.use(express.json())

//Morgan dùng để xem log từ client về phía server
//app.use(morgan('combined'))

//Temple engine
app.engine('hbs', hbs.engine({
  extname: '.hbs' //custom name extension của temple
}))
app.set('view engine', 'hbs')
//dùng để custom đường dẫn của handlebars theo ý mình
app.set('views', path.join(__dirname, 'resources/views'))


// Route init - khởi tạo tuyến đường
route(app)

// log in console
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})