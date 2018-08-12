import * as express from "express";
import * as path from "path";
import * as http from "http";
import * as multer from "multer";
import * as bodyparser from "body-parser";
import { Actions } from "./Database";
import * as fs from "fs";
import _ = require("lodash");
import { sendMail } from "./mail";
import { v4 } from "uuid";

var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, "/tmp/");
	},
	filename: function(req, file, callback) {
		callback(null, file.fieldname + "-" + Date.now());
	}
});
var upload = multer({ storage: storage }).single("userPhoto");

let app = express();

let httpServer = new http.Server(app);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("./"));

app.post("/api/photo", upload, (req, res) => {
	console.log("Uploading file...", JSON.stringify(req.file));
	res.send({
		data: req.file.path
	});
});

app.post("/api/submit", (req, res) => {
	try {
		// Check for existence of file here.
		const image = _.get(req.body, "images.userPhoto", undefined);
		const id = v4().replace(/-/g, "");
		req.body.id = _.get(req.body, "id", id);
		if (
			!(
				(image && fs.existsSync(image)) ||
				fs.existsSync(`./uploads/${req.body.id}_resume.pdf`)
			)
		) {
			res.send({
				error: "Resume not found. Please upload."
			});
		} else {
			fs.copyFileSync(image, `./uploads/${req.body.id}_resume.pdf`);
			(Actions.update(req.body) as any)
				.then(() => {
					if (id === req.body.id) {
						sendMail({
							to: req.body.mail,
							subject:
								"Please review the work of so and so id here!"
						}).then(() => {
							res.send({
								data:
									"Successfully submited data. Please find your registration id at the mail sent."
							});
						});
					} else {
						res.send({
							data: "Details successfully updated!"
						});
					}
				})
				.catch((e: any) =>
					res.send({
						error: e
					})
				);
		}
	} catch (e) {
		res.send({
			error: e.message
		});
	}
});
app.get("/api/getDetails/:id", (req, res) => {
	const id = req.params.id;
	console.log(JSON.stringify(id));
	res.setHeader("Content-Type", "application/json");
	if (id === "all" || !id) {
		Actions.getAll()
			.then((data: any) => {
				res.send({ data: data || [] });
			})
			.catch(() => {
				res.send({ data: [] });
			});
	} else {
		Actions.get(id)
			.then((data: any) => {
				res.send({ data: data || {} });
			})
			.catch(() => {
				res.send({ data: {} });
			});
	}
});
app.get("*", (req, res) => {
	res.sendFile(path.resolve("./index.html"));
});

let server = httpServer.listen(8080, () => {
	let host = server.address();
	console.log(`Server started : ${JSON.stringify(host)}`);
});
