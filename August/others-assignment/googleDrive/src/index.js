const express = require("express");
const bodyParser = require("body-parser");
const port = 8080;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require('cors')
app.use(cors())
const fs = require('fs');
const { join } = require("path");
const path = require('path')

var formidable = require('formidable');

app.post('/api/folder', (req, res) => {
    let location = decodeURI(req.body.location);
    let fileName = decodeURI(req.body.name);
    fs.mkdir(join(__dirname, 'drive', location, fileName), (e) => {
        //console.log(e)
        if (e) {

            return res.status(400).send()

        }
        else {

            return res.send({ message: "File Created" })
        }
    });

})

app.patch('/api/folder', (req, res) => {
    let location = req.body.location;
    let oldName = req.body.oldName;
    let newName = req.body.newName;
    fs.rename(join(__dirname, 'drive', location, oldName), join(__dirname, 'drive', location, newName), (e) => {
        //console.log(e)
        if (e) {
            return res.status(400).send({ message: "No such File" })
        }
        else {
            return res.send({ message: "Folder Renamed" })

        }
    })

})

app.delete('/api/folder', (req, res) => {
    let location = decodeURI(req.body.location);
    let fileName = decodeURI(req.body.name);
    fs.readdir(join(__dirname, 'drive', location, fileName), { withFileTypes: true }, (e) => {
        //console.log(e)

        if (e) {

            return res.status(400).send()
        }
        else
            fs.rmdir(join(__dirname, 'drive', location, fileName), { recursive: true }, (e) => {
                //console.log(e)
                if (e) {
                    res.status(400).send({ message: "folder not found" })
                }
                else {
                    res.status(200).send({ message: "sucessfully removed the folder" })
                }
            })
    })
})

app.get('/api/folder', (req, res) => {
    let location = decodeURI(req.query.location);
    fs.readdir(join(__dirname, 'drive', location), { withFileTypes: true }, (e, data) => {
        if (e) {
            return res.status(400).send()
        }
        else {
            let newData = []
            data.forEach(e => { newData.push({ name: e.name, isFile: e.isFile() }) })
            res.send(newData)
        }
    })

})

app.get('/api/file', (req, res) => {
    let location = req.query.location;
    let name = req.query.name;
    fs.readFile(join(__dirname, 'drive', location, name), (err, data) => {
        if (err) {
            // console.log('file not found')
            return res.status(400).send({ message: "file not found" })
        }
        else {
            res.send({ data: data.toString() })
        }
    })


})

app.post('/api/file', (req, res) => {

    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        var oldpath = files.file.path;

        var newpath = join(__dirname, 'drive', fields.location, fields.fileName);
        fs.readFile(join(__dirname, 'drive', fields.location, fields.fileName), (err, data) => {
            
            if (err && err.errno !== -2) {
                res.status(400).send({ message: 'failed to upload the file' })

            }
            else
                fs.copyFile(oldpath, newpath, function (err) {
                    console.log(err, "error in rename")

                    if (err) {
                        res.status(400).send({ message: 'failed to upload the file' })

                    }
                    else {
                        res.write('File uploaded and moved!');
                        res.end();
                    }
                });

        })




    })
})

app.patch('/api/file', (req, res) => {
    let location = decodeURI(req.body.location);
    let newName = decodeURI(req.body.newName);
    let oldName = decodeURI(req.body.oldName);

    fs.readFile(join(__dirname, 'drive', location, newName), (err, data) => {
        if (!err) {
            res.status(400).send({ message: 'failed to upload the file' })

        }
        else
            fs.rename(join(__dirname, "drive", location, oldName), join(__dirname, "drive", location, newName), (e) => {
                if (e) {
                    res.status(400).send({ message: "no such file" })
                } else {
                    res.status(200).send({ message: "sucessfully renamed." })
                }
            })
    })
})

app.delete('/api/file', (req, res) => {
    let location = req.body.location;
    let name = req.body.name;
    fs.unlink(join(__dirname, "drive", location, name), (e) => {
        if (e) {
            res.status(400).send({ message: "no such file" })
        } else {
            res.send({ message: "sucessfully deleted." })
        }
    })
})

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;   