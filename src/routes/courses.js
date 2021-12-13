const express = require('express');
const router = express.Router();

const coursesController = require('../app/controllers/courseController');

// Chữ slug viết thành chữ gì cũng đc ko quan trọng, quan trọng là dấu 2 chấm
router.get('/create', coursesController.create);
router.post('/store', coursesController.store);
router.get('/:slug', coursesController.show);
// router.get('/', newsController.index);

module.exports = router;
