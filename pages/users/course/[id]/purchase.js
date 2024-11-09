import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { userAPI } from '@/service/user';
import { Skeleton, Button, Select, message } from 'antd';

const { Option } = Select;

const PurchaseCourse = ({ onClose }) => {
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [discountCode, setDiscountCode] = useState(null);
    const [discounts, setDiscounts] = useState([]);
    const [finalPrice, setFinalPrice] = useState(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            setLoading(true);
            userAPI.getCourseById(id)
                .then(courseData => {
                    setCourse(courseData);
                    setFinalPrice(courseData.price);
                })
                .catch(error => console.error("Error fetching course data:", error))
                .finally(() => setLoading(false));

            userAPI.getAllCoupons()
                .then(response => {
                    const couponData = response.data || [];
                    setDiscounts(couponData);
                })
                .catch(error => console.error("Error fetching coupons:", error));
        }
    }, [id]);

    const handleDiscountChange = (selected) => {
        const selectedDiscount = discounts.find(discount => discount.id === selected.value);
        if (selectedDiscount) {
            setDiscountCode(selectedDiscount.id);
            const discountedPrice = course.price - (course.price * parseFloat(selectedDiscount.discountAmount)) / 100;
            setFinalPrice(discountedPrice);
        }
    };

    const handlePurchase = async () => {
        try {
            const userId = sessionStorage.getItem('userId'); // Retrieve userId from sessionStorage
            if (!userId) {
                message.error("User not logged in. Please log in to continue.");
                return;
            }

            const orderData = {
                userId: parseInt(userId, 10),
                courseId: parseInt(id, 10),
                discountId: discountCode ? parseInt(discountCode, 10) : undefined,
                paymentStatus: 'pending',
            };

            const response = await userAPI.createOrder(orderData);
            const checkoutUrl = response.data?.checkoutUrl;

            if (checkoutUrl) {
                window.location.href = checkoutUrl;
            } else {
                message.error("Order created, but no checkout URL found.");
            }
        } catch (error) {
            console.error("Error purchasing course:", error.message);
            message.error("Error during purchase. Please try again later.");
        }
    };

    return (
        <div>
            {loading ? (
                <Skeleton active paragraph={{ rows: 4 }} />
            ) : (
                <div>
                    <h1>{course.title}</h1>
                    <p>{course.description}</p>
                    <p>Original Price: ${course.price}</p>
                    <p>Final Price: ${finalPrice}</p>

                    <Select
                        placeholder="Select a discount"
                        onChange={handleDiscountChange}
                        labelInValue
                        style={{ width: '100%', marginBottom: '10px' }}
                    >
                        {discounts.map(discount => (
                            <Option key={discount.id} value={discount.id} label={`${discount.code} - ${discount.discountAmount}%`}>
                                {discount.code} - {discount.discountAmount}%
                            </Option>
                        ))}
                    </Select>

                    <Button type="primary" onClick={handlePurchase}>
                        Proceed to Payment
                    </Button>
                    <Button type="default" onClick={onClose} style={{ marginLeft: '10px' }}>
                        Cancel
                    </Button>
                </div>
            )}
        </div>
    );
};

export default PurchaseCourse;
