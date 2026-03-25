import { useEffect, useState } from 'react'
import { getStocks } from '../services/stocksService'
import { placeOrder } from '../services/orderService'

function OrderDropdown({ options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('')

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-neutral-500 text-white px-4 py-2 rounded w-full justify-between"
      >
        <span>{selected || 'Select...'}</span>
        <span className="text-neutral-400">▾</span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-neutral-700 rounded shadow-lg">
          {options.filter(o => o !== selected).map((option) => (
            <button
              key={option}
              onClick={() => {
                setSelected(option)
                setIsOpen(false)
                onSelect?.(option)
              }}
              className="block w-full text-left px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-600 hover:text-white"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function QuantityInput({ onChange }) {
  const [quantity, setQuantity] = useState('')
  const [error, setError] = useState('')

  function handleChange(e) {
    const value = e.target.value
    setQuantity(value)

    if (value === '') {
      setError('Quantity is required')
    } else if (value <= 0) {
      setError('Quantity must be greater than 0')
    } else {
      setError('')
      onChange?.(value)
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <input
        type="number"
        value={quantity}
        onChange={handleChange}
        placeholder="Quantity"
        className="bg-neutral-500 text-white px-4 py-2 rounded w-full outline-none focus:ring-2 focus:ring-neutral-400"
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  )
}

function PriceInput({ onChange }) {
  const [price, setPrice] = useState('')
  const [error, setError] = useState('')

  function handleChange(e) {
    const value = e.target.value
    setPrice(value)

    if (value === '') {
      setError('Price is required')
    } else if (value <= 0) {
      setError('Price must be greater than 0')
    } else {
      setError('')
      onChange?.(value)
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-300">$</span>
        <input
          type="number"
          value={price}
          onChange={handleChange}
          placeholder="0.00"
          className="bg-neutral-500 text-white pl-7 pr-4 py-2 rounded w-full outline-none focus:ring-2 focus:ring-neutral-400"
        />
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  )
}

function PlaceOrder({ userId }) {
  const [tickers, setTickers] = useState([])
  const [orderType, setOrderType] = useState('')
  const [ticker, setTicker] = useState('')
  const [side, setSide] = useState('')
  const [quantity, setQuantity] = useState('')
  const [condition, setCondition] = useState('')
  const [limitPrice, setLimitPrice] = useState('')

  useEffect(() => {
    getStocks().then(data =>
      setTickers(data.map(stock => stock.ticker))
    )
  }, [])

  function handleSubmit() {
    if (!userId || !orderType || !ticker || !side || !quantity) {
      alert('Missing required fields')
      return
    }

    console.log("Submitting order for user:", userId)

    placeOrder(
      userId,
      orderType,
      ticker,
      quantity,
      side,
      condition,
      limitPrice
    )
  }

  return (
    <div className="flex flex-col gap-2 p-6">
      <h1 className='text-white font-bold text-lg'>Order Type</h1>
      <OrderDropdown options={['Market', 'Limit']} onSelect={setOrderType} />

      <h1 className='text-white font-bold text-lg'>Stock</h1>
      <OrderDropdown options={tickers} onSelect={setTicker} />

      <h1 className='text-white font-bold text-lg'>Side</h1>
      <OrderDropdown options={['Buy', 'Sell']} onSelect={setSide} />

      <h1 className='text-white font-bold text-lg'>Quantity</h1>
      <QuantityInput onChange={setQuantity} />

      {orderType === 'Limit' && (
        <>
          <h1 className='text-white font-bold text-lg'>Condition</h1>
          <OrderDropdown
            options={[
              'Less Than',
              'Less Than or Equal to',
              'Greater Than',
              'Greater Than or Equal to'
            ]}
            onSelect={setCondition}
          />

          <h1 className='text-white font-bold text-lg'>Limit Price</h1>
          <PriceInput onChange={setLimitPrice} />
        </>
      )}

      <button
        onClick={handleSubmit}
        className="mt-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        Place Order
      </button>
    </div>
  )
}

export default PlaceOrder
