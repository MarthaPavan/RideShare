const nodemailer = require('nodemailer');

class MailController {
    async sendMail(req, res) {
        // Create a transporter object using SMTP transport
        const transporter = nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER || 'nithineruventi@outlook.com',
                pass: process.env.SMTP_PASS || 'nithin@2003',
            },
        });

        const { email, feedback, satisfaction } = req.body;

        const htmlContent = `
            <h1>Feedback Received</h1>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Feedback:</strong> ${feedback}</p>
            <h2>Satisfaction Details:</h2>
            <ul>
                <li><strong>Cleanliness:</strong> ${satisfaction.cleanliness}</li>
                <li><strong>Comfort:</strong> ${satisfaction.comfort}</li>
                <li><strong>Driver Behavior:</strong> ${satisfaction.driverBehavior}</li>
                <li><strong>Overall Ride:</strong> ${satisfaction.overallRide}</li>
            </ul>
        `;

        const mailOptions = {
            from: process.env.SMTP_USER || 'nithineruventi@outlook.com',
            to: 'nithineruventi@gmail.com',
            subject: 'User Feedback',
            html: htmlContent,
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent:', info.response);
            res.status(200).send('Feedback sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        }
    }
}

module.exports = new MailController();
