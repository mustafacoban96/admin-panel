import React from 'react';
import logo from "../../assets/SANKOLogo-02.png";
import { DASHBOARD_SIDEBAR_BOTTOM_LINKS, DASHBOARD_SIDEBAR_LINKS } from '../../library/constant';
import { Link, useLocation } from 'react-router';
import classNames from 'classnames';
import { HiOutlineLogout } from 'react-icons/hi';
import useAuthService from '../../services/auth-service'; // Burada import ettiğinizden emin olun.

const linkClass = 'flex items-center gap-2 font-light px-3 py-2 hover:bg-gray-200 hover:no-underline active:bg-gray-300 rounded-sm text-base';

const SidebarLink = ({ item }) => {
    const { pathname } = useLocation();
    const { logoutApi } = useAuthService(); // logoutApi'yi burada alıyoruz

    return (
        <Link 
            to={item.path}
            className={classNames(pathname === item.path ? 'bg-gray-300' : '', linkClass)}
        >
            <span className='text-xl text-lIcon dark:text-dIcon'>{item.icon}</span>
            <p className='text-lText dark:text-dText'>{item.label}</p>
        </Link>
    );
};

const SideBar = () => {
    const { logoutApi } = useAuthService(); // Burada da logoutApi'yi alıyoruz

    return (
        <div className='fixed bg-lightBack dark:bg-darkBack w-60 p-3 flex flex-col shadow-md h-screen'>
            {/* logo part */}
            <div className='flex flex-col items-center gap-2 px-1 py-1'>
                <img src={logo} className='w-2/3' />
                <p className='text-lg text-center font-bold text-ltxtTitle dark:text-darkTxtTitle'>Sanko Panel</p>
            </div>

            {/* upper part */}
            <div className='flex-1 py-8 flex-col gap-0.5'>
                {DASHBOARD_SIDEBAR_LINKS.map((item) => (
                    <SidebarLink key={item.key} item={item} />
                ))}
            </div>

            {/* bottom part */}
            <hr className="h-px mb-2 bg-gray-400 border-0"></hr>
            <div>
                {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
                    <SidebarLink key={item.key} item={item} />
                ))}
                <div onClick={logoutApi} className={classNames(linkClass, 'cursor-pointer text-red-500')}>
                    <span className="text-xl">
                        <HiOutlineLogout />
                    </span>
                    Logout
                </div>
            </div>
        </div>
    );
};

export default SideBar;
