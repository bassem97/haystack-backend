const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const indexRouter = require('./routes/index');
const auth = require('./middlewares/auth');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// app.use(passport.initialize());
// app.use(passport.session());

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
app.get('/files/:name', async (req, res, next) => {
    const fileName = req.params.name;
    await res.sendFile(fileName, function (err) {
        console.log(err)
    });
});


mongoose.connect(
        //'mongodb+srv://haystack:haystack@cluster0.bwzed.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        'mongodb+srv://haystack:haystack@haystack.0ialh.mongodb.net/haystack?retryWrites=true&w=majority',
        {useUnifiedTopology: true ,  useNewUrlParser: true }
    )
    .then(result => {
        app.listen(8080);
        console.log("Running on 8080 !")
    })
    .catch(err => console.log(err));
