const nodemailer = require('nodemailer');
const sanitizeHtml = require('sanitize-html');  // Corrected import

class MailController {
    // Use arrow functions to maintain 'this' context
    validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    sanitizeInput = (input) => {
        if (typeof input === 'string') {
            return sanitizeHtml(input.trim(), {
                allowedTags: [],
                allowedAttributes: {}
            });
        }
        return input;
    }

    createTransporter = () => {
        return nodemailer.createTransport({
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER || 'nithineruventi@outlook.com',
                pass: process.env.SMTP_PASS || 'nithin@2003'  // Replace with your actual password
            },
            tls: {
                ciphers: 'SSLv3',
                rejectUnauthorized: true
            }
        });
    }

    constructor() {
        this.transporter = this.createTransporter();
    }

    sendMail = async (req, res) => {
        try {
            const { senderName, senderEmail, feedback, satisfaction } = req.body;

            // Input validation
            if (!senderEmail || !feedback || !satisfaction) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            if (!this.validateEmail(senderEmail)) {
                return res.status(400).json({ error: 'Invalid email format' });
            }

            // Sanitize inputs
            const sanitizedName = this.sanitizeInput(senderName || 'Anonymous User');
            const sanitizedEmail = this.sanitizeInput(senderEmail);
            const sanitizedFeedback = this.sanitizeInput(feedback);
            const sanitizedSatisfaction = {
                cleanliness: this.sanitizeInput(satisfaction.cleanliness),
                comfort: this.sanitizeInput(satisfaction.comfort),
                driverBehavior: this.sanitizeInput(satisfaction.driverBehavior),
                overallRide: this.sanitizeInput(satisfaction.overallRide)
            };

            // Format current date and time
            const currentDate = new Date().toLocaleString('en-US', {
                timeZone: 'Asia/Kolkata',
                dateStyle: 'full',
                timeStyle: 'long'
            });

            const htmlContent = `
                <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Feedback Received</h1>
                    
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;">
                        <p style="margin: 5px 0;"><strong>Date:</strong> ${currentDate}</p>
                        <p style="margin: 5px 0;"><strong>Name:</strong> ${sanitizedName}</p>
                        <p style="margin: 5px 0;"><strong>Email:</strong> ${sanitizedEmail}</p>
                    </div>

                    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
                        <h2 style="color: #444; margin-top: 0;">Feedback</h2>
                        <p style="line-height: 1.6;">${sanitizedFeedback}</p>
                    </div>

                    <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">
                        <h2 style="color: #444; margin-top: 0;">Satisfaction Ratings</h2>
                        <ul style="list-style: none; padding: 0;">
                            <li style="margin: 10px 0; padding: 5px 0; border-bottom: 1px solid #eee;">
                                <strong>Cleanliness:</strong> ${sanitizedSatisfaction.cleanliness}
                            </li>
                            <li style="margin: 10px 0; padding: 5px 0; border-bottom: 1px solid #eee;">
                                <strong>Comfort:</strong> ${sanitizedSatisfaction.comfort}
                            </li>
                            <li style="margin: 10px 0; padding: 5px 0; border-bottom: 1px solid #eee;">
                                <strong>Driver Behavior:</strong> ${sanitizedSatisfaction.driverBehavior}
                            </li>
                            <li style="margin: 10px 0; padding: 5px 0;">
                                <strong>Overall Ride:</strong> ${sanitizedSatisfaction.overallRide}
                            </li>
                        </ul>
                    </div>
                </div>
            `;

            const mailOptions = {
                from: process.env.SMTP_USER || 'nithineruventi@outlook.com',
                replyTo: sanitizedEmail,
                to: 'nithineruventi@outlook.com',
                subject: `Feedback from ${sanitizedName}`,
                html: htmlContent,
                headers: {
                    'priority': 'high',
                    'x-feedback-source': 'Web Form'
                }
            };

            const info = await this.transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', info.messageId);
            
            return res.status(200).json({ 
                success: true, 
                message: 'Thank you for your feedback! We appreciate your input.'
            });

        } catch (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ 
                error: 'Error sending feedback', 
                message: process.env.NODE_ENV === 'development' ? error.message : 'Unable to send feedback. Please try again later.'
            });
        }
    }
}

// Export a single instance
module.exports = new MailController();
