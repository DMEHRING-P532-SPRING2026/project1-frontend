


function PendingTradeItem({ createdAt, executedAt, limitPrice, orderType, price, quantity, side, status, ticker, totalPrice, type}) {
  function formatDate(dateString) {
  if (!dateString) return null
    return new Date(dateString).toLocaleString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="bg-neutral-500 p-3 rounded text-white flex flex-col gap-1">
      <div>
        <h1 className="font-bold text-xl">{ticker}</h1>
      </div>
      <div>
        <h1 className="text-neutral-300 text-lg font-bold">Side: {side}</h1>
      </div>
      <div>
        <h1 className="text-neutral-300 text-lg font-bold">Quantity: {quantity}</h1>
      </div>

      {orderType === 'LIMIT' && (
        <>
          <div>
            <h1 className="text-neutral-300 text-lg font-bold">Limit Price: ${limitPrice?.toFixed(2)}</h1>
          </div>
          <div>
            <h1 className="text-neutral-300 text-lg font-bold">Condition: {type}</h1>
          </div>
        </>
      )}
      <div>
        <h1 className="text-neutral-300 text-lg font-bold">Requested: {formatDate(createdAt)}</h1>
      </div>
    </div>
  )
}

export default PendingTradeItem