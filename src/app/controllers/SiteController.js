// Để tương tác với Model từ controller
const Course = require('../models/Course');
const User = require('../models/User');


//API virus total
const nvt = require('node-virustotal');
const defaultTimedInstance = nvt.makeAPI();


//Contructor
//Những hàm ở đây trg Class này sẽ đc gọi ở route/
class SiteController {
    // GET / home
    home(req, res, next) {

        //Cái tham số thứ 2 đặt là gì cũng đc ko ảnh hưởng, nó gần giống với biến res thôi
        // Course.find({}, function (err, cc) {
        //     if (!err) {
        //         res.json(cc);
        //     } else {
        //         next(err);
        //     }
        // });

        //Cái này là viết theo dạng promise - ở trên là dạng callback
        Course.find({}).lean()//thêm chấm lean() vào để fix lỗi handlebar
            //truyền dữ liệu từ DB vào hbs - truyền vào đối số thứ 2
            .then(cc => res.render('home', {
                courses: cc
            }))
            .catch(next);


        // res.render('home');
    }

    // GET /search
    search(req, res) {
        res.render('search');
    }

    // GET 404
    error404(req, res, next) {
        res.status(404).render('404', { layout: 'nothing.hbs' });
    }

    //POST - result
    result(req, res, next) {
        

        var url = req.body.q
        var result
        var match
        if (match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
            result = match[1]
            if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
                result = match[1]
            }
        }
        result = 'http://' + result+'/';
        console.log(result);

        var jsonObj

        //check URL - virus total
        const hashed = nvt.sha256(result);
        const theSameKey = defaultTimedInstance.setKey('3603b9eebdd57284643ace954577ff8d2d6415c027d20c867a22d8c7597e5431');

        //print result from API
        const theSameObject = defaultTimedInstance.urlLookup(hashed, function(err, resp){
            if (err) {
              console.log('Well, crap.');
                console.log(err);
                //res.send(err)
              return;
            }
            res.json(resp.data)
            console.log(resp);
            jsonObj = JSON.parse(resp)
            console.log('type of: ' + typeof jsonObj);
            return;
        });
        //console.log('type of: '+typeof resp);
        

    }
}

//Xuất class
module.exports = new SiteController();
