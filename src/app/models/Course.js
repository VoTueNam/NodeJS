const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Tạo 1 model mới - có temple
const Course = new Schema({
    name: {type: String, maxlength: 255 },
    description: {type: String, maxlength: 600},
    img: { type: String },
    flag: {type: String, maxlength: 255},
    createDate: {type: Date, default: Date.now},
})//trong model này có nhiều loại ràng buộc có thể set thêm

//export model ra - nếu trg DB chưa có thì khi gọi Model này thì cũng sẽ tạo thêm dựa trên temple của model đó
module.exports = mongoose.model('course', Course);
//Thêm một tiền tố thứ 3 để chỉ định Collection
//Tiền tố thứ 1 dùng để chỉ định Collection nào đc map tới Model đó (đéo hiểu sao ko có s vẫn đúng)
//Tiền tố thứ 1 cũng chẳng phân biệt hoa thường