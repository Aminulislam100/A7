import React, { useEffect, useState } from 'react';

const Items = () => {
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [disabledHearts, setDisabledHearts] = useState({});
  const [notification, setNotification] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetch('/items.json')
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  const handleAddFavorite = (item) => {
    if (!favorites.find(fav => fav.id === item.id)) {
      setFavorites([...favorites, { ...item }]);
      setDisabledHearts({ ...disabledHearts, [item.id]: true });

      setNotification('🦄 Item added to your Favorite List');
      setProgress(100);

      let start = Date.now();
      const duration = 3000;

      const interval = setInterval(() => {
        const elapsed = Date.now() - start;
        const newProgress = 100 - (elapsed / duration) * 100;
        setProgress(Math.max(0, newProgress));

        if (elapsed >= duration) {
          clearInterval(interval);
          setNotification(null);
          setProgress(0);
        }
      }, 30);
    }
  };

  const handleRemoveFavorite = (id) => {
    setFavorites(favorites.filter(item => item.id !== id));
    setDisabledHearts({ ...disabledHearts, [id]: false });
    
    setNotification('⚠🦄 Item removed from your Favorite List');
    setProgress(100);

    let start = Date.now();
    const duration = 3000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const newProgress = 100 - (elapsed / duration) * 100;
      setProgress(Math.max(0, newProgress));

      if (elapsed >= duration) {
        clearInterval(interval);
        setNotification(null);
        setProgress(0);
      }
    }, 30);
  };

  const totalBid = favorites.reduce((total, item) => total + item.currentBidPrice, 0);

  return (
    <div className="relative">

      {notification && (
        <div className="fixed top-5 right-5 bg-white border border-gray-300 shadow-md px-4 py-2 rounded-md text-sm text-gray-800 z-50 w-80">
          <div className="flex justify-between items-center">
            <p>{notification}</p>
            <button
              onClick={() => setNotification(null)}
              className="text-xl font-semibold cursor-pointer"
            >
              x
            </button>
          </div>
          <div className="w-full h-1 mt-2 bg-gray-200 rounded">
            <div
              className="h-full bg-blue-500 rounded transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex mt-40 mx-20 gap-10 items-start">
        <div className="w-[60%] border-2 p-4 rounded-2xl">
          <div className="navbar bg-base-100 shadow-sm border-b-2">
            <div className="navbar-start ml-5 list-none font-medium text-[15px]">
              <li>Items</li>
            </div>
            <div className="navbar-end hidden lg:flex">
              <ul className="menu menu-horizontal px-1 font-medium text-[15px] flex gap-5 mr-5">
                <li>Current Bid</li>
                <li>Time Left</li>
                <li>Bid Now</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {items.map(item => (
              <div key={item.id} className="border-b-2 navbar bg-base-100 shadow-sm p-4 flex justify-between items-center rounded-lg">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded" />
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-[15px]">
                  <span className="mr-5">${item.currentBidPrice}</span>
                  <span className="mr-4">{item.timeLeft}</span>
                  <button
                    className="mr-10 text-2xl"
                    onClick={() => handleAddFavorite(item)}
                    disabled={disabledHearts[item.id]}
                    style={{
                      cursor: disabledHearts[item.id] ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {disabledHearts[item.id] ? '❤' : '🤍'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-[30%] border-2 rounded-2xl p-4">
          <div className="text-center">
            <h1 className="text-2xl mt-4 mb-4 font-medium">🤍 Favorite Items</h1>
            <div className="border-t-2 border-gray-400"></div>
          </div>

          {favorites.length === 0 ? (
            <div className="text-center mt-6">
              <h1 className="text-2xl font-medium">No favorites yet</h1>
              <p className="mt-2">Click the heart icon on any item<br />to add it to your favorites</p>
            </div>
          ) : (
            <div className="mt-5 space-y-4">
              {favorites.map(item => (
                <div key={item.id} className="flex flex-col gap-3 border p-3 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.title} className="w-16 h-16 rounded object-cover" />
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <div className="flex gap-8">
                          <p className="text-sm text-gray-500">${item.currentBidPrice}</p>
                          <p className="text-sm text-gray-500">Bids: {item.bidsCount}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveFavorite(item.id)}
                      className="text-xl -mt-10 hover:scale-125 transition-all"
                    >
                      x
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="border-t-2 border-gray-400 mt-6"></div>
          <div className="flex justify-between mt-5 text-2xl font-medium mx-5">
            <h1>Total bids Amount</h1>
            <h1>${totalBid}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Items;
