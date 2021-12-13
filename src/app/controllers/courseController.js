// Để tương tác với Model từ controller
const Course = require('../models/Course');


class SiteController {

    // GET 
    show(req, res, next) {
        Course.findOne({ flag: req.params.slug }).lean()
            .then(cc => {
                res.render('courses/show', {
                    course:cc
                });
            })
            .catch(next);
    }

    //Get Create - chỗ này là thêm dữ liệu vào DB
    create(req, res, next) {
        res.render('courses/create');
    }

    //POST Store - chỗ này là thêm dữ liệu vào DB
    store(req, res, next) {

        //chạy 2 thằng này là dữ liệu từ Post sẽ đc lưu vào DB
        const cou = new Course(req.body);
        cou.save();
        res.render('courses/store');
    }

    // GET 404
    error404(req, res, next) {
        res.status(404).render('404', { layout: 'nothing.hbs' });
    }
}

//Xuất class
module.exports = new SiteController();
