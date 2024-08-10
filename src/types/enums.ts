export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
}

export enum PaymentMethod {
  COD = "COD",
  UPI = "UPI",
  NETBANKING = "NETBANKING",
  CREDITCARD = "CREDITCARD",
  DEBITCARD = "DEBITCARD",
  WALLET = "WALLET",
}

export enum OrderStatus {
  INPROGRESS = "INPROGRESS",
  PROCESSING = "PROCESSING",
  CONFIRMED = "CONFIRMED",
  DISPATCHED = "DISPATCHED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export enum DiscountType {
  PERCENTAGE = "PERCENTAGE",
  AMOUNT = "AMOUNT",
}
