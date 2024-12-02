import { useRouter } from 'next/router';
import EditTopic from './EditTopic';

const EditTopicPage = () => {
   const router = useRouter();
   const { id } = router.query;

   if (!id) {
       return <div>Loading...</div>;
   }

   return <EditTopic topicId={id} />;
};

export default EditTopicPage;