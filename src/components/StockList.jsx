import StockItem from './StockItem'

function StockList({ items }) {
  return (
    <div className="flex flex-col gap-2 overflow-y-auto h-full p-4 pb-8">
      {items.map((item, index) => (
        <StockItem key={index} ticker={item.ticker} price={item.price} />
      ))}
    </div>
  )
}

export default StockList