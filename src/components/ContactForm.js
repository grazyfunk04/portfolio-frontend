import React, { useState } from 'react';
import stock_market from "../stock-market.gif";

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-lg mx-auto text-center">
        <div className='flex flex-grow justify-center items-center gap-8'>
          <h2 className="text-3xl font-semibold mt-2" style={{ fontFamily: "Poppins" }}>Get in Touch</h2>
          <img src={stock_market} alt="" width={80} height={80} />
        </div>
        <p className="text-lg mb-8" style={{ fontFamily: "Poppins" }}>We would love to hear from you! Please fill out the form below, and our team will get back to you as soon as possible.</p>

        {status && (
          <div className={`mb-4 ${status === 'success' ? 'text-green-600' : 'text-red-600'}`} style={{ fontFamily: "Poppins" }}>
            {status === 'success' ? 'Your message has been sent successfully!' : 'Something went wrong. Please try again.'}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-semibold" style={{ fontFamily: "Poppins" }}>Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-semibold" style={{ fontFamily: "Poppins" }}>Your Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-lg font-semibold" style={{ fontFamily: "Poppins" }}>Your Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
