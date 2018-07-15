import * as nm from "nodemailer";

const gmail = nm.createTransport({
	secure: true,
	host: "smtp.gmail.com",
	port: 465,
	auth: {
		user: "kishore.iiitn@gmail.com",
		pass: "Iaagb.123"
	}
});
gmail
	.sendMail({
		from: "kishore.iiitn@gmail.com",
		to: "kishore.iiitn@gmail.com",
		subject: "Sample mail",
		text: "Hello WOrld.",
		html: "<h1>rich text</h1>"
	})
	.then(() => console.log("Sent"))
	.catch(e => console.error(e.message));
