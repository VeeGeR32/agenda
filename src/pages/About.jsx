import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AboutForm from '../components/AboutForm'

const About = () => {
    return (
        <div className='h-screen flex flex-col justify-between'>
            <Navbar />
            <AboutForm/>
            <Footer />
        </div>
    );
};

export default About;