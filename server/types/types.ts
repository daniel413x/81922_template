export interface ICategory {
  id: string;
  name: string;
  public: boolean;
}

export interface IAddress {
  id: string;
  firstName: string;
  lastName: string;
  addressLineOne: string;
  addressLineTwo?: string;
  city: string;
  zip: string;
  state: string;
}

export interface IAddressForOrder extends IAddress {
  OrderId: string;
}

export interface IAddressInAddressBook extends IAddress {
  UserId: string;
  isDefault?: boolean;
}

export interface IUser {
  id: string;
  roles: string[];
  name?: string;
  email: string;
  password: string;
  avatar?: string;
  addresses?: IAddressInAddressBook[];
}

export interface IGuest {
  id: string;
}

export interface IFoodItem {
  id: string;
  name: string;
  price: string;
}

export type FoodItemInGuestCart = IFoodItem & {
  discount: string;
  time: [number, number];
  ingredients: string[];
  quantity: number;
  instructions: string;
}

export interface IFoodItemInMenu extends IFoodItem {
  image: string;
  time: [number, number];
  serves: number;
  discount?: string;
  ingredients: string[];
  CategoryId: string;
  category?: ICategory;
}

export interface IFoodItemInCart extends IFoodItem {
  time: [number, number];
  discount?: string;
  ingredients: string[];
  CartId: string;
  instructions?: string;
  quantity: number;
}

export type FoodItemInOrderCreationAttributes = Omit<FoodItemInGuestCart, 'id'> & {
  OrderId: string;
};

export interface IOrder {
  id: string;
  UserId?: string;
  AddressForOrderId: string;
  address?: IAddressForOrder;
  time: [number, number];
  foodItems?: IFoodItem[];
  status: number;
  activeOrder: boolean;
  date: string;
  total: number;
  actionLog: [string, string][];
}

export interface IRegisteredOrder {
}

export type OrderCreationAttributes = Omit<IOrder, 'id' | 'address' | 'foodItems'>;

export interface ICart {
  id?: string;
  userId: string;
  foodItems?: IFoodItem[];
}
