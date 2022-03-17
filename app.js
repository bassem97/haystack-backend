const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const indexRouter = require('./routes/index');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/', indexRouter);

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({
    uploadDir: './files'
});

app.post('/uploads', multipartMiddleware, (req, res) => {
    console.log(req.files);
    res.json({
        'message': 'File uploaded succesfully.',
        'name': req.files.uploads[0].path.split("\\")[1]
    });
});

app.use('/files', express.static('files'));
app.get('/files/:name', function (req, res, next) {
    const fileName = req.params.name;
    res.sendFile(fileName, function (err) {console.log(err)}); });


mongoose.connect(
        'mongodb+srv://haystack:haystack@cluster0.bwzed.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useUnifiedTopology: true ,  useNewUrlParser: true }
    )
    .then(result => {
        app.listen(8080);
        console.log("Running !")
    })
    .catch(err => console.log(err));
