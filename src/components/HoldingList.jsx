import HoldingItem from './HoldingItem'

function HoldingList({ items }) {
  return (
    <div className="flex flex-col gap-2 overflow-y-auto h-full p-4 pb-8">
      {items.map((item, index) => (
        <HoldingItem key={index} ticker={item.ticker} quantity={item.quantity} />
      ))}
    </div>
  )
}

export default HoldingList