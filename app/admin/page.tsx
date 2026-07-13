import { redirect } from 'next/navigation';

export default function AdminPage() {
   redirect('/admin/companies');

   return (
      <div>
         <h1>Admin Dashboard</h1>
      </div>
   );
}
