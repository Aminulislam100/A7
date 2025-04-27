import React from 'react';

const Hero = () => {
    return (
        <div
          className="hero h-130"
          style={{
            backgroundImage: `url(/images/Banner-min.jpg)`,
          }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-content text-neutral-content -ml-190">
            <div className="max-w-md">
              <h1 className="mb-5 text-4xl font-medium">
                Bid on Unique Items from Around the World
              </h1>
              <p className="mb-5">
                Discover rare collectibles, luxury goods, and vintage treasures in our curated auctions
              </p>
              <button className="btn rounded-full">Explore Auctions</button>
            </div>
          </div>
        </div>
    );
};

export default Hero;
