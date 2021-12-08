// Để tương tác với Model từ controller
const Course = require('../models/Course');
const User = require('../models/User');


//Contructor
//Những hàm ở đây trg Class này sẽ đc gọi ở route/
class SiteController {
    // GET / home
    home(req, res) {

        //Cái tham số thứ 2 đặt là gì cũng đc ko ảnh hưởng, nó gần giống với biến res thôi
        Course.find({}, function (err, cc) {
            if (!err) {
                res.json(cc);
            } else {
                res.status(400), json({ error: 'ERROR!!!' });
            }
        });
        
        // res.render('home');
    }

    // GET /search
    search(req, res) {
        User.find({}, function (err, cc) {
            if (!err) {
                res.json(cc);
            } else {
                res.status(400), json({ error: 'ERROR!!!' });
            }
        });
        // res.render('search');
    }

    // GET 404
    error404(req, res, next) {
        res.status(404).render('404', { layout: 'nothing.hbs' });
    }
}

//Xuất class
module.exports = new SiteController();
