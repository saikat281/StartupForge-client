"use client"
import { Button } from '@heroui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navbar = () => {

    const pathname = usePathname();
    //console.log(pathname)

    if(pathname.includes("dashboard")){
        return null;
    }
    return (
        <div>
           <ul>
            <li>
                <Link href={"/signup"} > <Button>SignUp</Button> </Link>
            </li>
           </ul>
        </div>
    );
};

export default Navbar;