import React from "react";
import { Link } from "react-router-dom";
import image from "../image.png";
import stocks_market from "../analytics.gif";
import news from "../news.gif";
import investment from "../investment.gif";
import ContactForm from "./ContactForm";

const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col gap-12">
            <header className="flex justify-between items-center p-2 bg-white shadow-lg">
                <div className="flex items-center">
                    <img src={image} width={110} height={110} alt="Stocks Byte Logo" />
                    <h1 className="text-3xl font-bold ml-4" style={{ fontFamily: "Poppins" }}>
                        Stocks Byte
                    </h1>
                </div>
                <nav className="flex space-x-12">
                    <Link to="/" className="text-2xl font-semibold text-gray-700 hover:text-blue-600">Products</Link>
                    <Link to="/" className="text-2xl font-semibold text-gray-700 hover:text-blue-600">About Us</Link>
                    <Link to="/" className="text-2xl font-semibold text-gray-700 hover:text-blue-600">Contact</Link>
                </nav>
                <div className="flex space-x-4">
                    <Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Login</Link>
                    <Link to="/signup" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Signup</Link>
                </div>
            </header>

            <div className="flex-grow flex justify-center items-center text-center p-8 mb-12">
                <div>
                    <div className="flex-grow items-center justify-center gap-8 flex">
                        <h2 className="text-4xl font-bold mt-12">Welcome to Stocks Byte !</h2>
                        <img src={stocks_market} width={180} height={180} />
                    </div>
                    <p className="text-xl mb-12" style={{ fontFamily: 'Poppins' }}>
                        Empowering investors with real-time data, powerful tools, and expert insights to make informed stock market decisions.
                    </p>
                    <Link to="/signup" className="px-6 py-3 mt-8 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Get Started Now</Link>
                </div>
            </div>

            <section className="bg-gray-50 py-16 mb-12">
                <div className="text-center">
                    <div className="flex flex-grow justify-center items-center gap-8">
                        <h2 className="text-3xl font-semibold mt-2" style={{ fontFamily: "Poppins" }}>Who We Are</h2>
                        <img src={news} alt="" width={80} height={80} />
                    </div>
                    <p className="text-lg mx-auto max-w-3xl" style={{ fontFamily: "Poppins" }}>
                        Stocks Byte is a leading platform that provides cutting-edge stock market analysis, real-time data, and intuitive tools designed for both novice and experienced investors. Our mission is to make stock trading accessible to everyone, by simplifying complex data and providing actionable insights.
                    </p>
                </div>
            </section>

            <section className="py-16 mb-12">
                <div className="text-center">
                    <div className="flex flex-grow justify-center items-center gap-8">
                        <h2 className="text-3xl font-semibold mt-2" style={{ fontFamily: "Poppins" }}>Our Products</h2>
                        <img src={investment} alt="" width={80} height={80} />
                    </div>
                    <p className="text-lg mb-8" style={{ fontFamily: "Poppins" }}>
                        Explore our premium tools and services designed to help you navigate the stock market with confidence.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-16 py-8">
                        <div className="border p-4 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "Poppins" }}>Stock Tracker</h3>
                            <p style={{ fontFamily: "Poppins" }}>Real-time stock price updates to keep you ahead of the market.</p>
                        </div>
                        <div className="border p-4 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "Poppins" }}>Stock Alerts</h3>
                            <p style={{ fontFamily: "Poppins" }}>Get notified about stock price movements and news.</p>
                        </div>
                        <div className="border p-4 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "Poppins" }}>Portfolio Tracker</h3>
                            <p style={{ fontFamily: "Poppins" }}>Manage your investments with ease and track your portfolio's performance.</p>
                        </div>
                    </div>
                </div>
            </section>

            <ContactForm />

            {/* Footer Section */}
            <footer className="bg-gray-100 py-4 text-center">
                <p className="text-sm text-gray-600">© 2024 Stocks Byte. All Rights Reserved. | Privacy Policy | Terms of Service</p>
            </footer>
        </div>

    );
};

export default LandingPage;
