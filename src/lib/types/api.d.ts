interface ErrorResponse {
  message: string;
  code: string;
}
// <T> is The rest of all properties (dynamic like data is changed) showed in success response
type SuccessResponse<T> = {
  message: string;
} & T; // extends
type ApiResponse<T> = ErrorResponse | SuccessResponse<T>;
