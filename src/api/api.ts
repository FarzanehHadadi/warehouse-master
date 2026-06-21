/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** ProductStatus */
export enum ProductStatus {
  Good = "good",
  Defective = "defective",
  Unknown = "unknown",
}

/** OrderType */
export enum OrderType {
  Inbound = "inbound",
  Outbound = "outbound",
}

/** Body_token_api_v1_token__post */
export interface BodyTokenApiV1TokenPost {
  /** Grant Type */
  grant_type?: string | null;
  /** Username */
  username: string;
  /**
   * Password
   * @format password
   */
  password: string;
  /**
   * Scope
   * @default ""
   */
  scope?: string;
  /** Client Id */
  client_id?: string | null;
  /**
   * Client Secret
   * @format password
   */
  client_secret?: string | null;
}

/** CategoryCreateInternal */
export interface CategoryCreateInternal {
  /**
   * Name
   * @minLength 1
   * @maxLength 100
   */
  name: string;
}

/** CategoryRead */
export interface CategoryRead {
  /** Id */
  id: number;
  /** Name */
  name: string;
}

/**
 * CategorySummary
 * Category summary for dashboard
 */
export interface CategorySummary {
  /** Category Id */
  category_id: number;
  /** Category Name */
  category_name: string;
  /** Product Count */
  product_count: number;
  /** Total Quantity */
  total_quantity: number;
}

/** CategoryUpdate */
export interface CategoryUpdate {
  /** Name */
  name?: string | null;
}

/**
 * DashboardData
 * Complete dashboard data
 */
export interface DashboardData {
  /** Kpis */
  kpis: DashboardKPI[];
  /** Order Trends */
  order_trends: OrderTrend[];
  /** Stock Alerts */
  stock_alerts: StockAlert[];
  /** Recent Activities */
  recent_activities: RecentActivity[];
  /** Store Summaries */
  store_summaries: StoreSummary[];
  /** Category Summaries */
  category_summaries: CategorySummary[];
  /**
   * Last Updated
   * @format date-time
   */
  last_updated: string;
}

/**
 * DashboardKPI
 * Key Performance Indicator for dashboard
 */
export interface DashboardKPI {
  /** Title */
  title: string;
  /** Value */
  value: number;
  /** Change Percent */
  change_percent?: number | null;
  /** Trend */
  trend?: string | null;
  /** Icon */
  icon?: string | null;
}

/** DepartmentCreate */
export interface DepartmentCreate {
  /**
   * Name
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /** Manager Name */
  manager_name?: string | null;
}

/** DepartmentRead */
export interface DepartmentRead {
  /** Id */
  id: number;
  /** Name */
  name: string;
  /** Manager Name */
  manager_name: string | null;
}

