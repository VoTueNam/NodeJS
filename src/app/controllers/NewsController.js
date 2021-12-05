//Contructor
//Những hàm ở đây trg Class này sẽ đc gọi ở route/
class NewsController{
    
    // GET / news
    index(req,res) {
        res.render('news');
    }

    // GET /news/:slug
    show(req, res) {
        res.send('News detail')
    }

    //Route - POST - News page
    //console.log(req.body)

    //Route - GET - News page
    //console.log(req.query)
}

//Xuất class
module.exports = new NewsController;
