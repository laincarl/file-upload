const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const pathLib = require('path');
const app = express();

// 跨域设置
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
// body-parser 用于解析post数据  application/x-www.form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// multer 用于解析post文件  multipart/form-data
// var objMulter = multer({dest: './dist'}).array('file');
// 或者 var objMulter = multer({dest: './dist'}).any();
app.use(multer({ dest: './dist' }).array('file'));  //此处的array('file')对应html部分的name
// app.use(objMulter );

app.post('/file_upload', function (req, res) {
  console.log(req.files[0]);
  fs.readFile(req.files[0].path, function (err, data) {
    if (err) {
      console.log('Error');
    } else {
      var dir_file = __dirname + '/' + req.files[0].originalname
      // console.log(dir_file);
      fs.writeFile(dir_file, data, function (err) {
        var obj = {
          msg: 'upload success',
          filename: req.files[0].originalname
        }
        console.log(obj);
        res.send(JSON.stringify(obj));
      })
    }
  })
})
var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server is running at http://localhost:8081');
})