import React from 'react';

const Footer = () => {
    return (
        <div className='w-[50%] mx-auto text-center gap-5 grid mt-50 mb-25'>
            <h1 className='text-2xl font-semibold text-blue-600'>Auction<span className='text-yellow-500 font-extrabold'>Gallery</span></h1>
            <h1>Bid.   Win.   Own.</h1>
            <div className="flex list-none text-md gap-4 w-[50%] mx-auto">
    <li>Home</li>
    <li>Auctions</li>
    <li>Categories</li>
    <li>How to works</li>
  </div>
  <h1>© 2025 AuctionHub. All rights reserved.</h1>
        </div>
    );
};

export default Footer;