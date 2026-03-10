import PendingTradeItem from './PendingTradeItem'

function TradeList({ items }) {
  return (
    <div className="flex flex-col gap-2 overflow-y-auto h-full p-4 pb-8">
      {items.map((item, index) => (
        <PendingTradeItem
          key={index}
          createdAt={item.createdAt}
          executedAt={item.executedAt}
          limitPrice={item.limitPrice}
          orderType={item.orderType}
          price={item.price}
          quantity={item.quantity}
          side={item.side}
          status={item.status}
          ticker={item.ticker}
          totalPrice={item.totalPrice}
          type={item.type}
        />
      ))}
    </div>
  )
}

export default TradeList