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

    //Get - me/trash/courses
    trash(req, res, next) {
        //findDeleted này là func của mongoogse-delete
        Course.findDeleted({}).lean()
        .then(cc => {
            res.render('me/trashCourse', {
                course:cc
            });
        })
        .catch(next);
    }

}

//Xuất class
module.exports = new meController();
