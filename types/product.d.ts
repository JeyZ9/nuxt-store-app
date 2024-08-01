export interface Product {
    id: number
    productName: string
    unitPrice: number
    unitStock: number
    productPicture: string
    categoryId: number
    categoryName: string
    createDate: string // ISO date string
    modifiedDate: string | null // ISO date string or null
  }
  export interface ProductList {
    total: number
    products: Product[]
  }