const express = require('express');
const router = express.Router();

const newsController = require('../app/controllers/NewsController');

// Tạo tuyến đường ở đây sau đó qua Controller viết hàm để gọi
router.get('/:slug', newsController.show);
router.get('/', newsController.index);

module.exports = router;
