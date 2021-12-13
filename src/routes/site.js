const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

// Tạo tuyến đường ở đây sau đó qua Controller viết hàm để gọi render
router.get('/search/:slug', siteController.error404);
router.get('/search', siteController.search);
router.get('/:slug', siteController.error404);
router.get('/', siteController.home);

module.exports = router;
