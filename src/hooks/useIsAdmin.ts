import { useAuth } from './useAuth';

export function useIsAdmin() {
  const { user } = useAuth();

  if (!user) return false;

  if (!user.roles) return false;

  return user.roles.includes('admin');
}
