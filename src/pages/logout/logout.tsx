import { useQueryClient } from '@tanstack/react-query';
import { useAsync } from 'react-async-hook';
import { useNavigate } from 'react-router-dom';

import { clearToken } from '../../api/api/api.ts';

export function Logout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useAsync(async () => {
    clearToken();
    await queryClient.invalidateQueries();
    navigate('/');
  }, []);

  return <h1>Logout</h1>;
}
