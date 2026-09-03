
import { ManageOpportunityTable } from "@/Components/founder/ManageOpportunityTable";

import { auth } from "@/lib/auth";
import { ClipboardList } from "lucide-react";
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
    console.log(filterData);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-[60px]">Manage Opportunities</h1>
            {filterData.length == 0 ? (
                <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
                    <ClipboardList className="mx-auto text-gray-300" size={32} />
                    <p className="text-sm text-gray-500 mt-3">
                        No opportunities have been received yet.
                    </p>
                </div>
            ) : (
                <ManageOpportunityTable user={filterData}></ManageOpportunityTable>
            )

            }

        </div >
    );
};

export default ManageOpportunitiesPage;