import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

export type msgFunction = (message: string) => void;


export const toastSuccessNotify: msgFunction = (msg) => {
    toast.success(msg, {
        icon: <span>✅</span>,
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        position: "top-center",
        draggablePercent: 60,
        theme: "light",
        progressStyle: {
            background: "#00345b",
            height: "5px",
        },
    });
};


const toastWarnNotify:msgFunction = (message) => {
    toast.warn(message,{
        autoClose: 2000,          
        hideProgressBar: false,   
        closeOnClick: true,      
        pauseOnHover: true,       
        draggable: true,         
        progress: undefined,      
        position: "top-center",   
        draggablePercent: 60,     
        theme: "colored",        
    });
};

export { ToastContainer, toastWarnNotify };

