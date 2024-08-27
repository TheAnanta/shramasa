import {
    UserRole,
    OrderStatus,
    DiscountType,
    PaymentMethod,
    PaymentStatus,
  } from "./enum";
  
  export interface DeletedUser {
    deleted_Id: string;
    name: string;
    email: string;
  }
  
  export interface User {
    userId: string;
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    avatarId?: string;
    addresses: Address[];
  }
  
  export interface Address {
    addressId: string;
    userId: string;
    houseNumber: string;
    floor: string;
    apartment: string;
    landmark: string;
    address: string;
    pincode: number;
    user: User;
  }
  
  export interface Category {
    categoryId: string;
    name: string;
    image: string;
  }
  
  export interface SubCategory {
    subCategoryId: string;
    name: string;
    image: string;
    categoryId: string;
  }
  
  export interface Product {
    productId: string;
    name: string;
    description: string;
    category: Category;
    subCategory: SubCategory;
    images: string[];
    ingredients: any[];
    discount: number;
    price: number[];
    howToUse: string;
    videoLink: string;
    rating: number;
    videoProvider: string;
    reviews: any[]; // Using `any[]` for JSON fields
    stock: number[];
    variants: string[];
  }
  
  export interface Cart {
    cartId: number;
    userId: string;
    items: any[]; // Using `any[]` for JSON fields
  }
  
  export interface Wishlist {
    userId: string;
    items: string[];
  }
  
  export interface Order {
    orderId: string;
    userId: string;
    items: any[]; // Using `any[]` for JSON fields
    status: OrderStatus;
    paymentId: string;
    payment: Payment;
    deliveryAddress: string;
    deliveryDate?: Date;
    orderDate: Date;
    couponCode?: string;
    discount?: number;
    discountType?: DiscountType;
    additionalInfo?: any; // Using `any` for JSON fields
  }
  
  export interface Payment {
    paymentId: string;
    amount: number;
    status: PaymentStatus;
    method?: PaymentMethod;
    paymentDetails?: any; // Using `any` for JSON fields
    Order: Order[];
  }
  
  export interface Coupon {
    couponId: string;
    code: string;
    discount: number;
    type: DiscountType;
    validTill: Date;
    isActive: boolean;
    maxDiscount: number;
    minCartValue: number;
  }
  