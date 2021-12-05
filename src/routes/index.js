const newRouter = require('./news');
const siteRouter = require('./site');

function route(app) {
    //Có nhiều trang thì sẽ tạo controller riêng
    app.use('/news', newRouter);

    // Trang Home, Search và 404
    app.use('/', siteRouter);
}
//Export route để Index.js ở ngoài src sử dụng
module.exports = route;

//Code eroor404 ở dưới - kéo xuống

// //custom 404 Page trong ExpressJS
// app.use(function (req, res, next) {
//     res.status(404).render('404', { layout: 'nothing.hbs' })
//     //chỗ này là dùng cái custom layout ko dùng layout chính của handlebars nữa
// })
