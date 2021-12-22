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
        var results
        var match
        if (match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
            results = match[1]
            // if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
            //     result = match[1]
            // }
        }
        results = 'http://' + results + '/';
        console.log(results);

        var jsonObj

        //check URL - virus total
        const hashed = nvt.sha256(results);
        const theSameKey = defaultTimedInstance.setKey('3603b9eebdd57284643ace954577ff8d2d6415c027d20c867a22d8c7597e5431');

        //print result from API
        const theSameObject = defaultTimedInstance.urlLookup(hashed, function (err, resp) {
            if (err) {
                console.log('Well, crap.');
                console.log(err);
                //res.send(err)
                return;
            }
            //console.log(resp);
            jsonObj = JSON.parse(resp)
            console.log('type of: ' + typeof jsonObj);

            var temp = jsonObj;
            temp = temp.data.attributes.last_analysis_results;


            //Get all engine name
            var engine = [];
            for (var k in temp) engine.push(k);
            console.log(engine)

            //Get all type
            const type = new Map();
            for (var k in engine) {
                type.set(temp[engine[k]].result, 1);

            }
            console.log(type)

            //Convert Map to Array
            let array = Array.from(type, ([name, value]) => ({ name, value }));


            //Get result for each engine
            const value = new Map();
            //var clean = malware = unrated = malicious = 1;
            for (var index in engine) {
                //Get number of type
                for (let count = 0; count < array.length; count++) {
                    //push type name and quantity of that type
                    if (temp[engine[index]].result == array[count].name) {
                        value.set(array[count].name, array[count].value++)
                    }
                }
            }

            var ketqua = '';

            let newArray = []

            for (let count = 0; count < array.length; count++) {
                
                newArray[array[count].name] = (Number(value.get(array[count].name)) / engine.length * 100).toFixed(2)
                
                console.log(array[count].name + " = " + (Number(value.get(array[count].name)) / engine.length * 100).toFixed(2) + "%")
                
                ketqua += array[count].name + " = " + (Number(value.get(array[count].name)) / engine.length * 100).toFixed(2) + "%"
            }

            console.log(newArray)

            // //return;

            res.send(ketqua);
        });
    }

    test(req, res, next) {

        //[ clean: '87.10', unrated: '11.83', phishing: '1.08' ]
        let newArray = [ ['clean', '87.10'], ['unrated', '11.83'], ['phishing', '1.08'] ]
        res.render('result', {
            array: newArray
        })
    }
}

//Xuất class
module.exports = new SiteController();
