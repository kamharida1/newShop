import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

export enum OrderStatus {
  NEW = "NEW",
  READY_FOR_PICKUP = "READY_FOR_PICKUP",
  PICKED_UP = "PICKED_UP",
  COMPLETED = "COMPLETED",
  ACCEPTED = "ACCEPTED"
}

export enum PurposeEnum {
  VARIANT = "VARIANT",
  FEATURE = "FEATURE",
  PRODUCT_DETAILS_TEXT = "PRODUCT_DETAILS_TEXT",
  PRODUCT_DETAILS_SELECT = "PRODUCT_DETAILS_SELECT"
}

type EagerDetailsJson = {
  readonly key?: string | null;
  readonly value?: string | null;
}

type LazyDetailsJson = {
  readonly key?: string | null;
  readonly value?: string | null;
}

export declare type DetailsJson = LazyLoading extends LazyLoadingDisabled ? EagerDetailsJson : LazyDetailsJson

export declare const DetailsJson: (new (init: ModelInit<DetailsJson>) => DetailsJson)

type EagerPaymentMethod = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PaymentMethod, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly type?: string | null;
  readonly cardNumber?: string | null;
  readonly expirationDate?: string | null;
  readonly cvv?: string | null;
  readonly userID: string;
  readonly User?: User | null;
  readonly Order?: Order | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly paymentMethodOrderId?: string | null;
}

type LazyPaymentMethod = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PaymentMethod, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly type?: string | null;
  readonly cardNumber?: string | null;
  readonly expirationDate?: string | null;
  readonly cvv?: string | null;
  readonly userID: string;
  readonly User: AsyncItem<User | undefined>;
  readonly Order: AsyncItem<Order | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly paymentMethodOrderId?: string | null;
}

export declare type PaymentMethod = LazyLoading extends LazyLoadingDisabled ? EagerPaymentMethod : LazyPaymentMethod

export declare const PaymentMethod: (new (init: ModelInit<PaymentMethod>) => PaymentMethod) & {
  copyOf(source: PaymentMethod, mutator: (draft: MutableModel<PaymentMethod>) => MutableModel<PaymentMethod> | void): PaymentMethod;
}

type EagerShippingAddress = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ShippingAddress, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly address?: string | null;
  readonly subAddress?: string | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly zipCode?: string | null;
  readonly country?: string | null;
  readonly selected?: boolean | null;
  readonly userID: string;
  readonly User?: User | null;
  readonly Location?: Location | null;
  readonly Order?: Order | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly shippingAddressLocationId?: string | null;
  readonly shippingAddressOrderId?: string | null;
}

type LazyShippingAddress = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ShippingAddress, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly address?: string | null;
  readonly subAddress?: string | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly zipCode?: string | null;
  readonly country?: string | null;
  readonly selected?: boolean | null;
  readonly userID: string;
  readonly User: AsyncItem<User | undefined>;
  readonly Location: AsyncItem<Location | undefined>;
  readonly Order: AsyncItem<Order | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly shippingAddressLocationId?: string | null;
  readonly shippingAddressOrderId?: string | null;
}

export declare type ShippingAddress = LazyLoading extends LazyLoadingDisabled ? EagerShippingAddress : LazyShippingAddress

export declare const ShippingAddress: (new (init: ModelInit<ShippingAddress>) => ShippingAddress) & {
  copyOf(source: ShippingAddress, mutator: (draft: MutableModel<ShippingAddress>) => MutableModel<ShippingAddress> | void): ShippingAddress;
}

type EagerBillingAddress = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BillingAddress, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly email?: string | null;
  readonly Phone?: string | null;
  readonly isTheSameAsShipping?: boolean | null;
  readonly User?: User | null;
  readonly Location?: Location | null;
  readonly address?: string | null;
  readonly subAddress?: string | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly zipCode?: string | null;
  readonly country?: string | null;
  readonly Order?: Order | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly billingAddressUserId?: string | null;
  readonly billingAddressLocationId?: string | null;
  readonly billingAddressOrderId?: string | null;
}

