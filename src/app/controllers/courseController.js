// Để tương tác với Model từ controller
const Course = require('../models/Course');


class SiteController {

    // GET 
    show(req, res, next) {
        Course.findOne({ flag: req.params.slug }).lean()
            .then(cc => {
                res.render('courses/show', {
                    course: cc
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

        const formData = req.body;//Nhận dữ liệu từ request post lưu vào biến
        //res.send(req.body)
        //chạy 2 thằng này là dữ liệu từ Post sẽ đc lưu vào DB
        const cou = new Course(formData);
        cou.save();
        res.render('courses/store');
    }

    //Get Edit - /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id).lean()
            .then(cc => res.render('courses/edit', {
                course:cc
            }))
            .catch(next)
    }

    //Put update - /course/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
        .then(()=> res.redirect('/me/stored/courses'))
        .catch(next)
    }

    // GET 404
    error404(req, res, next) {
        res.status(404).render('404', { layout: 'nothing.hbs' });
    }
}

//Xuất class
module.exports = new SiteController();
