// /api/contact.js
import { setApiKey, send } from '@sendgrid/mail';

export default async (req, res) => {
	setApiKey(process.env.SENDGRID_API_KEY);

	const { name, email, message } = req.body;

	const content = {
		to: 'rubendfraga@gmail.com',
		from: email,
		subject: `New Message From ${name}`,
		text: message,
		html: `<p>${message}</p>`
	};

	try {
		await send(content);
		res.status(200).send('Message sent successfully.');
	} catch (error) {
		console.log('ERROR', error);
		res.status(400).send('Message not sent.');
	}
};