import nodemailer from "nodemailer";
import { WELCOME_EMAIL_TEMPLATE } from "./templates";


export const transpoerter= nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL!,
        pass: process.env.NODEMAILER_PASSWORD!,
    }
})

export const sendWelcomeEmail = async ({email, name, intro} : WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
    .replace('{{name}}', name)
    .replace('{{intro}}', intro);

    const mailOptions = {
        from: `"Signalist" <signalist@jsmastery.pro>`,
        to: email,
        subject: `Welcome to Signalst - Your stock market toolkit is ready!`,
        text: `Thanks for joining Signalist`,
        html: htmlTemplate,
    }

    await transpoerter.sendMail(mailOptions)
}