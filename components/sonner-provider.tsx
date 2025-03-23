"use client"

import { Toaster as SonnerToaster } from "sonner"
import { useTheme } from "next-themes"

export function SonnerProvider() {
    const { theme } = useTheme()

    return (
        <SonnerToaster
            position="bottom-right"
            theme={theme as "light" | "dark" | "system" | undefined}
            className="toaster-container"
            toastOptions={{
                classNames: {
                    toast: "group toast-root",
                    title: "toast-title",
                    description: "toast-description",
                    actionButton: "toast-action",
                    cancelButton: "toast-cancel",
                    success: "toast-success",
                    error: "toast-error",
                    info: "toast-info",
                    warning: "toast-warning",
                },
            }}
            closeButton
            richColors
        />
    )
}

