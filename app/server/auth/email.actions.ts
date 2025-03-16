"use server"

import React from 'react'
import nodemailer from 'nodemailer'
import Email from '@/src/components/email'
import { render } from '@react-email/components'


const transporter = nodemailer.createTransport({
    host: 'sandbox.smtp.mailtrap.io',
    port: 587,
    auth: {
        user: '0d266b25542332',
        pass: '0667ba346bf7d4'
    }
})


export async function sendEmail({ to, subject, otp }: { to: string; subject: string; otp: string }) {
    try {
        // 📨 Générer le contenu HTML de l'email
        const emailHtml = await render(React.createElement(Email, { verificationCode: otp }))


        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to,
            subject,
            html: emailHtml,
        })
        return { success: true }

    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email :", error)
    }
}