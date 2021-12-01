const path = require('path')
const express = require('express')
const morgan = require('morgan')
const hbs = require('express-handlebars')
const app = express()
const port = 3000

//toàn bộ tài nguyên trong public đều được share hết để bên ngoài có thể truy cập
app.use(express.static(path.join(__dirname, 'public')))

//Morgan dùng để xem log từ client về phía server
app.use(morgan('combined'))

//Temple engine
app.engine('hbs', hbs.engine({
  extname: '.hbs' //custom name extension của temple
}))
app.set('view engine', 'hbs')
//dùng để custom đường dẫn của handlebars theo ý mình
app.set('views',path.join(__dirname,'resources/views'))


// Route - GET - Home page
app.get('/', (req, res) => {
  res.render('home')
})

// Route - GET - News page
app.get('/news', (req, res) => {
  res.render('news')
})

// Route - GET - News page
app.get('/search', (req, res) => {
  //console.log(req.query)
  // dòng này để bắn ra mấy cái queue param nhận đc thông qua GET method
  // . thêm một lần nữa (.param ấy) để lấy đc value của thằng param này
  res.render('search')
})

//custom 404 Page
app.use(function (req, res, next) {
  res.status(404).render('404', { layout: 'nothing.hbs' })
  //chỗ này là dùng cái custom layout ko dùng layout chính của handlebars nữa
})

// log in console
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})