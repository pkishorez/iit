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
import { hashSync } from "bcrypt";
import { Schema } from "classui/Components/Form/Schema";
import { Details } from "../common/schema";

var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, "/tmp/");
	},
	filename: function(req, file, callback) {
		callback(null, file.fieldname + "-" + Date.now());
	}
});
var upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024
	}
}).single("userPhoto");

let app = express();

let httpServer = new http.Server(app);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("./"));

app.post("/api/photo", upload, (req, res) => {
	res.send({
		data: req.file.path
	});
});

app.post("/api/submit", (req, res) => {
	try {
		// Check for existence of file here.
		const data = { ...req.body };
		const error = Schema.validate(Details, data);
		if (error) {
			res.send({
				error
			});
			return;
		}
		const image = _.get(req.body, "images.userPhoto", undefined);
		Actions.get(req.body.id)
			.then((d: any) => {
				// Data found.
				update(d, true);
			})
			.catch(() => {
				update({}, false);
			});

		const update = (data: any, newone?: boolean) => {
			if (
				!(
					(image && fs.existsSync(image)) ||
					fs.existsSync(`./uploads/${data.mobile_number}.pdf`)
				)
			) {
				res.send({
					error: "Resume not found. Please upload."
				});
			} else {
				if (image) {
					fs.copyFileSync(
						image,
						`./uploads/${req.body.mobile_number}.pdf`
					);
				}
				(Actions.update({
					...req.body,
					image
				}) as any)
					.then(() => {
						// id===req.body.id means new one!
						if (newone) {
							sendMail({
								to: req.body.id,
								msg: `
								Hello ${req.body.name},<br/>
								<h4>INYAS Registration Successful.</h4>
								You can access details at : http://www.inyasmembership.com/showDetails/${
									req.body.id
								}
								<br/>
								A separate mail will be sent to the referred email ids for comments.
								`,
								subject:
									"INYAS : Details successfully registered!"
							})
								.then(() => {
									res.send({
										data: {
											msg:
												"Successfully submited data. Please find your registration id at the mail sent.",
											id: req.body.id
										}
									});
								})
								.catch(() => {});
						} else {
							res.send({
								data: {
									msg: "Successfully updated data.",
									id: req.body.id
								}
							});
						}
					})
					.catch((e: any) =>
						res.send({
							error: e
						})
					);
			}
		};
	} catch (e) {
		console.log(e);
		res.send({
			error: e.message
		});
	}
});
app.get("/api/getDetails/:id", (req, res) => {
	const id = req.params.id;
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
