import React from 'react'

const Navbar = () => {
    return (
        <div className='navbar navbar-expand-lg navbar-dark bg-dark text-white'>
            <a href="/" className='navbar-brand'>Adeeb Ahmed</a>
            <div className='collapse navbar-collapse' id='navbarNavDropdown'>
                <ul className='navbar-nav'>
                    <li className='nav-item active'>
                        <a href='/' className='nav-link'>
                            Home
                        </a>
                    </li>
                    <li className='nav-item active'>
                        <a href='/about' className='nav-link'>
                            About
                        </a>
                    </li>
                    <li className='nav-item active'>
                        <a href='/cards' className='nav-link'>
                            Cards
                        </a>
                    </li>
                    <li className='nav-item active'>
                        <a href='/table' className='nav-link'>
                            Table
                        </a>
                    </li>
                    <li className='nav-item active'>
                        <a href='/form' className='nav-link'>
                            Form
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar