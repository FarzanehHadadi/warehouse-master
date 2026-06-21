import { useCallback } from 'react'

/**
 * Returns a color from Tailwind theme as `rgba()` string.
 * @param name - Tailwind color name, e.g., "airsa-400" or "success-500"
 * @param alpha - optional alpha value (0–1)
 */
export function useTailwindColor() {
    const getColor = useCallback((name: string, alpha = 1) => {
        if (typeof window === 'undefined') return `rgba(0,0,0,${alpha})` // SSR fallback

        // Convert 'airsa-400' → '--airsa-400'
        const variable = `--${name}`
        const value = getComputedStyle(document.documentElement).getPropertyValue(variable).trim()

        if (!value) return `rgba(0,0,0,${alpha})`

        return `rgba(${value}, ${alpha})`
    }, [])

    return getColor
}
