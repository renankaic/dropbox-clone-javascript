var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {

	res.render('index', { title: 'Express' });

});

router.delete('/file', (req, res) => {

	//Using formidable to upload files
	let form = new formidable.IncomingForm({
		uploadDir: "./upload",
		keepExtensions: true
	});

	form.parse(req, (error, fields, files) => {

		//Generates the path
		let path = "./" + fields.path;

		//Checks if the file exists in the mentioned path above
		if (fs.existsSync(path)){

			//Tries to remove the file in the path
			fs.unlink(path, err => {

				//Returns any error to the client
				if (err) {

					res.status(400).json({
						err
					});

				} else {

					//Returns the data about the deleted file
					res.json({
						fields
					});

				}

			});

		}

	});

});

router.post('/upload', (req, res) => {

	//Using formidable to upload files
	let form = new formidable.IncomingForm({
		uploadDir: "./upload",
		keepExtensions: true
	});

	form.parse(req, (error, fields, files) => {

		res.json({
			files
		});

	});

});

module.exports = router;