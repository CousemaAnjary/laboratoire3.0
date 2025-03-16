import { create } from "zustand"

const OTP_EXPIRATION_TIME = 600 // 10 minutes
const RESEND_COOLDOWN_TIME = 30 // 30 secondes

interface OtpState {
    timeLeft: number
    resendCooldown: number
    startTimer: () => void
    startCooldown: () => void
    resetOtpTimer: () => void
}


export const useOtpStore = create<OtpState>((set, get) => ({
    timeLeft: OTP_EXPIRATION_TIME,
    resendCooldown: 0,

    // Démarrer le compte à rebours du code OTP
    startTimer: () => {
        set({ timeLeft: OTP_EXPIRATION_TIME })
        const timer = setInterval(() => {
            const currentTime = get().timeLeft
            if (currentTime <= 1) {
                clearInterval(timer)
                set({ timeLeft: 0 })
            } else {
                set({ timeLeft: currentTime - 1 })
            }
        }, 1000)
    },

    // Démarrer le cooldown avant renvoi d'OTP
    startCooldown: () => {
        set({ resendCooldown: RESEND_COOLDOWN_TIME })
        const timer = setInterval(() => {
            const currentCooldown = get().resendCooldown
            if (currentCooldown <= 1) {
                clearInterval(timer)
                set({ resendCooldown: 0 })
            } else {
                set({ resendCooldown: currentCooldown - 1 })
            }
        }, 1000)
    },

    // Réinitialiser le timer après un renvoi d'OTP
    resetOtpTimer: () => {
        set({ timeLeft: OTP_EXPIRATION_TIME })
    },
}))