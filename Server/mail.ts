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
			from: "iit.inyas@gmail.com",
			to,
			subject: subject || "IIT Mail",
			html: `${msg}`
		})
		.catch(e => e.message);
}
