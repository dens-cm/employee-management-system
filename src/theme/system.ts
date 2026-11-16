import { createSystem, defaultConfig } from '@chakra-ui/react'

const fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"

export const system = createSystem(defaultConfig, {
    theme: {
        tokens: {
            fonts: {
                heading: { value: fontFamily },
                body: { value: fontFamily },
            },
        },
        semanticTokens: {
            radii: {
                l1: { value: '{radii.sm}' },
                l2: { value: '{radii.sm}' },
                l3: { value: '{radii.sm}' },
            },
        },
    },
})