type LazyBillingAddress = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BillingAddress, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly email?: string | null;
  readonly Phone?: string | null;
  readonly isTheSameAsShipping?: boolean | null;
  readonly User: AsyncItem<User | undefined>;
  readonly Location: AsyncItem<Location | undefined>;
  readonly address?: string | null;
  readonly subAddress?: string | null;
  readonly city?: string | null;
  readonly state?: string | null;
  readonly zipCode?: string | null;
  readonly country?: string | null;
  readonly Order: AsyncItem<Order | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly billingAddressUserId?: string | null;
  readonly billingAddressLocationId?: string | null;
  readonly billingAddressOrderId?: string | null;
}

export declare type BillingAddress = LazyLoading extends LazyLoadingDisabled ? EagerBillingAddress : LazyBillingAddress

export declare const BillingAddress: (new (init: ModelInit<BillingAddress>) => BillingAddress) & {
  copyOf(source: BillingAddress, mutator: (draft: MutableModel<BillingAddress>) => MutableModel<BillingAddress> | void): BillingAddress;
}

type EagerLocation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Location, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly ShippingClass?: ShippingClass | null;
  readonly BillingAddress?: BillingAddress | null;
  readonly User?: User | null;
  readonly ShippingAddress?: ShippingAddress | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly locationShippingClassId?: string | null;
  readonly locationBillingAddressId?: string | null;
  readonly locationUserId?: string | null;
  readonly locationShippingAddressId?: string | null;
}

type LazyLocation = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Location, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly lat?: number | null;
  readonly lng?: number | null;
  readonly ShippingClass: AsyncItem<ShippingClass | undefined>;
  readonly BillingAddress: AsyncItem<BillingAddress | undefined>;
  readonly User: AsyncItem<User | undefined>;
  readonly ShippingAddress: AsyncItem<ShippingAddress | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly locationShippingClassId?: string | null;
  readonly locationBillingAddressId?: string | null;
  readonly locationUserId?: string | null;
  readonly locationShippingAddressId?: string | null;
}

export declare type Location = LazyLoading extends LazyLoadingDisabled ? EagerLocation : LazyLocation

export declare const Location: (new (init: ModelInit<Location>) => Location) & {
  copyOf(source: Location, mutator: (draft: MutableModel<Location>) => MutableModel<Location> | void): Location;
}

type EagerShippingRate = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ShippingRate, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly minWeight?: number | null;
  readonly maxWeight?: number | null;
  readonly rate?: number | null;
  readonly shippingclassID: string;
  readonly ShippingClass?: ShippingClass | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyShippingRate = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ShippingRate, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly minWeight?: number | null;
  readonly maxWeight?: number | null;
  readonly rate?: number | null;
  readonly shippingclassID: string;
  readonly ShippingClass: AsyncItem<ShippingClass | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ShippingRate = LazyLoading extends LazyLoadingDisabled ? EagerShippingRate : LazyShippingRate

export declare const ShippingRate: (new (init: ModelInit<ShippingRate>) => ShippingRate) & {
  copyOf(source: ShippingRate, mutator: (draft: MutableModel<ShippingRate>) => MutableModel<ShippingRate> | void): ShippingRate;
}

type EagerShippingClass = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ShippingClass, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly Products?: (Product | null)[] | null;
  readonly ShippingRates?: (ShippingRate | null)[] | null;
  readonly Location?: Location | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly shippingClassLocationId?: string | null;
}

type LazyShippingClass = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ShippingClass, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly Products: AsyncCollection<Product>;
  readonly ShippingRates: AsyncCollection<ShippingRate>;
  readonly Location: AsyncItem<Location | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly shippingClassLocationId?: string | null;
}

export declare type ShippingClass = LazyLoading extends LazyLoadingDisabled ? EagerShippingClass : LazyShippingClass

export declare const ShippingClass: (new (init: ModelInit<ShippingClass>) => ShippingClass) & {
  copyOf(source: ShippingClass, mutator: (draft: MutableModel<ShippingClass>) => MutableModel<ShippingClass> | void): ShippingClass;
}

