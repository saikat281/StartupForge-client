"use client";

import { ArrowRight } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { Building2, Tag } from "lucide-react";
import Link from "next/link";

const StartupsComponent = ({ startups }) => {
    // console.log(startups);
    if (!startups || startups.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
                <Building2 className="mx-auto text-gray-300" size={32} />
                <p className="text-sm text-gray-500 mt-3">No startups found.</p>
            </div>
        );
    }

    return (
        // <Link href={`/startups/${startups?._id}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {startups.map((startup) => (
                <div
                    key={startup._id}
                    className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="flex items-start gap-4">
                        {startup.image ? (
                            <img
                                src={startup.image}
                                alt={startup.name}
                                className="h-14 w-14 rounded-lg object-cover border border-gray-200 shrink-0"
                            />
                        ) : (
                            <div className="h-14 w-14 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                                <Building2 className="text-blue-600" size={24} />
                            </div>
                        )}
                        <div className="min-w-0 flex-1">
                            <p className="text-base font-semibold text-gray-900 truncate">
                                {startup.name || "Untitled Startup"}
                            </p>
                            <p className="text-sm  text-gray-400 ">
                                {startup.description || "Untitled Startup"}
                            </p>
                            <div className=" flex flex-row w-full justify-between items-center">
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {(startup.industry || "Not specified")
                                        .split(",")
                                        .map((ind) => ind.trim())
                                        .filter(Boolean)
                                        .map((ind) => (
                                            <span
                                                key={ind}
                                                className="flex items-center gap-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1"
                                            >
                                                <Tag size={11} />
                                                {ind}
                                            </span>
                                        ))}
                                </div>

                                <div>
                                    <Link
                                        href={`/startups/${startup?._id}`}
                                        className="flex items-center gap-2 rounded-lg bg-black  text-white text-sm font-semibold px-4 py-2 hover:bg-gray-700 transition-colors w-full sm:w-auto justify-center cursor-pointer"
                                    >
                                        View
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>

                        </div>



                    </div>
                </div>
            ))}
        </div>
        // </Link>
    );
};

export default StartupsComponent;