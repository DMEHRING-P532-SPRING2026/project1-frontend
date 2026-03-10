function HoldingItem({ ticker, quantity }) {
  return (
    <div className="bg-neutral-500 p-3 rounded text-white flex justify-between items-center">
      <h3 className="font-bold">{ticker}</h3>
      <p className="text-neutral-300 font-bold text-lg">{quantity} shares</p>
    </div>
  )
}

export default HoldingItem