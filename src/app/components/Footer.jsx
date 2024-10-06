'use client';
import { useEffect, useState } from 'react';

const Footer = () => {
    const [footerText, setFooterText] = useState('');

    useEffect(() => {
        showFooter();
    }, []); // Solo ejecutar al montar el componente

    const showFooter = () => {
        const fecha = new Date();
        setFooterText(`Monitor Web ${fecha.getFullYear()}.`);
    };

    return (
        <footer className="rounded-lg shadow dark:bg-gray-900 m-4 py-0">
            <div className="w-full max-w-screen-xl mx-auto p-4">
                <span id="textFooter" className="block text-sm text-white sm:text-center dark:text-gray-400 border-t-2 pt-2">
                    {footerText}
                </span>
            </div>
        </footer>
    );
};

export default Footer;
