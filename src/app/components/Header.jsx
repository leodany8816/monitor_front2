'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Toast } from 'primereact/toast';
import Spinner from "../components/Spinner";
import Image from 'next/image'

const Header = () => {
    const [nameEmp, setNameEmp] = useState(null);
    const [logoEmp, setLogoEmp] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const toast = useRef(null);
    const path_img = 'https://bekaert.grupo-citi.com/';

    useEffect(() => {

        fetchHeader();
    }, [])

    const fetchHeader = async () => {
        try {
            // const res = await fetch("http://127.0.0.1:8000/api/encabezado", {
            const res = await fetch("https://apis.grupo-citi.com/api/encabezado", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            let data = await res.json();
            //console.log(data);
            if (data.exito) {
                setNameEmp(data.nombre);
                setLogoEmp(data.logo);
            }
        } catch (error) {
            showError("Error en el servicio " + error);
            router.push('/');
        }
    }

    const Logout = async () => {
        console.log('Imagen clickeada');
        setLoading(true);
        try {
            // const res = await fetch("http://127.0.0.1:8000/api/logout",
            const res = await fetch("https://apis.grupo-citi.com/api/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await res.json();
            if (data.success) 
                router.push('/');
        } catch (error) {
            showError(`Error en el servicio: ${error}`);
        }finally{
            setLoading(false);
        }
    };

    /**
 * usamos Toast de primereact para mostrar los mensaje de error
 * @param {*} texto 
 */
    const showError = (texto) => {
        if (toast.current)
            toast.current.show({ severity: 'error', summary: 'Error', detail: `${texto}`, life: 3000 });
    }
    return (
        <header className="bg-white border border-gray-800 rounded-lg shadow-lg">
            {/* <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8"> */}
            <div>
                <Toast ref={toast} />
                {loading &&
                    <div className='mt-1'><Spinner /></div>

                }
            </div>
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-2">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div className="flex items-center">
                        <Image
                            src={`${path_img}logos/${logoEmp}`}
                            alt={`${nameEmp}`}
                            width={800}
                            height={500}
                        />
                    </div>
                    <div className="flex items-center text-gray-500 dark:text-gray-500 text-3xl">
                        {nameEmp}
                    </div>
                    <div className="flex items-center">
                        <Image
                            src={`${path_img}img/officon.png`}
                            alt={`${nameEmp}`}
                            className="h-auto max-w-[5rem] ms-auto"
                            width={800}
                            height={500}
                            onClick={() => Logout()}
                            style={{ cursor: 'pointer' }}
                        />
                    </div>
                </div>
            </div>
        </header>

    );
}

export default Header

