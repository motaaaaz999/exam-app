export type UserResetData = {
  email: string;
  newPassword: string;
};

export type ResetPasswordResponse = {
  message: string;
  token: string;
  code: number;
};
