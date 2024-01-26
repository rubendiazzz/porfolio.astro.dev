import { setApiKey, send } from '@sendgrid/mail';

export default async (req, res) => {
	if (!process.env.SENDGRID_API_KEY) {
		return res.status(500).send('SendGrid API key not configured.');
	}

	setApiKey(process.env.SENDGRID_API_KEY);

	const { name, email, message } = req.body;

	// Ensure that 'email' is a verified sender in your SendGrid account
	const content = {
		to: 'rubendfraga@gmail.com',
		from: 'your-verified-email@example.com', // Use a verified sender email
		subject: `New Message From ${name}`,
		text: `From: ${email}, Message: ${message}`,
		html: `<p>From: ${email}, Message: ${message}</p>`
	};

	try {
		await send(content);
		res.status(200).send('Message sent successfully.');
	} catch (error) {
		console.error('ERROR', error);
		// Send back a more informative error message in development
		res.status(500).send(`Message not sent. Error: ${error.message}`);
	}
};
