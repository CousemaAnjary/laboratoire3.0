"use server"
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'harmon.lakin@ethereal.email',
        pass: 'yajn1XM2SJgaHM8USb'
    }
})

export async function sendEmail({ to, subject, text }: { to: string; subject: string; text: string }) {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to,
            subject,
            text,
        })
        return { success: true }

    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", error)
    }
}