import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');

      if (!token) {
        router.replace('/login'); // Redirige vers la page de connexion si le token n'existe pas
      }
    }, []);

    if (typeof window === 'undefined') {
      return null; // Retourne null si le code s'exécute côté serveur
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;