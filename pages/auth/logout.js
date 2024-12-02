import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { notification } from 'antd';

const useCheckTokenExpiration = () => {
    const router = useRouter();

    useEffect(() => {
        const checkTokenExpiration = () => {
            const tokenExpiration = sessionStorage.getItem('tokenExpiration');
            const currentTime = Math.floor(Date.now() / 1000);

            if (tokenExpiration && currentTime > tokenExpiration) {
                console.log('Token has expired, logging out...');
                notification.warning({
                    message: 'Session Expired',
                    description: 'Your session has expired. Please log in again.',
                    duration: 5,
                });
            }
        };


        const intervalId = setInterval(checkTokenExpiration, 30000);  
        return () => clearInterval(intervalId);
    }, [router]);

    const logoutUser = () => {
        console.log('Logging out user...');
        sessionStorage.removeItem('userId');
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('userRole');
        sessionStorage.removeItem('tokenExpiration');
        sessionStorage.removeItem('token');
        router.push('/auth/login');
    };
};

export default useCheckTokenExpiration;