/** DepartmentUpdate */
export interface DepartmentUpdate {
  /**
   * Name
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /** Manager Name */
  manager_name?: string | null;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** Login */
export interface Login {
  /**
   * Username
   * Username for login
   * @minLength 3
   */
  username: string;
  /**
   * Password
   * Password for login
   * @minLength 3
   */
  password: string;
}

/** OrderCreate */
export interface OrderCreate {
  /**
   * Product Id
   * @exclusiveMin 0
   */
  product_id: number;
  /**
   * Store Id
   * @exclusiveMin 0
   */
  store_id: number;
  type: OrderType;
  /**
   * Quantity
   * @exclusiveMin 0
   */
  quantity: number;
  /**
   * Expire Date
   * @format date-time
   */
  expire_date: string;
  /** Price */
  price: number | string;
  /** @default "good" */
  product_status?: ProductStatus;
  /** Description */
  description?: string | null;
  /**
   * Department Id
   * @exclusiveMin 0
   */
  department_id: number;
}

/** OrderJoinProductOrderRead */
export interface OrderJoinProductOrderRead {
  /** Id */
  id: number;
  /** Product Id */
  product_id: number;
  /** Store Id */
  store_id: number;
  /** Department Id */
  department_id: number;
  type: OrderType;
  /** Quantity */
  quantity: number;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Expire Date
   * @format date-time
   */
  expire_date: string;
  product_status: ProductStatus;
  /** Description */
  description: string | null;
  product: ProductJoinCategoryUnit;
  store: StoreReadImportantInfo;
  department: DepartmentRead;
}

/**
 * OrderTrend
 * Order trend data for charts
 */
export interface OrderTrend {
  /** Date */
  date: string;
  /** Inbound */
  inbound: number;
  /** Outbound */
  outbound: number;
  /** Total */
  total: number;
}

/** OrderUpdate */
export interface OrderUpdate {
  /** Product Id */
  product_id?: number | null;
  /** Store Id */
  store_id?: number | null;
  /** Department Id */
  department_id?: number | null;
  /** Quantity */
  quantity?: number | null;
  /** Expire Date */
  expire_date?: string | null;
  /** Price */
  price?: number | string | null;
  product_status?: ProductStatus | null;
  /** Description */
  description?: string | null;
}

/** PaginatedListResponse[OrderJoinProductOrderRead] */
export interface PaginatedListResponseOrderJoinProductOrderRead {
  /** Data */
  data: OrderJoinProductOrderRead[];
  /** Total Count */
  total_count: number;
  /** Has More */
  has_more: boolean;
  /** Page */
  page?: number | null;
  /** Items Per Page */
  items_per_page?: number | null;
}

/** PaginatedListResponse[ProductRead] */
export interface PaginatedListResponseProductRead {
  /** Data */
  data: ProductRead[];
  /** Total Count */
  total_count: number;
  /** Has More */
  has_more: boolean;
  /** Page */
  page?: number | null;
  /** Items Per Page */
  items_per_page?: number | null;
}

/** ProductCreate */
export interface ProductCreate {
  /**
   * Name
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Category Id
   * @exclusiveMin 0
   */
  category_id: number;
  /** Unit Id */
  unit_id?: number | null;
  /**
   * Warning Threshold
   * @min 0
   */
  warning_threshold: number;
}

/** ProductImportantInfo */
export interface ProductImportantInfo {
  /** Id */
  id: number;
  /** Name */
  name: string;
}

/** ProductJoinCategoryUnit */
export interface ProductJoinCategoryUnit {
  /** Id */
  id: number;
  /** Name */
  name: string;
  /** Category Id */
  category_id: number;
  /** Unit Id */
  unit_id: number | null;
  /** Warning Threshold */
  warning_threshold: number;
  category: CategoryRead;
  unit: UnitRead;
}

/** ProductRead */
export interface ProductRead {
  /** Id */
  id: number;
  /** Name */
  name: string;
  /** Category Id */
  category_id: number;
  /** Unit Id */
  unit_id: number | null;
  /** Warning Threshold */
  warning_threshold: number;
}

/** ProductUpdate */
export interface ProductUpdate {
  /** Name */
  name?: string | null;
  /** Category Id */
  category_id?: number | null;
  /** Unit Id */
  unit_id?: number | null;
  /** Warning Threshold */
  warning_threshold?: number | null;
}

/**
 * RecentActivity
 * Recent activity item
 */
export interface RecentActivity {
  /** Id */
  id: number;
  /** Type */
  type: string;
  /** Action */
  action: string;
  /** Description */
  description: string;
  /**
   * Timestamp
   * @format date-time
   */
  timestamp: string;
  /** User */
  user?: string | null;
}

/** RefreshToken */
export interface RefreshToken {
  /** Refresh Token */
  refresh_token: string;
}

/**
 * StockAlert
 * Stock alert for low inventory
 */
export interface StockAlert {
  /** Product Id */
  product_id: number;
  /** Product Name */
  product_name: string;
  /** Current Quantity */
  current_quantity: number;
  /** Warning Threshold */
  warning_threshold: number;
  /** Store Name */
  store_name: string;
  /** Alert Level */
  alert_level: string;
}

/** StoreCreate */
export interface StoreCreate {
  /**
   * Name
   * @minLength 1
   * @maxLength 100
   */
  name: string;
  /**
   * Manager Name
   * @minLength 1
   * @maxLength 100
   */
  manager_name: string;
  /** Is Active */
  is_active: boolean;
}

/**
 * StoreProductQuantityReport
 * Report showing total quantities grouped by store and product
 */
export interface StoreProductQuantityReport {
  /** Product Id */
  product_id: number;
  /** Product Name */
  product_name: string;
  /** Category Name */
  category_name: string;
  /** Store Id */
  store_id: number;
  /** Store Name */
  store_name: string;
  /** Total Quantity */
  total_quantity: number;
}

/** StoreRead */
export interface StoreRead {
  /** Id */
  id: number;
  /** Name */
  name: string;
  /** Manager Name */
  manager_name: string;
  /** Is Active */
  is_active: boolean;
}

/** StoreReadImportantInfo */
export interface StoreReadImportantInfo {
  /** Name */
  name: string;
}

/**
 * StoreSummary
 * Store summary for dashboard
 */
export interface StoreSummary {
  /** Store Id */
  store_id: number;
  /** Store Name */
  store_name: string;
  /** Manager Name */
  manager_name: string;
  /** Total Products */
  total_products: number;
  /** Total Quantity */
  total_quantity: number;
  /** Recent Orders */
  recent_orders: number;
}

/** StoreUpdate */
export interface StoreUpdate {
  /** Name */
  name?: string | null;
  /** Manager Name */
  manager_name?: string | null;
  /** Is Active */
  is_active?: boolean | null;
}

/**
 * ThresholdProximityReport
 * Report showing products sorted by proximity to their warning threshold
 */
export interface ThresholdProximityReport {
  /** Product Id */
  product_id: number;
  /** Product Name */
  product_name: string;
  /** Category Name */
  category_name: string;
  /** Unit Name */
  unit_name: string | null;
  /** Warning Threshold */
  warning_threshold: number;
  /** Current Quantity */
  current_quantity: number;
  /** Stores Count */
  stores_count: number;
}

/** Token */
export interface Token {
  /** Access Token */
  access_token: string;
  /** Refresh Token */
  refresh_token: string;
}

/** TransferRequest */
export interface TransferRequest {
  /**
   * Product Id
   * ID of the product to transfer
   * @exclusiveMin 0
   */
  product_id: number;
  /**
   * From Store Id
   * Source store ID
   * @exclusiveMin 0
   */
  from_store_id: number;
  /**
   * To Store Id
   * Destination store ID
   * @exclusiveMin 0
   */
  to_store_id: number;
  /**
   * Quantity
   * Quantity to transfer
   * @exclusiveMin 0
   */
  quantity: number;
  /**
   * Transfer Date
   * Date of transfer
   * @format date-time
   */
  transfer_date: string;
  /**
   * Unit Price
   * Unit price of the product
   */
  unit_price: number | string;
  /**
   * Expire Date
   * Expiration date of the product
   * @format date-time
   */
  expire_date: string;
  /** Status of the product */
  product_status: ProductStatus;
  /** Description */
  description?: string | null;
  /**
   * Department Id
   * Department ID
   * @exclusiveMin 0
   */
  department_id: number;
}

/** TransferResponse */
export interface TransferResponse {
  /** Transfer Id */
  transfer_id: string;
  /** Outbound Order Id */
  outbound_order_id: number;
  /** Inbound Order Id */
  inbound_order_id: number;
  /** Message */
  message: string;
  /** Details */
  details: Record<string, any>;
}

/** UnitCreate */
export interface UnitCreate {
  /**
   * Name
   * @minLength 1
   * @maxLength 50
   */
  name: string;
}

/** UnitRead */
export interface UnitRead {
  /** Id */
  id: number;
  /** Name */
  name: string;
}

/** UnitUpdate */
export interface UnitUpdate {
  /** Name */
  name?: string | null;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title FastAPI
 * @version 0.1.0
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags login
     * @name TokenApiV1TokenPost
     * @summary Token
     * @request POST:/api/v1/token/
     */
    tokenApiV1TokenPost: (
      data: BodyTokenApiV1TokenPost,
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/token/`,
        method: "POST",
        body: data,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags login
     * @name LoginApiV1LoginPost
     * @summary Login
     * @request POST:/api/v1/login/
     */
    loginApiV1LoginPost: (data: Login, params: RequestParams = {}) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/login/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags login
     * @name RefreshTokenApiV1RefreshPost
     * @summary Refresh Token
     * @request POST:/api/v1/refresh/
     */
    refreshTokenApiV1RefreshPost: (
      data: RefreshToken,
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/refresh/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get comprehensive dashboard data including KPIs, trends, alerts, and summaries. Returns: - Key Performance Indicators (KPIs) - Order trends for the last 7 days - Stock alerts for low inventory - Recent activities - Store summaries - Category summaries
     *
     * @tags dashboard
     * @name GetDashboardDataApiV1DashboardGet
     * @summary Get Dashboard Data
     * @request GET:/api/v1/dashboard/
     */
    getDashboardDataApiV1DashboardGet: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/v1/dashboard/`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get only KPIs for dashboard widgets
     *
     * @tags dashboard
     * @name GetDashboardKpisApiV1DashboardKpisGet
     * @summary Get Dashboard Kpis
     * @request GET:/api/v1/dashboard/kpis/
     */
    getDashboardKpisApiV1DashboardKpisGet: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/v1/dashboard/kpis/`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get stock alerts for low inventory products
     *
     * @tags dashboard
     * @name GetStockAlertsApiV1DashboardAlertsGet
     * @summary Get Stock Alerts
     * @request GET:/api/v1/dashboard/alerts/
     */
    getStockAlertsApiV1DashboardAlertsGet: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/v1/dashboard/alerts/`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get order trends for charts
     *
     * @tags dashboard
     * @name GetOrderTrendsApiV1DashboardTrendsGet
     * @summary Get Order Trends
     * @request GET:/api/v1/dashboard/trends/
     */
    getOrderTrendsApiV1DashboardTrendsGet: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/v1/dashboard/trends/`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Get recent activities feed
     *
     * @tags dashboard
     * @name GetRecentActivitiesApiV1DashboardActivitiesGet
     * @summary Get Recent Activities
     * @request GET:/api/v1/dashboard/activities/
     */
    getRecentActivitiesApiV1DashboardActivitiesGet: (
      params: RequestParams = {},
    ) =>
      this.request<string, any>({
        path: `/api/v1/dashboard/activities/`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags categories
     * @name CreateCategoryApiV1CategoryPost
     * @summary Create Category
     * @request POST:/api/v1/category/
     */
    createCategoryApiV1CategoryPost: (
      data: CategoryCreateInternal,
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/category/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags categories
     * @name ReadCategoriesApiV1CategoriesGet
     * @summary Read Categories
     * @request GET:/api/v1/categories/
     */
    readCategoriesApiV1CategoriesGet: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/v1/categories/`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags categories
     * @name ReadCategoryApiV1CategoryCategoryIdGet
     * @summary Read Category
     * @request GET:/api/v1/category/{category_id}/
     */
    readCategoryApiV1CategoryCategoryIdGet: (
      categoryId: number,
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/category/${categoryId}/`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags categories
     * @name UpdateCategoryApiV1CategoryCategoryIdPatch
     * @summary Update Category
     * @request PATCH:/api/v1/category/{category_id}/
     */
    updateCategoryApiV1CategoryCategoryIdPatch: (
      categoryId: number,
      data: CategoryUpdate,
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/category/${categoryId}/`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags categories
     * @name DeleteCategoryApiV1CategoryCategoryIdDelete
     * @summary Delete Category
     * @request DELETE:/api/v1/category/{category_id}/
     */
    deleteCategoryApiV1CategoryCategoryIdDelete: (
      categoryId: number,
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/category/${categoryId}/`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags categories
     * @name DeleteDbCategoryApiV1DbCategoryCategoryIdDelete
     * @summary Delete Db Category
     * @request DELETE:/api/v1/db_category/{category_id}/
     */
    deleteDbCategoryApiV1DbCategoryCategoryIdDelete: (
      categoryId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, HTTPValidationError>({
        path: `/api/v1/db_category/${categoryId}/`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags departments
     * @name CreateDepartmentApiV1DepartmentPost
     * @summary Create Department
     * @request POST:/api/v1/department
     */
    createDepartmentApiV1DepartmentPost: (
      data: DepartmentCreate,
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/department`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags departments
     * @name ReadDepartmentsApiV1DepartmentsGet
     * @summary Read Departments
     * @request GET:/api/v1/departments/
     */
    readDepartmentsApiV1DepartmentsGet: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/v1/departments/`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags departments
     * @name ReadDepartmentApiV1DepartmentDepartmentIdGet
     * @summary Read Department
     * @request GET:/api/v1/department/{department_id}/
     */
    readDepartmentApiV1DepartmentDepartmentIdGet: (
      departmentId: number,
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/department/${departmentId}/`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags departments
     * @name UpdateDepartmentApiV1DepartmentDepartmentIdPatch
     * @summary Update Department
     * @request PATCH:/api/v1/department/{department_id}/
     */
    updateDepartmentApiV1DepartmentDepartmentIdPatch: (
      departmentId: number,
      data: DepartmentUpdate,
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/department/${departmentId}/`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags departments
     * @name DeleteDepartmentApiV1DepartmentDepartmentIdDelete
     * @summary Delete Department
     * @request DELETE:/api/v1/department/{department_id}/
     */
    deleteDepartmentApiV1DepartmentDepartmentIdDelete: (
      departmentId: number,
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/department/${departmentId}/`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags departments
     * @name DeleteDbDepartmentApiV1DbDepartmentDepartmentIdDelete
     * @summary Delete Db Department
     * @request DELETE:/api/v1/db_department/{department_id}/
     */
    deleteDbDepartmentApiV1DbDepartmentDepartmentIdDelete: (
      departmentId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, HTTPValidationError>({
        path: `/api/v1/db_department/${departmentId}/`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags units
     * @name CreateUnitApiV1UnitPost
     * @summary Create Unit
     * @request POST:/api/v1/unit/
     */
    createUnitApiV1UnitPost: (data: UnitCreate, params: RequestParams = {}) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/unit/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags units
     * @name ReadUnitsApiV1UnitsGet
     * @summary Read Units
     * @request GET:/api/v1/units/
     */
    readUnitsApiV1UnitsGet: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/v1/units/`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags units
     * @name ReadUnitApiV1UnitUnitIdGet
     * @summary Read Unit
     * @request GET:/api/v1/unit/{unit_id}/
     */
    readUnitApiV1UnitUnitIdGet: (unitId: number, params: RequestParams = {}) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/unit/${unitId}/`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags units
     * @name UpdateUnitApiV1UnitUnitIdPatch
     * @summary Update Unit
     * @request PATCH:/api/v1/unit/{unit_id}/
     */
    updateUnitApiV1UnitUnitIdPatch: (
      unitId: number,
      data: UnitUpdate,
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/unit/${unitId}/`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags units
     * @name DeleteUnitApiV1UnitUnitIdDelete
     * @summary Delete Unit
     * @request DELETE:/api/v1/unit/{unit_id}/
     */
    deleteUnitApiV1UnitUnitIdDelete: (
      unitId: number,
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/unit/${unitId}/`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags units
     * @name DeleteDbUnitApiV1DbUnitUnitIdDelete
     * @summary Delete Db Unit
     * @request DELETE:/api/v1/db_unit/{unit_id}/
     */
    deleteDbUnitApiV1DbUnitUnitIdDelete: (
      unitId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, HTTPValidationError>({
        path: `/api/v1/db_unit/${unitId}/`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags stores
     * @name CreateStoreApiV1StorePost
     * @summary Create Store
     * @request POST:/api/v1/store/
     */
    createStoreApiV1StorePost: (
      data: StoreCreate,
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/store/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags stores
     * @name ReadStoresApiV1StoresGet
     * @summary Read Stores
     * @request GET:/api/v1/stores/
     */
    readStoresApiV1StoresGet: (params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/v1/stores/`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags stores
     * @name ReadStoreApiV1StoreStoreIdGet
     * @summary Read Store
     * @request GET:/api/v1/store/{store_id}/
     */
    readStoreApiV1StoreStoreIdGet: (
      storeId: number,
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/store/${storeId}/`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags stores
     * @name UpdateStoreApiV1StoreStoreIdPatch
     * @summary Update Store
     * @request PATCH:/api/v1/store/{store_id}/
     */
    updateStoreApiV1StoreStoreIdPatch: (
      storeId: number,
      data: StoreUpdate,
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/store/${storeId}/`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags stores
     * @name DeleteStoreApiV1StoreStoreIdDelete
     * @summary Delete Store
     * @request DELETE:/api/v1/store/{store_id}/
     */
    deleteStoreApiV1StoreStoreIdDelete: (
      storeId: number,
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/store/${storeId}/`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags stores
     * @name DeleteDbStoreApiV1DbStoreStoreIdDelete
     * @summary Delete Db Store
     * @request DELETE:/api/v1/db_store/{store_id}/
     */
    deleteDbStoreApiV1DbStoreStoreIdDelete: (
      storeId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, HTTPValidationError>({
        path: `/api/v1/db_store/${storeId}/`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name CreateProductApiV1ProductPost
     * @summary Create Product
     * @request POST:/api/v1/product/
     */
    createProductApiV1ProductPost: (
      data: ProductCreate,
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/product/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name SearchProductsApiV1ProductsSearchGet
     * @summary Search Products
     * @request GET:/api/v1products/search/
     */
    searchProductsApiV1ProductsSearchGet: (
      query?: {
        /** Search */
        search?: string | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1products/search/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ReadProductsApiV1ProductsGet
     * @summary Read Products
     * @request GET:/api/v1/products/
     */
    readProductsApiV1ProductsGet: (
      query?: {
        /**
         * Page
         * @default 1
         */
        page?: number;
        /**
         * Size
         * @default 10
         */
        size?: number;
        /** Category Id */
        category_id?: number | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/products/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name ReadProductApiV1ProductProductIdGet
     * @summary Read Product
     * @request GET:/api/v1/product/{product_id}/
     */
    readProductApiV1ProductProductIdGet: (
      productId: number,
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/product/${productId}/`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name UpdateProductApiV1ProductProductIdPatch
     * @summary Update Product
     * @request PATCH:/api/v1/product/{product_id}/
     */
    updateProductApiV1ProductProductIdPatch: (
      productId: number,
      data: ProductUpdate,
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/product/${productId}/`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name DeleteProductApiV1ProductProductIdDelete
     * @summary Delete Product
     * @request DELETE:/api/v1/product/{product_id}/
     */
    deleteProductApiV1ProductProductIdDelete: (
      productId: number,
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/product/${productId}/`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags products
     * @name DeleteDbProductApiV1DbProductProductIdDelete
     * @summary Delete Db Product
     * @request DELETE:/api/v1/db_product/{product_id}/
     */
    deleteDbProductApiV1DbProductProductIdDelete: (
      productId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, HTTPValidationError>({
        path: `/api/v1/db_product/${productId}/`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name ExportOrdersExcelApiV1OrdersExportGet
     * @summary Export orders to Excel (Persian)
     * @request GET:/api/v1/orders/export/
     */
    exportOrdersExcelApiV1OrdersExportGet: (
      query?: {
        /** Store Id */
        store_id?: number | null;
        /** Product Id */
        product_id?: number | null;
        /** Product Status */
        product_status?: ProductStatus | null;
        /** Created At  Lte */
        created_at__lte?: string | null;
        /** Created At  Gte */
        created_at__gte?: string | null;
        /** Expire Date  Lte */
        expire_date__lte?: string | null;
        /** Expire Date  Gte */
        expire_date__gte?: string | null;
        /** Type */
        type?: OrderType | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/orders/export/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name CreateOrderApiV1OrderPost
     * @summary Create Order
     * @request POST:/api/v1/order/
     */
    createOrderApiV1OrderPost: (
      data: OrderCreate,
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/order/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name ReadOrdersApiV1OrdersGet
     * @summary Read Orders
     * @request GET:/api/v1/orders/
     */
    readOrdersApiV1OrdersGet: (
      query?: {
        /**
         * Page
         * @default 1
         */
        page?: number;
        /**
         * Size
         * @default 10
         */
        size?: number;
        /** Store Id */
        store_id?: number | null;
        /** Product Id */
        product_id?: number | null;
        /** Product Status */
        product_status?: ProductStatus | null;
        /** Created At  Lte */
        created_at__lte?: string | null;
        /** Created At  Gte */
        created_at__gte?: string | null;
        /** Expire Date  Lte */
        expire_date__lte?: string | null;
        /** Expire Date  Gte */
        expire_date__gte?: string | null;
        /** Type */
        type?: OrderType | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/orders/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name ReadOrderApiV1OrderOrderIdGet
     * @summary Read Order
     * @request GET:/api/v1/order/{order_id}/
     */
    readOrderApiV1OrderOrderIdGet: (
      orderId: number,
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/order/${orderId}/`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Update an order with ACID transaction support to ensure data consistency.
     *
     * @tags orders
     * @name UpdateOrderApiV1OrderOrderIdPatch
     * @summary Update Order
     * @request PATCH:/api/v1/order/{order_id}/
     */
    updateOrderApiV1OrderOrderIdPatch: (
      orderId: number,
      data: OrderUpdate,
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/order/${orderId}/`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags orders
     * @name DeleteOrderApiV1OrderOrderIdDelete
     * @summary Delete Order
     * @request DELETE:/api/v1/order/{order_id}/
     */
    deleteOrderApiV1OrderOrderIdDelete: (
      orderId: number,
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/order/${orderId}/`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * @description Transfer products between stores by creating two orders: 1. Outbound order from source store 2. Inbound order to destination store Uses ACID transaction to ensure both orders are created successfully or both fail.
     *
     * @tags orders
     * @name TransferProductApiV1TransferPost
     * @summary Transfer Product
     * @request POST:/api/v1/transfer/
     */
    transferProductApiV1TransferPost: (
      data: TransferRequest,
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/transfer/`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Get report showing total quantities grouped by store and product.
     *
     * @tags reports
     * @name GetStoreProductQuantitiesReportApiV1ReportsStoreProductQuantitiesGet
     * @summary Get Store Product Quantities Report
     * @request GET:/api/v1/reports/store-product-quantities/
     */
    getStoreProductQuantitiesReportApiV1ReportsStoreProductQuantitiesGet: (
      query?: {
        /** Category Id */
        category_id?: number | null;
        /** Product Id */
        product_id?: number | null;
        /** Store Id */
        store_id?: number | null;
        /** Min Quantity */
        min_quantity?: number | null;
        /** Max Quantity */
        max_quantity?: number | null;
        /**
         * Include Zero Quantity
         * @default true
         */
        include_zero_quantity?: boolean | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/reports/store-product-quantities/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Get report showing products sorted by proximity to their warning threshold.
     *
     * @tags reports
     * @name GetThresholdProximityReportApiV1ReportsThresholdProximityGet
     * @summary Get Threshold Proximity Report
     * @request GET:/api/v1/reports/threshold-proximity/
     */
    getThresholdProximityReportApiV1ReportsThresholdProximityGet: (
      query?: {
        /** Category Id */
        category_id?: number | null;
        /** Product Id */
        product_id?: number | null;
        /** Min Quantity */
        min_quantity?: number | null;
        /** Max Quantity */
        max_quantity?: number | null;
        /**
         * Include Zero Quantity
         * @default true
         */
        include_zero_quantity?: boolean | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/reports/threshold-proximity/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Export store-product quantities report to Excel with Persian headers.
     *
     * @tags reports
     * @name ExportStoreProductQuantitiesExcelApiV1ReportsStoreProductQuantitiesExportGet
     * @summary Export store-product quantities report to Excel
     * @request GET:/api/v1/reports/store-product-quantities/export/
     */
    exportStoreProductQuantitiesExcelApiV1ReportsStoreProductQuantitiesExportGet:
      (
        query?: {
          /** Category Id */
          category_id?: number | null;
          /** Product Id */
          product_id?: number | null;
          /** Store Id */
          store_id?: number | null;
          /** Min Quantity */
          min_quantity?: number | null;
          /** Max Quantity */
          max_quantity?: number | null;
          /**
           * Include Zero Quantity
           * @default true
           */
          include_zero_quantity?: boolean | null;
        },
        params: RequestParams = {},
      ) =>
        this.request<string, HTTPValidationError>({
          path: `/api/v1/reports/store-product-quantities/export/`,
          method: "GET",
          query: query,
          format: "json",
          ...params,
        }),

    /**
     * @description Export threshold proximity report to Excel with Persian headers.
     *
     * @tags reports
     * @name ExportThresholdProximityExcelApiV1ReportsThresholdProximityExportGet
     * @summary Export threshold proximity report to Excel
     * @request GET:/api/v1/reports/threshold-proximity/export/
     */
    exportThresholdProximityExcelApiV1ReportsThresholdProximityExportGet: (
      query?: {
        /** Category Id */
        category_id?: number | null;
        /** Product Id */
        product_id?: number | null;
        /** Min Quantity */
        min_quantity?: number | null;
        /** Max Quantity */
        max_quantity?: number | null;
        /**
         * Include Zero Quantity
         * @default true
         */
        include_zero_quantity?: boolean | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/v1/reports/threshold-proximity/export/`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),
  };
}
