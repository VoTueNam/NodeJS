const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');

// Tạo tuyến đường ở đây sau đó qua Controller viết hàm để gọi render
router.post('/search/result', siteController.result);
router.get('/search/:404', siteController.error404);
router.get('/search', siteController.search);
router.get('/:404', siteController.error404);
router.get('/', siteController.home);

module.exports = router;
