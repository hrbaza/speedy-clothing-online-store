import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { authHeaders, backendUrl, errorMessage } from '../config'

const IMAGE_SLOTS = 4
const SIZES = ['S', 'M', 'L', 'XL', 'XXL']
const CATEGORIES = ['Men', 'Women', 'Kids']
const SUB_CATEGORIES = ['Topwear', 'Bottomwear', 'Winterwear']

const emptyImages = () => Array(IMAGE_SLOTS).fill(null)

const Add = ({ token }) => {
  const [images, setImages] = useState(emptyImages)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [subCategory, setSubCategory] = useState(SUB_CATEGORIES[0])
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [submitting, setSubmitting] = useState(false)

  // Create preview URLs once per selected file and free them when they change
  const previews = useMemo(() => images.map((file) => file && URL.createObjectURL(file)), [images])
  useEffect(() => () => previews.forEach((url) => url && URL.revokeObjectURL(url)), [previews])

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
    formData.append('sizes', JSON.stringify(sizes))
    images.forEach((file, i) => file && formData.append(`image${i + 1}`, file))

    setSubmitting(true)
    try {
      const { data } = await axios.post(`${backendUrl}/api/product/add`, formData, { headers: authHeaders(token) })

      if (data.success) {
        toast.success(data.message)
        resetForm()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(errorMessage(error))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>

        <div className='flex gap-2'>
          {previews.map((preview, i) => (
            <label key={i} htmlFor={`image${i + 1}`}>
              <img className='w-20' src={preview || assets.upload_area} alt="" />
              <input onChange={(e) => setImageAt(i, e.target.files[0] || null)} type="file" accept="image/*" id={`image${i + 1}`} hidden />
            </label>
          ))}
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' placeholder='Write content here' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product category</p>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2'>
            {CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub category</p>
          <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2'>
            {SUB_CATEGORIES.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" min="0" step="0.01" placeholder='25' required />
        </div>
      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          {SIZES.map((size) => (
            <p
              key={size}
              onClick={() => toggleSize(size)}
              className={`${sizes.includes(size) ? 'bg-pink-100' : 'bg-slate-200'} px-3 py-1 cursor-pointer`}
            >
              {size}
            </p>
          ))}
        </div>
      </div>

      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestseller((prev) => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button type="submit" disabled={submitting} className='w-28 py-3 mt-4 bg-black text-white disabled:opacity-50'>
        {submitting ? 'ADDING...' : 'ADD'}
      </button>
    </form>
  )
}

export default Add
