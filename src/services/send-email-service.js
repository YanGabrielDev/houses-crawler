import nodemailer from 'nodemailer';
import { generateHTMLEmail } from '../utils/generateHTMlEmail.js'
export const sendEmail = async (houseslist) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.AUTH_EMAIL,
            pass: process.env.AUTH_PASS
        },
    });
    console.log({
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
    });

    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: 'yangabrielcruzeiro@gmail.com',
        subject: 'Houses crawler search',
        text: 'teste',
        html: generateHTMLEmail(houseslist)
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("E-mail enviado com sucesso!", info.response);
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
    }
}
