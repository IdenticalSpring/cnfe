import { useRouter } from 'next/router';
import EditCourse from './EditCourse';

const EditCoursePage = () => {
   const router = useRouter();
   const { id } = router.query;

   if (!id) {
       return <div>Loading...</div>;
   }

   return <EditCourse courseId={id} />;
};

export default EditCoursePage;