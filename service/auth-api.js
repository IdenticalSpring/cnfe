import { notification } from 'antd';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const registerUser = async (payload) => {
    const url = `${baseURL}/auth/register`;

    try {
        console.log('Sending payload:', payload); // Debug payload

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        console.log('Response Status:', response.status);

        const data = await response.json();
        console.log('API response:', data);

        if (response.ok) {
            notification.success({
                message: 'Success',
                description: 'User registered successfully',
                placement: 'bottomRight',
                duration: 3,
            });
            return { success: true, data };
        } else {
            notification.error({
                message: 'Error',
                description: data.message || 'Registration failed',
                placement: 'bottomRight',
                duration: 3,
            });
            return { success: false, message: data.message };
        }
    } catch (error) {
        console.error('Error:', error);
        notification.error({
            message: 'Error',
            description: 'Something went wrong. Please try again later.',
            placement: 'bottomRight',
            duration: 3,
        });
        return { success: false, message: 'Something went wrong. Please try again later.' };
    }
};
