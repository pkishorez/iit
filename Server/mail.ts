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
export function sendMail({ to, msg, subject }: any) {
	gmail
		.sendMail({
			from: "kishore.iiitn@gmail.com",
			to,
			subject: subject || "IIT Mail",
			text: msg,
			html: "<h1>rich text</h1>"
		})
		.then(() => console.log("Sent"))
		.catch(e => console.error(e.message));
}
