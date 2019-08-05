export interface Product {
    id: number,
    orderNumber: number,
    code: string,
    name: string,
    status: string,
    condition: string,
    price: number,
    quantity: number,
    total: number,
    guaranty: boolean,
    invoice: boolean
}

// export interface Products {
//     userID: number,
//     productItem: ProductItem[]
// }