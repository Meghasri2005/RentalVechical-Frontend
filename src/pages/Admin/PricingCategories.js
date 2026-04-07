import React, { useState } from 'react'
import { useAppContext } from '../../Context/AppContext'
import toast from 'react-hot-toast'

const PricingCategories = () => {

  const { axios } = useAppContext()
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')

  const addCategory = async () => {
    const { data } = await axios.post('/api/admin/add-category', { category, basePrice:price })
    if (data.success) {
      toast.success(data.message)
      setCategory('')
      setPrice('')
    }
  }

  return (
    <div className='p-6 w-full'>
      <h2 className='text-2xl font-semibold mb-6'>Pricing Categories</h2>

      <div className='bg-white p-6 shadow rounded-lg max-w-md'>
        <input
          type='text'
          placeholder='Category Name'
          value={category}
          onChange={e => setCategory(e.target.value)}
          className='border p-2 w-full mb-4 rounded'
        />

        <input
          type='number'
          placeholder='Base Price'
          value={price}
          onChange={e => setPrice(e.target.value)}
          className='border p-2 w-full mb-4 rounded'
        />

        <button
          onClick={addCategory}
          className='bg-blue-600 text-white px-4 py-2 rounded'
        >
          Add Category
        </button>
      </div>
    </div>
  )
}

export default PricingCategories