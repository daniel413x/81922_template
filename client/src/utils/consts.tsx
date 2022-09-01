import Admin from '../pages/Admin';
import AccountIndex from '../pages/AccountIndex';
import Account from '../pages/Account';
import SomePage from '../pages/SomePage';
import Auth from '../pages/Auth';
import FrontPage from '../pages/FrontPage';
import AccountNestedPageOne from '../pages/AccountNestedPageOne';
import AccountNestedPageTwo from '../pages/AccountNestedPageTwo';
import AdminNestedPage from '../pages/AdminNestedPage';
import AdminIndex from '../pages/AdminIndex';
import UserById from '../pages/UserById';
import UserIndex from '../pages/UserIndex';

export const FRONT_PAGE_ROUTE = '/';
export const INDEX_ROUTE = '/*';
export const ADMIN_ROUTE = '/admin';
export const ADMIN_WILDCARD_ROUTE = 'admin/*';
export const ACCOUNT_ROUTE = '/account';
export const ACCOUNT_WILDCARD_ROUTE = 'account/*';
export const NESTED_ACCOUNT_ROUTE_ONE = 'nestedaccountrouteone';
export const NESTED_ACCOUNT_ROUTE_TWO = 'nestedaccountroutetwo';
export const NESTED_ADMIN_ROUTE = 'nestedadminroute';
export const ADMIN_CATEGORIES_ROUTE = 'categories';
export const ADMIN_FOOD_ITEMS_ROUTE = 'fooditems';
export const ADMIN_ORDERS_ROUTE = 'orders';
export const USERS_ROUTE = 'users';
export const LOGIN_ROUTE = 'login';
export const REGISTRATION_ROUTE = 'registration';
export const SOME_PAGE_ROUTE = 'somepage';
export const CART_ROUTE = 'cart';
export const ORDERS_ROUTE = 'orders';
export const GUEST_ROUTE = 'guest';
export const ADMIN = 'ADMIN';
export const GUEST = 'GUEST';
export const REGISTERED = 'REGISTERED';
export const green = 'green';
export const red = 'red';
export const shortNotification = 4000;
export const longNotification = 6000;

export const indexAuthedRoutes = [
  {
    path: ADMIN_WILDCARD_ROUTE,
    Component: Admin,
  },
  {
    path: ACCOUNT_WILDCARD_ROUTE,
    Component: Account,
  },
];

export const indexPublicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: SOME_PAGE_ROUTE,
    Component: SomePage,
  },
  {
    path: INDEX_ROUTE,
    Component: FrontPage,
  },
];

export const accountRoutes = [
  {
    path: NESTED_ACCOUNT_ROUTE_ONE,
    Component: AccountNestedPageOne,
  },
  {
    path: NESTED_ACCOUNT_ROUTE_TWO,
    Component: AccountNestedPageTwo,
  },
  {
    path: INDEX_ROUTE,
    Component: AccountIndex,
  },
];

export const adminRoutes = [
  {
    path: NESTED_ADMIN_ROUTE,
    Component: AdminNestedPage,
  },
  {
    path: USERS_ROUTE,
    Component: UserIndex,
  },
  {
    path: `${USERS_ROUTE}/:id`,
    Component: UserById,
  },
  {
    path: INDEX_ROUTE,
    Component: AdminIndex,
  },
];
