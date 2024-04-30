import React from 'react';
import { FaDiscord, FaGithub } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";


const Footer = () => {
    return (
        <footer className="py-4 flex items-center justify-center gap-5">
                <FaDiscord size={20} style={{cursor:'pointer'}}/>
                <AiFillInstagram size={20} style={{cursor:'pointer'}}/>
                <FaGithub size={20} style={{cursor:'pointer'}}/>
        </footer>
    );
};

export default Footer;