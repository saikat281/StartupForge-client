import { Button } from "@heroui/react";
import Link from "next/link";


const Navbar = () => {
    return (
        <div className="bg-red-200 w-full max-w-7xl mx-auto">
            <nav className=" flex justify-between items-center bg-green-50">

                <div className="flex gap-10 items-center">
                    <div>
                        <h1 className="text-3xl font-bold">StartUpForge</h1>
                    </div>
                    <div>
                        <ul className="flex gap-6 items-center ">
                            <li>Home</li>
                            <li>Browse Startups</li>
                            <li>Browse Opportunities</li>
                        </ul>
                    </div>
                </div>

                <div>
                    <Link href={'/login'}>
                        <Button>Login</Button>
                    </Link>
                    <Link href={'/signup'}>
                        <Button>get started</Button>
                    </Link>

                </div>
            </nav>
        </div>

    );
};

export default Navbar;