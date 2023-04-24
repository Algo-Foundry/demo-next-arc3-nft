import React from "react";
import DropdownMenu from "./DropdownMenu";

export default function Navbar() {
    return (
        <nav className="bg-teal-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-end h-16">
                    <div className="md:block">
                        <div className="ml-4 flex items-center">
                            <DropdownMenu/>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
