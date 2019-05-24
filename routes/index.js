var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {

	res.render('index', { title: 'Express' });

});

router.get('/file', (req, res) => {

	let path = "./" + req.query.path;

	//Check if the file exists
	if (fs.existsSync(path)){

		//Tries to read the file
		fs.readFile(path, (err, data) => {

			if (err){

				//If any error, shows in the log
				console.error(err);
				res.status(400).json({
					error: err
				});

			} else {

				//Shows the file
				res.status(200).end(data);

			}

		});

	} else {

		res.status(404).json({
			error: "File not found"
		});

	}

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

		} else {

			res.status(404).json({
				error: "File not found"
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