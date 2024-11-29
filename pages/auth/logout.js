import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { notification } from 'antd';  // Import notification từ Ant Design

const useCheckTokenExpiration = () => {
    const router = useRouter();

    useEffect(() => {
        const checkTokenExpiration = () => {
            const tokenExpiration = sessionStorage.getItem('tokenExpiration');
            const currentTime = Math.floor(Date.now() / 1000);

            // Log ra tokenExpiration và currentTime để kiểm tra
            console.log('Token Expiration:', tokenExpiration);
            console.log('Current Time:', currentTime);

            if (tokenExpiration && currentTime > tokenExpiration) {
                console.log('Token has expired, logging out...');
                logoutUser();
                // Hiển thị thông báo
                notification.warning({
                    message: 'Session Expired',
                    description: 'Your session has expired. Please log in again.',
                    duration: 5, // Duration in seconds
                });
            }
        };


        const intervalId = setInterval(checkTokenExpiration, 30000);  

        // Dọn dẹp interval khi component bị unmount
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
