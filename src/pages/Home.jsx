import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HomeForm from '../components/HomeForm';

const Home = () => {
    return (
        <div className='h-screen flex flex-col justify-between'>
            <Navbar />
            <HomeForm/>
            <Footer />
        </div>
    );
};

export default Home;