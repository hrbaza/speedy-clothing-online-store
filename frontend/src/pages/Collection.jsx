import { useContext, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSliders, FiX, FiSearch, FiChevronDown } from 'react-icons/fi';
import { ShopContext, isInStock } from '../context/ShopContext';
import PageHeader from '../components/PageHeader';
import ProductGrid from '../components/ProductGrid';

const FILTERS = [
  { param: 'category', title: 'Category', options: ['Men', 'Women', 'Kids'], field: 'category' },
  { param: 'type', title: 'Type', options: ['Topwear', 'Bottomwear', 'Winterwear'], field: 'subCategory' },
];

const SORTS = [
  { value: 'relevant', label: 'Newest' },
  { value: 'low-high', label: 'Price: Low to High' },
  { value: 'high-low', label: 'Price: High to Low' },
];

// Filters live in the URL (?category=Men,Women&type=Topwear) so links can open a pre-filtered view
const readList = (params, key) => (params.get(key) || '').split(',').filter(Boolean);

const Collection = () => {
  const { products, search, showSearch, setShowSearch } = useContext(ShopContext);
  const [params, setParams] = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);
  const [sortType, setSortType] = useState('relevant');
  const [inStockOnly, setInStockOnly] = useState(false);

  const selected = Object.fromEntries(FILTERS.map(({ param }) => [param, readList(params, param)]));
  const activeCount = selected.category.length + selected.type.length;

  const toggle = (param, value) => {
    const current = selected[param];
    const next = current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
    const nextParams = new URLSearchParams(params);
    if (next.length) nextParams.set(param, next.join(',')); else nextParams.delete(param);
    setParams(nextParams, { replace: true });
  };

  const clearFilters = () => setParams({}, { replace: true });

  // Filtering and sorting are recalculated together, so the chosen sort stays applied
  const filterProducts = useMemo(() => {
    const query = showSearch ? search.trim().toLowerCase() : '';

    const filtered = products.filter((item) =>
      (!query || item.name.toLowerCase().includes(query)) &&
      (!inStockOnly || isInStock(item)) &&
      FILTERS.every(({ param, field }) => selected[param].length === 0 || selected[param].includes(item[field]))
    );

    if (sortType === 'low-high') return filtered.sort((a, b) => a.price - b.price);
    if (sortType === 'high-low') return filtered.sort((a, b) => b.price - a.price);
    return filtered;
  }, [products, search, showSearch, params, sortType, inStockOnly]);

  return (
    <>
      <PageHeader
        eyebrow='The full lineup'
        title='Speed'
        highlight='Collection'
        crumb='Collection'
        subtitle='Explore the latest arrivals — filter by category and type to find your fit.'
      />

      <div className='container-x flex flex-col gap-10 py-12 lg:flex-row lg:py-16'>
        {/* Filters */}
        <aside className='lg:w-64 lg:shrink-0'>
          <button
            onClick={() => setShowFilter(!showFilter)}
            className='flex w-full items-center justify-between rounded-2xl border border-ink/10 px-5 py-4 font-semibold lg:hidden'
          >
            <span className='flex items-center gap-2'><FiSliders /> Filters {activeCount > 0 && `(${activeCount})`}</span>
            <FiChevronDown className={`transition ${showFilter ? 'rotate-180' : ''}`} />
          </button>

          <div className={`${showFilter ? 'mt-4 block' : 'hidden'} space-y-4 lg:sticky lg:top-28 lg:mt-0 lg:block`}>
            {FILTERS.map(({ param, title, options }) => (
              <div key={param} className='rounded-3xl border border-ink/10 p-6'>
                <h3 className='heading text-sm tracking-widest'>{title}</h3>
                <div className='mt-4 space-y-1'>
                  {options.map((item) => {
                    const checked = selected[param].includes(item);
                    return (
                      <label key={item} className={`flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm transition ${checked ? 'bg-brand-50 font-semibold text-brand-700' : 'text-ink/70 hover:bg-ink/5'}`}>
                        {item}
                        <input type='checkbox' className='h-4 w-4 accent-brand-600' checked={checked} onChange={() => toggle(param, item)} />
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}

            <label className='flex cursor-pointer items-center justify-between rounded-3xl border border-ink/10 px-6 py-5'>
              <span className='heading text-sm tracking-widest'>In stock only</span>
              <input type='checkbox' className='peer sr-only' checked={inStockOnly} onChange={() => setInStockOnly((prev) => !prev)} />
              <span className='relative h-6 w-11 rounded-full bg-ink/15 transition after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition peer-checked:bg-brand-600 peer-checked:after:translate-x-5' />
            </label>

            {activeCount > 0 && (
              <button onClick={clearFilters} className='btn-outline w-full'>
                <FiX /> Clear filters
              </button>
            )}
          </div>
        </aside>

        {/* Products */}
        <div className='flex-1'>
          <div className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex flex-wrap items-center gap-2'>
              <p className='mr-2 text-sm text-ink/60'>
                Showing <span className='font-semibold text-ink'>{filterProducts.length}</span> products
              </p>
              {[...selected.category, ...selected.type].map((value) => (
                <button
                  key={value}
                  onClick={() => toggle(selected.category.includes(value) ? 'category' : 'type', value)}
                  className='flex items-center gap-1.5 rounded-full bg-ink px-3 py-1 text-xs font-medium text-white transition hover:bg-brand-600'
                >
                  {value} <FiX />
                </button>
              ))}
            </div>

            <div className='flex items-center gap-2'>
              {!showSearch && (
                <button onClick={() => setShowSearch(true)} className='grid h-11 w-11 place-items-center rounded-full border border-ink/10 transition hover:bg-ink hover:text-white' aria-label='Search'>
                  <FiSearch />
                </button>
              )}
              <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className='rounded-full border border-ink/10 bg-white px-5 py-3 text-sm font-medium outline-none focus:border-brand-500'
              >
                {SORTS.map(({ value, label }) => <option key={value} value={value}>Sort: {label}</option>)}
              </select>
            </div>
          </div>

          <ProductGrid
            products={filterProducts}
            className='grid-cols-2 md:grid-cols-3'
            skeletons={6}
            emptyText='No products match these filters. Try clearing a few.'
          />
        </div>
      </div>
    </>
  );
};

export default Collection;
