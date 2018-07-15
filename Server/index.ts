import * as express from "express";
import * as path from "path";
import * as http from "http";
import * as multer from "multer";
import * as bodyparser from "body-parser";

var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, "./uploads");
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
app.post("/post", (req, res) => {
	console.log(JSON.stringify(req.body));
});
app.post("/api/photo", (req, res) => {
	console.log(
		"Uploading file...",
		JSON.stringify(req.query),
		JSON.stringify(req.body)
	);
	upload(req, res, function(err) {
		if (err) {
			return res.end("Error uploading file.");
		}
		res.end("File is uploaded");
	});
});
app.get("*", (req, res) => {
	res.sendFile(path.resolve("./index.html"));
});

let server = httpServer.listen(80, () => {
	let host = server.address();
	console.log(`Server started : ${JSON.stringify(host)}`);
});
