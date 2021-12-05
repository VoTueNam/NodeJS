//Contructor
//Những hàm ở đây trg Class này sẽ đc gọi ở route/
class SiteController{
    
    // GET / home
    home(req,res) {
        res.render('home');
    }

    // GET /search
    search(req, res) {
        res.render('search')
    }

    // GET 404
    error404(req, res, next) {
        res.status(404).render('404', { layout: 'nothing.hbs' })
    }
}

//Xuất class
module.exports = new SiteController;
