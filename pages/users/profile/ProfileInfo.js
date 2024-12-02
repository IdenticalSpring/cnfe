import React, { useEffect, useState } from 'react';
import { request } from '@/config/request';

const ProfileInfo = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await request.get('/auth/profile');
                setProfile(response.data.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);  // Chạy 1 lần khi component mount

    if (!profile) return <div>Loading...</div>;

    return (
        <div>
            <h2>Profile Information</h2>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Role:</strong> {profile.role}</p>
        </div>
    );
};

export default ProfileInfo;
