
import { ManageOpportunityTable } from "@/Components/founder/ManageOpportunityTable";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";


const ManageOpportunitiesPage = async () => {


    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user;
    //   console.log(user)  //id //_id

    const res = await fetch(`${process.env.SERVER_URL}/opportunities`);
    const Userdata = await res.json();
    // console.log(Userdata); 

    const filterData = Userdata?.filter(data => data?.userId == user?.id)
    // console.log(filterData.id);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-[60px]">Manage Opportunities</h1>
            <ManageOpportunityTable user={filterData}></ManageOpportunityTable>
        </div>
    );
};

export default ManageOpportunitiesPage;