import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FiUploadCloud, FiX, FiPlus, FiCheck, FiArrowLeft } from 'react-icons/fi'
import { authHeaders, backendUrl, currency, errorMessage, sortSizes } from '../config'

const IMAGE_SLOTS = 4
const SIZES = ['S', 'M', 'L', 'XL', 'XXL']
const CATEGORIES = ['Men', 'Women', 'Kids']
const SUB_CATEGORIES = ['Topwear', 'Bottomwear', 'Winterwear']

const emptyImages = () => Array(IMAGE_SLOTS).fill(null)

// Used for both adding a product (/add) and editing one (/edit/:id).
// Each image slot holds null, a new File, or (when editing) the URL of an existing image.
const Add = ({ token }) => {
  const { id } = useParams()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const [loadingProduct, setLoadingProduct] = useState(isEdit)
  const [images, setImages] = useState(emptyImages)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [subCategory, setSubCategory] = useState(SUB_CATEGORIES[0])
  const [bestseller, setBestseller] = useState(false)
  const [inStock, setInStock] = useState(true)
  const [sizes, setSizes] = useState([])
  const [submitting, setSubmitting] = useState(false)

  // Create preview URLs once per selected file and free them when they change
  const previews = useMemo(() => images.map((item) => (item instanceof File ? URL.createObjectURL(item) : item)), [images])
  useEffect(() => () => previews.forEach((url) => url?.startsWith('blob:') && URL.revokeObjectURL(url)), [previews])

  // Edit mode: load the product into the form
  useEffect(() => {
    if (!isEdit) return

    axios.post(`${backendUrl}/api/product/single`, { productId: id })
      .then(({ data }) => {
        if (!data.success) throw new Error(data.message)
        const p = data.product
        setImages(emptyImages().map((_, i) => p.image[i] || null))
        setName(p.name)
        setDescription(p.description)
        setPrice(String(p.price))
        setCategory(p.category)
        setSubCategory(p.subCategory)
        setSizes(p.sizes)
        setBestseller(Boolean(p.bestseller))
        setInStock(p.inStock !== false)
      })
      .catch((error) => {
        toast.error(errorMessage(error) || 'Product not found')
        navigate('/list')
      })
      .finally(() => setLoadingProduct(false))
  }, [id])

  const setImageAt = (index, file) =>
    setImages((prev) => prev.map((current, i) => (i === index ? file : current)))

  const toggleSize = (size) =>
    setSizes((prev) => (prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]))

  const resetForm = () => {
    setImages(emptyImages())
    setName('')
    setDescription('')
    setPrice('')
    setSizes([])
    setBestseller(false)
    setInStock(true)
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!images.some(Boolean)) {
      toast.error('Please upload at least one image')
      return
    }
    if (sizes.length === 0) {
      toast.error('Please select at least one size')
      return
    }

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('category', category)
    formData.append('subCategory', subCategory)
    formData.append('bestseller', bestseller)
    formData.append('inStock', inStock)
    formData.append('sizes', JSON.stringify(sortSizes(sizes)))
    images.forEach((item, i) => item instanceof File && formData.append(`image${i + 1}`, item))
    if (isEdit) {
      formData.append('id', id)
      formData.append('existingImages', JSON.stringify(images.map((item) => (typeof item === 'string' ? item : null))))
    }

    setSubmitting(true)
    try {
      const url = `${backendUrl}/api/product/${isEdit ? 'update' : 'add'}`
      const { data } = await axios.post(url, formData, { headers: authHeaders(token) })

      if (data.success) {
        toast.success(data.message)
        if (isEdit) {
          navigate('/list')
        } else {
          resetForm()
        }
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(errorMessage(error))
    } finally {
      setSubmitting(false)
    }
  }

  if (loadingProduct) {
    return (
      <div className='grid gap-6 xl:grid-cols-[1.4fr_1fr]'>
        <div className='h-96 animate-pulse rounded-3xl bg-ink/5' />
        <div className='h-96 animate-pulse rounded-3xl bg-ink/5' />
      </div>
    )
  }

  return (
    <form onSubmit={onSubmitHandler} className='grid gap-6 xl:grid-cols-[1.4fr_1fr]'>
      {isEdit && (
        <div className='flex items-center justify-between gap-4 rounded-2xl border border-brand-200 bg-brand-50 px-5 py-4 xl:col-span-2'>
          <p className='text-sm'>Editing <span className='font-semibold'>{name}</span>. Changes go live in the store as soon as you save.</p>
          <Link to='/list' className='flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline'><FiArrowLeft /> Back</Link>
        </div>
      )}
      <div className='space-y-6'>
        {/* Images */}
        <section className='card p-6 sm:p-8'>
          <h2 className='heading text-lg'>Product images</h2>
          <p className='mt-1 text-sm text-ink/50'>Up to 4 images. The first one is used as the cover.</p>

          <div className='mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4'>
            {previews.map((preview, i) => (
              <div key={i} className='relative'>
                <label
                  htmlFor={`image${i + 1}`}
                  className={`group flex aspect-[4/5] cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border-2 border-dashed text-ink/40 transition ${
                    preview ? 'border-transparent' : 'border-ink/15 bg-ink/[0.02] hover:border-brand-500 hover:bg-brand-50 hover:text-brand-600'
                  }`}
                >
                  {preview ? (
                    <img className='h-full w-full object-cover' src={preview} alt={`Upload ${i + 1}`} />
                  ) : (
                    <>
                      <FiUploadCloud className='text-2xl' />
                      <span className='text-xs font-semibold uppercase tracking-wider'>{i === 0 ? 'Cover' : `Image ${i + 1}`}</span>
                    </>
                  )}
                  <input
                    onChange={(e) => { setImageAt(i, e.target.files[0] || null); e.target.value = '' }}
                    type="file"
                    accept="image/*"
                    id={`image${i + 1}`}
                    hidden
                  />
                </label>
                {i === 0 && preview && (
                  <span className='absolute left-2 top-2 rounded-md bg-ink px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white'>Cover</span>
                )}
                {preview && (
                  <button
                    type='button'
                    onClick={() => setImageAt(i, null)}
                    className='absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white text-ink shadow-soft transition hover:bg-red-500 hover:text-white'
                    aria-label='Remove image'
                  >
                    <FiX />
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Details */}
        <section className='card space-y-5 p-6 sm:p-8'>
          <h2 className='heading text-lg'>Product details</h2>
          <div>
            <label htmlFor='name' className='label'>Product name</label>
            <input id='name' onChange={(e) => setName(e.target.value)} value={name} className='input' type="text" placeholder='e.g. Midnight Raglan Tee' required />
          </div>
          <div>
            <label htmlFor='description' className='label'>Description</label>
            <textarea id='description' rows={5} onChange={(e) => setDescription(e.target.value)} value={description} className='input resize-none' placeholder='Fabric, fit, and what makes it special...' required />
          </div>
        </section>
      </div>

      <div className='space-y-6 xl:sticky xl:top-28 xl:self-start'>
        {/* Organisation */}
        <section className='card space-y-5 p-6 sm:p-8'>
          <h2 className='heading text-lg'>Pricing & category</h2>
          <div>
            <label htmlFor='price' className='label'>Price (PKR)</label>
            <div className='relative'>
              <span className='absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-ink/40'>{currency}</span>
              <input id='price' onChange={(e) => setPrice(e.target.value)} value={price} className='input pl-11' type="number" min="0" step="1" placeholder='1500' required />
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label htmlFor='category' className='label'>Category</label>
              <select id='category' value={category} onChange={(e) => setCategory(e.target.value)} className='input'>
                {CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor='subCategory' className='label'>Type</label>
              <select id='subCategory' value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className='input'>
                {SUB_CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
          </div>

          <div>
            <p className='label'>Available sizes</p>
            <div className='flex flex-wrap gap-2'>
              {SIZES.map((size) => {
                const active = sizes.includes(size)
                return (
                  <button
                    type='button'
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`flex h-11 min-w-12 items-center justify-center gap-1 rounded-xl border px-3 text-sm font-semibold transition ${
                      active ? 'border-brand-600 bg-brand-600 text-white shadow-glow' : 'border-ink/15 hover:border-ink'
                    }`}
                  >
                    {active && <FiCheck className='text-xs' />}{size}
                  </button>
                )
              })}
            </div>
          </div>

          <label htmlFor='bestseller' className='flex cursor-pointer items-center justify-between rounded-2xl border border-ink/10 p-4'>
            <span>
              <span className='block text-sm font-semibold'>Bestseller</span>
              <span className='text-xs text-ink/50'>Show in the store&apos;s Best Sellers section</span>
            </span>
            <input onChange={() => setBestseller((prev) => !prev)} checked={bestseller} type="checkbox" id='bestseller' className='peer sr-only' />
            <span className='relative h-7 w-12 rounded-full bg-ink/15 transition after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition peer-checked:bg-brand-600 peer-checked:after:translate-x-5' />
          </label>

          <label htmlFor='inStock' className='flex cursor-pointer items-center justify-between rounded-2xl border border-ink/10 p-4'>
            <span>
              <span className='block text-sm font-semibold'>In stock</span>
              <span className='text-xs text-ink/50'>Turn off to show the product as out of stock</span>
            </span>
            <input onChange={() => setInStock((prev) => !prev)} checked={inStock} type="checkbox" id='inStock' className='peer sr-only' />
            <span className='relative h-7 w-12 rounded-full bg-ink/15 transition after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition peer-checked:bg-emerald-500 peer-checked:after:translate-x-5' />
          </label>
        </section>

        <button type="submit" disabled={submitting} className='btn-primary w-full py-4'>
          {isEdit ? <FiCheck /> : <FiPlus />}
          {isEdit
            ? (submitting ? 'Saving...' : 'Save changes')
            : (submitting ? 'Adding product...' : 'Add product')}
        </button>
      </div>
    </form>
  )
}

export default Add
