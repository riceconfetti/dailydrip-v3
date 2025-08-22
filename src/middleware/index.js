export function onRequest(context, next) {
    if (context.url.pathname.startsWith('/_server-islands')) {
        const searchParams = new URLSearchParams({'visual-editing': "true", token: process.env.PUBLIC_VE_TOKEN} )
        for (const [key, value] of searchParams) {
            context.url.searchParams.set(key, value)
        }
    }

    return next()
}