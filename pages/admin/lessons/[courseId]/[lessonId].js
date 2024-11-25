import { useRouter } from 'next/router';
import EditLesson from '../EditLesson';

const EditLessonPage = () => {
  const router = useRouter();
  const { courseId, lessonId } = router.query;

  if (!courseId || !lessonId) {
    return <div>Loading...</div>;
  }

  return <EditLesson courseId={courseId} lessonId={lessonId} />;
};

export default EditLessonPage;