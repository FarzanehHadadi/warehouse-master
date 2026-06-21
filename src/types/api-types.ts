export interface DefaultResponse {
    code: number
    message: string
}

export interface ApiResponse<T> extends DefaultResponse {
    data: T
}
