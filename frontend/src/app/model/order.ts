export class Order {
    orderId!: number;
    orderBy!: string;
    orderStatus!: string;
    products!: Bufcart[];
}

export class Bufcart {
    bufcartId!: number;
    orderId!: number;
    email!: string;
    dateAdded!: string;
    quantity!: number;
    price!: number;
    productId!: number;
    productname!: string;
}