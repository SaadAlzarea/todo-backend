import "dotenv/config";
import nodemailer from "nodemailer";
export class EmailService {
    private transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    async sendEmail(to: string, subject: string, html: string) {
        await this.transporter.sendMail({
            from: `Todo App <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });
    }
}
