import type { Product, ProductList } from './../types/product.d';
import type { CategoryList } from '~/types/category';
// import { useFetch } from '#app';

export default() => {

    const router = useRouter();

    const config = useRuntimeConfig();
    const SPRINGAPI_URL = config.public.url;

    // read token from cookie
    const token = useCookie('token');

    // config header for require api
    const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token.value}`,
        // 'Content-Type': 'application/json'
    }

    // header for data form
    const headersFormData = {
        'Authorization': `Bearer ${token.value}`,
    }

    // function for product and check have token or not
    const fetchWithTokenCheck = async <T>(url: string, options: object) => {
        const response = await useFetch<T>(url, options);
        if(response.error.value && response.error.value.statusCode === 403){
            // if token expiration or incorrect redirect to login page
            router.push('/')
        }

        return response;
    }

    // read all category product
    const getAllCategories = () => {
        return fetchWithTokenCheck(
            `${SPRINGAPI_URL}/category`,
            {
                method: 'GET',
                headers: headers,
                cache: 'no-cache'
            }
        )
    }

    // // function for get all product data
    // const getAllProducts = async(page: number, limit: number) => {
    //     return fetchWithTokenCheck<ProductList>(
    //         `${SPRINGAPI_URL}/products?page=${page}&limit=${limit}`,
    //         {
    //             method: 'GET',
    //             headers: headers,
    //             cache: 'no-cache'
    //         }
    //     )
    // }

    // function สำหรับดึงข้อมูล product ทั้งหมด
    const getAllProducts = async(
        page: number, 
        limit: number, 
        searchQuery: string = '', 
        selectedCategory: number | null = null
    ) => {

        // สร้าง URL Parameters ตามค่าที่ได้รับ
        let url = `${SPRINGAPI_URL}/products?page=${page}&limit=${limit}`

        // ถ้ามีการค้นหา
        if(searchQuery) {
            url += `&searchQuery=${encodeURIComponent(searchQuery)}`
        }

        // ถ้ามีการเลือกหมวดหมู่
        if(selectedCategory !== null) {
            url += `&selectedCategory=${selectedCategory}`
        }

        return fetchWithTokenCheck<ProductList>(
            url, {
                method: 'GET',
                headers: headers,
                cache: 'no-cache'
            }
        )
    }

    // function get data product by id
    const getProductById = async(id: number) => {
        return fetchWithTokenCheck<any>(
            `${SPRINGAPI_URL}/products/${id}`,
            {
                method: 'GET',
                headers: headers,
                cache: 'no-cache'
            }
        )
    }

    // for add product data
    const createProduct = async(product: FormData) => {
        return useFetch(`${SPRINGAPI_URL}/products`,
            {
                method: 'POST',
                body: product,
                headers: headersFormData,
                cache: 'no-cache'
            }
        )
    }

    // function for update product data
    const updateProduct = async(id: number, product: FormData) => {
        return useFetch(`${SPRINGAPI_URL}/products/${id}`,
            {
                method: 'PUT',
                body: product,
                headers: headersFormData,
                cache: 'no-cache'
            }
        )
    }

        // function Delete data product by id
        const deleteProductById = async(id: number) => {
            return fetchWithTokenCheck<ProductList>(
                `${SPRINGAPI_URL}/products/${id}`,
                {
                    method: 'DELETE',
                    headers: headers,
                    cache: 'no-cache'
                }
            )
        }

    return{
        getAllProducts,
        getAllCategories,
        createProduct,
        getProductById,
        updateProduct,
        deleteProductById
    }
}