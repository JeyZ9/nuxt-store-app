export default defineNuxtRouteMiddleware((to, from) => {
    // read token from cookie
    const token = useCookie('token')
    
    // if haven't token redirect to login
    if(!token.value){
        return navigateTo('/')
    }

})
