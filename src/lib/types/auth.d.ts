interface LoginResponse {
  token: string;
  user: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    isVerified: boolean;
    createdAt: string;
    passwordChangedAt: string;
    passwordResetCode: string;
    passwordResetExpires: string;
    resetCodeVerified: boolean;
  };
}
//response ely byrg3l mn el login
