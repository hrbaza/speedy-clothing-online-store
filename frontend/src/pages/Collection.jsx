import { useContext, useMemo, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import ProductItem from '../components/ProductItem';

const CATEGORIES = ['Men', 'Women'];
const SUB_CATEGORIES = ['Topwear', 'Bottomwear'];

const toggleValue = (setter) => (e) => {
  const value = e.target.value;
  setter((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
};

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  // Filtering and sorting are recalculated together, so the chosen sort
  // stays applied when filters or the search text change.
  const filterProducts = useMemo(() => {
    const query = showSearch ? search.trim().toLowerCase() : '';

    const filtered = products.filter((item) =>
      (!query || item.name.toLowerCase().includes(query)) &&
      (category.length === 0 || category.includes(item.category)) &&
      (subCategory.length === 0 || subCategory.includes(item.subCategory))
    );

    if (sortType === 'low-high') return filtered.sort((a, b) => a.price - b.price);
    if (sortType === 'high-low') return filtered.sort((a, b) => b.price - a.price);
    return filtered;
  }, [products, search, showSearch, category, subCategory, sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-8 pt-10 border-t">
      {/* Filters */}
      <aside className="w-full sm:w-64">
        <div
          onClick={() => setShowFilter(!showFilter)}
          className="sm:hidden flex items-center justify-between text-xl font-semibold mb-4 cursor-pointer"
        >
          Filters
          <img
            src={assets.dropdown_icon}
            alt="dropdown"
            className={`h-4 transform transition-transform ${showFilter ? 'rotate-90' : ''}`}
          />
        </div>

        <div className={`${showFilter ? 'block' : 'hidden'} sm:block`}>
          {/* Category */}
          <div className="border border-gray-300 rounded-lg p-4 mb-4">
            <h3 className="text-sm font-semibold mb-2">CATEGORIES</h3>
            <div className="space-y-2 text-sm text-gray-700">
              {CATEGORIES.map((item) => (
                <label key={item} className="flex gap-2 items-center cursor-pointer">
                  <input type="checkbox" value={item} onChange={toggleValue(setCategory)} />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* Sub-Category */}
          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-sm font-semibold mb-2">TYPE</h3>
            <div className="space-y-2 text-sm text-gray-700">
              {SUB_CATEGORIES.map((item) => (
                <label key={item} className="flex gap-2 items-center cursor-pointer">
                  <input type="checkbox" value={item} onChange={toggleValue(setSubCategory)} />
                  {item}
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Products */}
      <main className="flex-1">
        {/* Title & Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold">Speed Collection</h2>
            <p className="text-sm text-blue-600 mt-1">Explore the latest arrivals just for you</p>
          </div>
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 text-sm"
          >
            <option value="relevant">Sort by: Relevance</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterProducts.length > 0 ? (
            filterProducts.map((item) => (
              <ProductItem
                key={item._id}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">No products found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Collection;
