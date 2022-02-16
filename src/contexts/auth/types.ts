interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
}

interface SignUpParams {
  email: string;
  password: string;
  full_name: string;
}

interface SignInParams {
  email?: string;
  password?: string;
  provider?: 'google';
}

interface AuthContextData {
  user?: User;
  signUp: (user: SignUpParams) => Promise<void>;
  signIn: (params: SignInParams) => Promise<void>;
  signOut: () => Promise<void>;
}

export type { User, SignInParams, SignUpParams, AuthContextData };