type EagerPrototype = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Prototype, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly categoryID?: string | null;
  readonly OptionTypes?: (OptionType | null)[] | null;
  readonly Products?: (Product | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPrototype = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Prototype, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly categoryID?: string | null;
  readonly OptionTypes: AsyncCollection<OptionType>;
  readonly Products: AsyncCollection<Product>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Prototype = LazyLoading extends LazyLoadingDisabled ? EagerPrototype : LazyPrototype

export declare const Prototype: (new (init: ModelInit<Prototype>) => Prototype) & {
  copyOf(source: Prototype, mutator: (draft: MutableModel<Prototype>) => MutableModel<Prototype> | void): Prototype;
}

type EagerSubCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SubCategory, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly Products?: (Product | null)[] | null;
  readonly categoryID: string;
  readonly OptionTypes?: (SubCategoryOptionType | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySubCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SubCategory, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly Products: AsyncCollection<Product>;
  readonly categoryID: string;
  readonly OptionTypes: AsyncCollection<SubCategoryOptionType>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SubCategory = LazyLoading extends LazyLoadingDisabled ? EagerSubCategory : LazySubCategory

export declare const SubCategory: (new (init: ModelInit<SubCategory>) => SubCategory) & {
  copyOf(source: SubCategory, mutator: (draft: MutableModel<SubCategory>) => MutableModel<SubCategory> | void): SubCategory;
}

type EagerProductType = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProductType, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Products?: (Product | null)[] | null;
  readonly Categories?: (Category | null)[] | null;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProductType = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProductType, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Products: AsyncCollection<Product>;
  readonly Categories: AsyncCollection<Category>;
  readonly name: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ProductType = LazyLoading extends LazyLoadingDisabled ? EagerProductType : LazyProductType

export declare const ProductType: (new (init: ModelInit<ProductType>) => ProductType) & {
  copyOf(source: ProductType, mutator: (draft: MutableModel<ProductType>) => MutableModel<ProductType> | void): ProductType;
}

type EagerBrand = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Brand, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly Products?: (Product | null)[] | null;
  readonly logo?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBrand = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Brand, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly Products: AsyncCollection<Product>;
  readonly logo?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Brand = LazyLoading extends LazyLoadingDisabled ? EagerBrand : LazyBrand

export declare const Brand: (new (init: ModelInit<Brand>) => Brand) & {
  copyOf(source: Brand, mutator: (draft: MutableModel<Brand>) => MutableModel<Brand> | void): Brand;
}

type EagerOptionValue = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OptionValue, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly optiontypeID?: string | null;
  readonly opttionType?: OptionType | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOptionValue = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OptionValue, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly optiontypeID?: string | null;
  readonly opttionType: AsyncItem<OptionType | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type OptionValue = LazyLoading extends LazyLoadingDisabled ? EagerOptionValue : LazyOptionValue

export declare const OptionValue: (new (init: ModelInit<OptionValue>) => OptionValue) & {
  copyOf(source: OptionValue, mutator: (draft: MutableModel<OptionValue>) => MutableModel<OptionValue> | void): OptionValue;
}

type EagerOptionType = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OptionType, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly value?: string | null;
  readonly placeholder?: string | null;
  readonly category?: PurposeEnum | keyof typeof PurposeEnum | null;
  readonly subcategorys?: (SubCategoryOptionType | null)[] | null;
  readonly OptionValues?: (OptionValue | null)[] | null;
  readonly prototypeID?: string | null;
  readonly Prototype?: Prototype | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOptionType = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OptionType, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly value?: string | null;
  readonly placeholder?: string | null;
  readonly category?: PurposeEnum | keyof typeof PurposeEnum | null;
  readonly subcategorys: AsyncCollection<SubCategoryOptionType>;
  readonly OptionValues: AsyncCollection<OptionValue>;
  readonly prototypeID?: string | null;
  readonly Prototype: AsyncItem<Prototype | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type OptionType = LazyLoading extends LazyLoadingDisabled ? EagerOptionType : LazyOptionType

export declare const OptionType: (new (init: ModelInit<OptionType>) => OptionType) & {
  copyOf(source: OptionType, mutator: (draft: MutableModel<OptionType>) => MutableModel<OptionType> | void): OptionType;
}

type EagerCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Category, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly Products?: (Product | null)[] | null;
  readonly producttypeID: string;
  readonly SubCategories?: (SubCategory | null)[] | null;
  readonly Prototypes?: (Prototype | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCategory = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Category, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly image?: string | null;
  readonly Products: AsyncCollection<Product>;
  readonly producttypeID: string;
  readonly SubCategories: AsyncCollection<SubCategory>;
  readonly Prototypes: AsyncCollection<Prototype>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Category = LazyLoading extends LazyLoadingDisabled ? EagerCategory : LazyCategory

export declare const Category: (new (init: ModelInit<Category>) => Category) & {
  copyOf(source: Category, mutator: (draft: MutableModel<Category>) => MutableModel<Category> | void): Category;
}

type EagerBagProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BagProduct, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userSub: string;
  readonly quantity: number;
  readonly productID?: string | null;
  readonly product?: Product | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBagProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<BagProduct, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userSub: string;
  readonly quantity: number;
  readonly productID?: string | null;
  readonly product: AsyncItem<Product | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type BagProduct = LazyLoading extends LazyLoadingDisabled ? EagerBagProduct : LazyBagProduct

export declare const BagProduct: (new (init: ModelInit<BagProduct>) => BagProduct) & {
  copyOf(source: BagProduct, mutator: (draft: MutableModel<BagProduct>) => MutableModel<BagProduct> | void): BagProduct;
}

type EagerOrderProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrderProduct, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly productID: string;
  readonly product?: Product | null;
  readonly orderID: string;
  readonly Order?: Order | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOrderProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrderProduct, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly quantity: number;
  readonly productID: string;
  readonly product: AsyncItem<Product | undefined>;
  readonly orderID: string;
  readonly Order: AsyncItem<Order | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type OrderProduct = LazyLoading extends LazyLoadingDisabled ? EagerOrderProduct : LazyOrderProduct

export declare const OrderProduct: (new (init: ModelInit<OrderProduct>) => OrderProduct) & {
  copyOf(source: OrderProduct, mutator: (draft: MutableModel<OrderProduct>) => MutableModel<OrderProduct> | void): OrderProduct;
}

type EagerOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly status?: OrderStatus | keyof typeof OrderStatus | null;
  readonly userSub: string;
  readonly ShippingAddress?: ShippingAddress | null;
  readonly BillingAddress?: BillingAddress | null;
  readonly PaymentMethod?: PaymentMethod | null;
  readonly completed?: boolean | null;
  readonly OrderProduct?: OrderProduct | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderShippingAddressId?: string | null;
  readonly orderBillingAddressId?: string | null;
  readonly orderPaymentMethodId?: string | null;
  readonly orderOrderProductId?: string | null;
}

type LazyOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly status?: OrderStatus | keyof typeof OrderStatus | null;
  readonly userSub: string;
  readonly ShippingAddress: AsyncItem<ShippingAddress | undefined>;
  readonly BillingAddress: AsyncItem<BillingAddress | undefined>;
  readonly PaymentMethod: AsyncItem<PaymentMethod | undefined>;
  readonly completed?: boolean | null;
  readonly OrderProduct: AsyncItem<OrderProduct | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly orderShippingAddressId?: string | null;
  readonly orderBillingAddressId?: string | null;
  readonly orderPaymentMethodId?: string | null;
  readonly orderOrderProductId?: string | null;
}

export declare type Order = LazyLoading extends LazyLoadingDisabled ? EagerOrder : LazyOrder

export declare const Order: (new (init: ModelInit<Order>) => Order) & {
  copyOf(source: Order, mutator: (draft: MutableModel<Order>) => MutableModel<Order> | void): Order;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly sub?: string | null;
  readonly phone?: string | null;
  readonly BillingAddress?: BillingAddress | null;
  readonly Location?: Location | null;
  readonly ShippinAddresses?: (ShippingAddress | null)[] | null;
  readonly PaymentMethods?: (PaymentMethod | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userBillingAddressId?: string | null;
  readonly userLocationId?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly sub?: string | null;
  readonly phone?: string | null;
  readonly BillingAddress: AsyncItem<BillingAddress | undefined>;
  readonly Location: AsyncItem<Location | undefined>;
  readonly ShippinAddresses: AsyncCollection<ShippingAddress>;
  readonly PaymentMethods: AsyncCollection<PaymentMethod>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly userBillingAddressId?: string | null;
  readonly userLocationId?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly count: number;
  readonly about: string;
  readonly images?: string[] | null;
  readonly rating?: number | null;
  readonly price: number;
  readonly mockPrice?: number | null;
  readonly wholesalePromoPrice?: number | null;
  readonly features?: (string | null)[] | null;
  readonly published?: boolean | null;
  readonly model?: string | null;
  readonly isFeatured?: boolean | null;
  readonly isPromoted?: boolean | null;
  readonly categoryID: string;
  readonly Category?: Category | null;
  readonly brandID: string;
  readonly Brand?: Brand | null;
  readonly producttypeID: string;
  readonly subcategoryID: string;
  readonly prototypeID?: string | null;
  readonly Prototype?: Prototype | null;
  readonly ProductType?: ProductType | null;
  readonly SubCategory?: SubCategory | null;
  readonly promoPrice?: number | null;
  readonly shippingclassID?: string | null;
  readonly ShippingClass?: ShippingClass | null;
  readonly details: string;
  readonly BagProduct?: BagProduct | null;
  readonly OrderProduct?: OrderProduct | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly productBagProductId?: string | null;
  readonly productOrderProductId?: string | null;
}

type LazyProduct = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Product, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly count: number;
  readonly about: string;
  readonly images?: string[] | null;
  readonly rating?: number | null;
  readonly price: number;
  readonly mockPrice?: number | null;
  readonly wholesalePromoPrice?: number | null;
  readonly features?: (string | null)[] | null;
  readonly published?: boolean | null;
  readonly model?: string | null;
  readonly isFeatured?: boolean | null;
  readonly isPromoted?: boolean | null;
  readonly categoryID: string;
  readonly Category: AsyncItem<Category | undefined>;
  readonly brandID: string;
  readonly Brand: AsyncItem<Brand | undefined>;
  readonly producttypeID: string;
  readonly subcategoryID: string;
  readonly prototypeID?: string | null;
  readonly Prototype: AsyncItem<Prototype | undefined>;
  readonly ProductType: AsyncItem<ProductType | undefined>;
  readonly SubCategory: AsyncItem<SubCategory | undefined>;
  readonly promoPrice?: number | null;
  readonly shippingclassID?: string | null;
  readonly ShippingClass: AsyncItem<ShippingClass | undefined>;
  readonly details: string;
  readonly BagProduct: AsyncItem<BagProduct | undefined>;
  readonly OrderProduct: AsyncItem<OrderProduct | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly productBagProductId?: string | null;
  readonly productOrderProductId?: string | null;
}

export declare type Product = LazyLoading extends LazyLoadingDisabled ? EagerProduct : LazyProduct

export declare const Product: (new (init: ModelInit<Product>) => Product) & {
  copyOf(source: Product, mutator: (draft: MutableModel<Product>) => MutableModel<Product> | void): Product;
}

type EagerSubCategoryOptionType = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SubCategoryOptionType, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly subCategoryId?: string | null;
  readonly optionTypeId?: string | null;
  readonly subCategory: SubCategory;
  readonly optionType: OptionType;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySubCategoryOptionType = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SubCategoryOptionType, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly subCategoryId?: string | null;
  readonly optionTypeId?: string | null;
  readonly subCategory: AsyncItem<SubCategory>;
  readonly optionType: AsyncItem<OptionType>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SubCategoryOptionType = LazyLoading extends LazyLoadingDisabled ? EagerSubCategoryOptionType : LazySubCategoryOptionType

export declare const SubCategoryOptionType: (new (init: ModelInit<SubCategoryOptionType>) => SubCategoryOptionType) & {
  copyOf(source: SubCategoryOptionType, mutator: (draft: MutableModel<SubCategoryOptionType>) => MutableModel<SubCategoryOptionType> | void): SubCategoryOptionType;
}