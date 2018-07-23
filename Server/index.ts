import * as express from "express";
import * as path from "path";
import * as http from "http";
import * as multer from "multer";
import * as bodyparser from "body-parser";
import { Actions } from "./Database";
import * as fs from "fs";
import _ = require("lodash");
import { sendMail } from "./mail";

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
		console.log(JSON.stringify(req.body));
		// Check for existence of file here.
		const image = _.get(req.body, "images.userPhoto", undefined);
		if (!fs.existsSync(image)) {
			res.send({
				error: "Image not found."
			});
		} else {
			fs.copyFileSync(image, `./uploads/${req.body.id}_userPhoto`);
			(Actions.update(req.body) as any)
				.then(() => {
					res.send({
						data: "Successfully submited data."
					});
					sendMail({
						to: req.body.mail,
						subject: "Please review the work of so and so id here!"
					});
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

let server = httpServer.listen(80, () => {
	let host = server.address();
	console.log(`Server started : ${JSON.stringify(host)}`);
});
