import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
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