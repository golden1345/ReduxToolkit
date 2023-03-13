import React from 'react';
import { Link } from 'react-router-dom';

export function Navigation(){
    return (
        <nav className='flex justify-between items-center h-[50px] shadow-md bg-gray-500 text-white px-3'>
            <h3>
                Git search
            </h3>

            <span>
                <Link to="/" className='mr-2'>
                    Home
                </Link>
                <Link to="/favourites" className='mr-2'>
                Favourites
                </Link>
            </span>
        </nav>
    )
}
