import nodemailer from 'nodemailer';

// Configuration du service email (utiliser un vrai service en production)
const transporter = nodemailer.createTransport({
    service: "gmail", // ex : "gmail", "sendgrid" , "mailgun", "smtp" etc...
    auth: {
        user: process.env.EMAIL_USER, // Ton email (ex: "monemail@gmail.com")
        pass: process.env.EMAIL_PASSWORD, // Ton mot de passe (ex: "monmotdepasse")
    }
})

export async function sendEmail({ to, subject, text }: { to: string; subject: string; text: string }) {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER, 
            to,
            subject,
            text,
        })
        return { success: true }

    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", error)
    }
}