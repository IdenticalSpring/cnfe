import { useRouter } from 'next/router';
import EditChapter from './EditChapter';

const EditChapterPage = () => {
   const router = useRouter();
   const { id } = router.query;

   if (!id) {
       return <div>Loading...</div>;
   }

   return <EditChapter chapterId={id} />;
};

export default EditChapterPage;