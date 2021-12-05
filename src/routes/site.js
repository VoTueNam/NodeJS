const express = require('express')
const router = express.Router()

const siteController = require('../app/controllers/SiteController')

// Tạo tuyến đường ở đây sau đó qua Controller viết hàm để gọi render
router.use('/search/:slug', siteController.error404)
router.use('/search', siteController.search)
router.use('/:slug', siteController.error404)
router.use('/', siteController.home)


module.exports = router