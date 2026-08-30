import { getTokenServer } from "@/lib/actions/getTokenServer";
import { Receipt, Copy } from "lucide-react";

const STATUS_STYLES = {
  completed: "bg-green-50 text-green-700",
  pending: "bg-yellow-50 text-yellow-700",
  failed: "bg-red-50 text-red-700",
};

const StatusBadge = ({ status }) => {
  const normalized = (status || "pending").toLowerCase();
  const style = STATUS_STYLES[normalized] || "bg-gray-100 text-gray-600";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ${style}`}
    >
      {normalized}
    </span>
  );
};

const truncateId = (id) => {
  if (!id) return "—";
  if (id.length <= 18) return id;
  return `${id.slice(0, 10)}...${id.slice(-6)}`;
};

const AdminTransactionsPage = async () => {
  const token = await getTokenServer();
  const res = await fetch(`${process.env.SERVER_URL}/payment`, {
    headers: {
      authorization: `Bearer ${token}`,

    }
  });
  const paymentData = await res.json();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Transactions</h1>
        <p className="text-sm text-gray-500 mt-1">
          View all payment transactions across the platform.
        </p>
      </div>

      {(!paymentData || paymentData.length === 0) ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
          <Receipt className="mx-auto text-gray-300" size={32} />
          <p className="text-sm text-gray-500 mt-3">
            No transactions have been recorded yet.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left font-medium text-gray-500 px-5 py-3 whitespace-nowrap">
                    User
                  </th>
                  <th className="text-left font-medium text-gray-500 px-5 py-3 whitespace-nowrap">
                    Amount
                  </th>
                  <th className="text-left font-medium text-gray-500 px-5 py-3 whitespace-nowrap">
                    Transaction ID
                  </th>
                  <th className="text-left font-medium text-gray-500 px-5 py-3 whitespace-nowrap">
                    Paid At
                  </th>
                  <th className="text-left font-medium text-gray-500 px-5 py-3 whitespace-nowrap">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paymentData.map((payment) => (
                  <tr key={payment._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-gray-900 whitespace-nowrap">
                      {payment.user || "Not available"}
                    </td>
                    <td className="px-5 py-3.5 text-gray-900 font-medium whitespace-nowrap">
                      ${payment.amount ?? "—"}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span
                        className="font-mono text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded px-2 py-1"
                        title={payment.session_id}
                      >
                        {truncateId(payment.session_id)}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">
                      {payment.Date || "—"}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <StatusBadge status={payment.payment_status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTransactionsPage;