import * as nm from "nodemailer";

const gmail = nm.createTransport({
	secure: true,
	host: "smtp.gmail.com",
	port: 465,
	auth: {
		user: "iit.inyas@gmail.com",
		pass: "rgukt123"
	}
});
export function sendMail({ to, msg, subject }: any) {
	return gmail
		.sendMail({
			from: "kishore.iiitn@gmail.com",
			to,
			subject: subject || "IIT Mail",
			html: `<h1>${msg}</h1>`
		})
		.catch(e => e.message);
}
