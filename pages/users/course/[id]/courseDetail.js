import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CourseDetail = () => {
    const [course, setCourse] = useState(null);
    const router = useRouter();
    const { id } = router.query; 

    useEffect(() => {
        if (id) {
            axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${id}`)
                .then(response => setCourse(response.data))
                .catch(error => console.error("Error fetching course details:", error));
        }
    }, [id]);

    if (!course) return <div>Loading...</div>;

    return (
        <div>
            <h1>{course.title}</h1>
            <p>{course.description}</p>
            <img src={course.imageUrl || "/api/placeholder/400/225"} alt={course.title} />
        
        </div>
    );
};

export default CourseDetail;
