import { useRouter } from 'next/router';
import EditCompany from './EditCompany';

const EditCompanyPage = () => {
   const router = useRouter();
   const { id } = router.query;

   if (!id) {
       return <div>Loading...</div>;
   }

   return <EditCompany companyId={id} />;
};

export default EditCompanyPage;