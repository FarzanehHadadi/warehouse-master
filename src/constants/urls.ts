export const STATIC_PATH = '/v1/';

// Auth
export const TOKEN = `${STATIC_PATH}token/`;
export const LOGIN = `${STATIC_PATH}auth/login/`;
export const REFRESH = `${STATIC_PATH}refresh/`;

// Dashboard
export const DASHBOARD = `${STATIC_PATH}dashboard/`;
export const DASHBOARD_KPIS = `${STATIC_PATH}dashboard/kpis/`;
export const DASHBOARD_ALERTS = `${STATIC_PATH}dashboard/alerts/`;
export const DASHBOARD_TRENDS = `${STATIC_PATH}dashboard/trends/`;
export const DASHBOARD_ACTIVITIES = `${STATIC_PATH}dashboard/activities/`;

// Categories
export const CATEGORY = `${STATIC_PATH}category/`;
export const CATEGORIES = `${STATIC_PATH}categories/`;
export const CATEGORY_BY_ID = (categoryId: string | number) =>
  `${STATIC_PATH}category/${categoryId}/`;
export const DB_CATEGORY_BY_ID = (categoryId: string | number) =>
  `${STATIC_PATH}db_category/${categoryId}/`;

// Departments
export const DEPARTMENT = `${STATIC_PATH}department`;
export const DEPARTMENTS = `${STATIC_PATH}departments/`;
export const DEPARTMENT_BY_ID = (departmentId: string | number) =>
  `${STATIC_PATH}department/${departmentId}/`;
export const DB_DEPARTMENT_BY_ID = (departmentId: string | number) =>
  `${STATIC_PATH}db_department/${departmentId}/`;

// Units
export const UNIT = `${STATIC_PATH}unit/`;
export const UNITS = `${STATIC_PATH}units/`;
export const UNIT_BY_ID = (unitId: string | number) =>
  `${STATIC_PATH}unit/${unitId}/`;
export const DB_UNIT_BY_ID = (unitId: string | number) =>
  `${STATIC_PATH}db_unit/${unitId}/`;

// Stores
export const STORE = `${STATIC_PATH}store/`;
export const STORES = `${STATIC_PATH}stores/`;
export const STORE_BY_ID = (storeId: string | number) =>
  `${STATIC_PATH}store/${storeId}/`;
export const DB_STORE_BY_ID = (storeId: string | number) =>
  `${STATIC_PATH}db_store/${storeId}/`;

// Products
export const PRODUCT = `${STATIC_PATH}product/`;
export const PRODUCTS = `${STATIC_PATH}products/`;
export const PRODUCT_SEARCH = `${STATIC_PATH}products/search/`;
export const PRODUCT_BY_ID = (productId: string | number) =>
  `${STATIC_PATH}product/${productId}/`;
export const DB_PRODUCT_BY_ID = (productId: string | number) =>
  `${STATIC_PATH}db_product/${productId}/`;

// Orders
export const ORDER = `${STATIC_PATH}order/`;
export const ORDERS = `${STATIC_PATH}orders/`;
export const ORDER_EXPORT = `${STATIC_PATH}orders/export/`;
export const ORDER_BY_ID = (orderId: string | number) =>
  `${STATIC_PATH}order/${orderId}/`;

// Transfers
export const TRANSFER = `${STATIC_PATH}transfer/`;

// Reports
export const REPORTS_STORE_PRODUCT_QUANTITIES = `${STATIC_PATH}reports/store-product-quantities/`;
export const REPORTS_THRESHOLD_PROXIMITY = `${STATIC_PATH}reports/threshold-proximity/`;
export const REPORTS_STORE_PRODUCT_QUANTITIES_EXPORT = `${STATIC_PATH}reports/store-product-quantities/export/`;
export const REPORTS_THRESHOLD_PROXIMITY_EXPORT = `${STATIC_PATH}reports/threshold-proximity/export/`;
