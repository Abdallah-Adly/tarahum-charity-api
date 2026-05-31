export type ApiResponse<T> = {
    message?: string;
    errors?: string[];
    data?: T;
};
