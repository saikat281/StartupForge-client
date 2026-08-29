import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import { CheckCircle2, Mail, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { payment } from '@/lib/actions/payment'

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user;

    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1; // getMonth() is 0-based
    const year = now.getFullYear();
    const Current_date = `${day}/${month}/${year}`;

    // console.log(day, month, year);

    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    const {
        status,
        customer_details: { email: customerEmail }
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    if (status === 'open') {
        return redirect('/')
    }

    if (status === 'complete') {

        await payment({ user, session_id,Current_date });


        return (
            <section
                id="success"
                className="min-h-screen flex items-center justify-center bg-gray-50 p-6"
            >
                <div className="w-full max-w-md">
                    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                        {/* Header */}
                        <div className="bg-gray-900 px-6 py-10 text-white text-center">
                            <div className="mx-auto h-16 w-16 rounded-full bg-white/10 flex items-center justify-center">
                                <CheckCircle2 size={34} className="text-green-400" />
                            </div>
                            <div className="flex items-center justify-center gap-1.5 mt-5">
                                <Sparkles size={14} className="text-yellow-300" />
                                <p className="text-xs font-medium text-gray-300 uppercase tracking-wide">
                                    Payment Successful
                                </p>
                            </div>
                            <h1 className="text-xl font-semibold mt-1">You are all set!</h1>
                        </div>

                        {/* Body */}
                        <div className="px-6 py-6 text-center">
                            <p className="text-sm text-gray-600 leading-relaxed">
                                We appreciate your business! A confirmation email will be sent to{' '}
                                <span className="font-medium text-gray-900">{customerEmail}</span>.
                            </p>

                            <div className="flex items-center justify-center gap-2 mt-5 rounded-lg bg-gray-50 border border-gray-100 px-4 py-3">
                                <Mail size={16} className="text-gray-400 shrink-0" />
                                <p className="text-sm text-gray-600">{customerEmail}</p>
                            </div>

                            <Link
                                href="/dashboard/founder/addOpportunity"
                                className="mt-6 w-full flex items-center justify-center gap-2 rounded-lg bg-gray-900 text-white text-sm font-medium px-5 py-2.5 hover:bg-gray-800 transition-colors"
                            >
                                Go to Add Opportunity
                                <ArrowRight size={15} />
                            </Link>

                            <p className="text-xs text-gray-400 mt-5">
                                Questions? Email us at{' '}
                                <a
                                    href="mailto:orders@example.com"
                                    className="font-medium text-gray-600 hover:underline"
                                >
                                    orders@example.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}