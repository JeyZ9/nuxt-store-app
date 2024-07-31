export default() => {

    const router = useRouter();

    const config = useRuntimeConfig();
    const SPRINGAPI_URL = config.public.url;
    const SPRINGAPI_IMAGE = config.public.urlImage;

    // read token from cookie
    const token = useCookie('token');

    // config header for require api
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token.value}`,
        // 'Content-Type': 'application/json'
    }

    // function for product and check have token or not
    const fetchWithTokenCheck = async <T>(url: any, options: any) => {
        const response = await useFetch(url, options);
        if(response.error.value && response.error.value.statusCode === 403){
            // if token expiration or incorrect redirect to login page
            router.push('/')
        }

        return response;
    }

    // function for get all product data
    const getAllProducts = async(page: number, limit: number) => {
        return fetchWithTokenCheck<any>(
            `${SPRINGAPI_URL}/products?page=${page}&limit=${limit}`,
            {
                method: 'GET',
                headers: headers,
                cache: 'no-cache'
            }
        )
    }

    return{
        getAllProducts
    }
}