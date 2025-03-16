"use server"

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 587,
    auth: {
        user: '0d266b25542332',
        pass: '0667ba346bf7d4'
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