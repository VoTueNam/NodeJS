const Course = require('../models/Course');

class meController {

    //Get Store - /me/stored/courses
    store(req, res, next) {
            Course.find({}).lean()
            .then(cc => {
                res.render('me/storeCourse', {
                    course:cc
                });
            })
            .catch(next);
    }

}

//Xuất class
module.exports = new meController();
