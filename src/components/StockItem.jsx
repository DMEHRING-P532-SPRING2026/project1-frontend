function StockItem({ ticker, price}) {
  return (
    <div className="grid grid-cols-2 bg-neutral-500 p-3 rounded text-white">
        <div>
            <h1 className="font-bold text-xl">{ticker}:</h1>
        </div>
        <div className="text-right">
            <h1 className="text-neutral-300 text-xl font-bold">${parseFloat(price).toFixed(2)}</h1>
        </div>
    </div>
  )
}

export default StockItem