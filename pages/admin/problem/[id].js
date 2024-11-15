import { useRouter } from 'next/router';
import EditProblem from './EditProblem';

const EditProblemPage = () => {
   const router = useRouter();
   const { id } = router.query;

   if (!id) {
       return <div>Loading...</div>;
   }

   return <EditProblem problemId={id} />;
};

export default EditProblemPage;