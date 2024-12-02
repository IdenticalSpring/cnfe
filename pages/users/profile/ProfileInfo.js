import React, { useEffect, useState } from 'react';
import { Card, Skeleton, Descriptions, Badge } from 'antd';
import { UserOutlined, MailOutlined, TagOutlined, SolutionOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { userAPI } from '@/service/user';

const ProfileCard = styled(Card)`
  margin-bottom: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const ProfileInfo = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await userAPI.fetchProfile();
                setProfile(profileData);  // Lưu dữ liệu profile
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false); // Đảm bảo loading = false sau khi đã gọi API
            }
        };

        fetchProfile();  // Gọi hàm fetch profile khi component mount
    }, []);

    // Hiển thị skeleton khi đang tải
    if (loading) {
        return (
            <ProfileCard
                title={
                    <div>
                        <UserOutlined style={{ marginRight: 8 }} />
                        Profile Information
                    </div>
                }
            >
                <Skeleton active paragraph={{ rows: 4 }} />
            </ProfileCard>
        );
    }

    // Nếu không có profile
    if (!profile) {
        return <div>No profile data found.</div>;
    }

    // Hiển thị profile trong card
    return (
        <ProfileCard
            title={
                <div>
                    <UserOutlined style={{ marginRight: 8 }} />
                    Profile Information
                </div>
            }
        >
            <Descriptions bordered column={1}>
                <Descriptions.Item label={<><SolutionOutlined /> Name</>}>
                    {profile.name}
                </Descriptions.Item>
                <Descriptions.Item label={<><MailOutlined /> Email</>}>
                    {profile.email}
                </Descriptions.Item>
                <Descriptions.Item label={<><TagOutlined /> Username</>}>
                    {profile.username}
                </Descriptions.Item>
                <Descriptions.Item label="Role">
                    <Badge
                        status={profile.role === 'ADMIN' ? 'success' : 'default'}
                        text={profile.role}
                    />
                </Descriptions.Item>
            </Descriptions>
        </ProfileCard>
    );
};

export default ProfileInfo;
