import { useEffect, useState } from 'react'
import './App.css'
import StockList from './components/StockList'
import { getStocks } from './services/stocksService'
import { getUser } from './services/userService'
import { getExecuted, getPending } from './services/tradeService'
import { connectWebSocket, disconnectWebSocket } from './services/websocketService'
import PlaceOrder from './components/PlaceOrder'
import PendingTradeList from './components/PendingTradeList'
import ExecutedTradeList from './components/ExecutedTradeList'
import HoldingList from './components/HoldingList'

function App() {
  const [stocks, setStocks] = useState([])
  const [user, setUser] = useState()
  const [pendingTrades, setPendingTrades] = useState([])
  const [executedTrades, setExecutedTrades] = useState([])

  useEffect(() => {
    getUser(1).then(data => setUser(data))
    getStocks().then(data => setStocks(data))
    getPending(1).then(data => setPendingTrades(data))
    getExecuted(1).then(data => setExecutedTrades(data))

    connectWebSocket(1, {
      onStocks: setStocks,
      onUser: setUser,
      onPendingTrades: setPendingTrades,
      onExecutedTrades: setExecutedTrades
    })

    return () => disconnectWebSocket()
  }, [])

  return (
    <div className="grid grid-cols-5 w-full h-screen gap-8 px-8 py-8 bg-neutral-800 overflow-hidden">
      <div className="bg-neutral-600 rounded overflow-hidden">
        <div className="bg-neutral-700 px-4 py-3 border-b border-neutral-500">
          <h1 className="text-white font-bold text-3xl tracking-wide">Stocks</h1>
        </div>
        <StockList items={stocks} />
      </div>
      <div className="bg-neutral-600 rounded overflow-hidden">
        <div className="bg-neutral-700 px-4 py-3 border-b border-neutral-500">
          <h1 className="text-white font-bold text-3xl tracking-wide">Pending Trades</h1>
        </div>
        <PendingTradeList items={pendingTrades} />
      </div>
      <div className="bg-neutral-600 rounded overflow-hidden">
        <div className="bg-neutral-700 px-4 py-3 border-b border-neutral-500">
          <h1 className="text-white font-bold text-3xl tracking-wide">Trade History</h1>
        </div>
        <ExecutedTradeList items={executedTrades} />
      </div>
      <div className="bg-neutral-600 rounded overflow-hidden">
        <div className="bg-neutral-700 px-4 py-3 border-b border-neutral-500">
          <h1 className="text-white font-bold text-3xl tracking-wide">Holding List</h1>
        </div>
        <HoldingList items={user?.stockHoldingResponses ?? []} />
      </div>
      <div className="grid grid-rows-3 gap-8">
        <div className="bg-neutral-600 rounded overflow-hidden">
          <div className="bg-neutral-700 px-4 py-3 border-b border-neutral-500">
            <h1 className="text-white font-bold text-3xl tracking-wide">Balance</h1>
          </div>
          <h1 className="text-white font-bold text-6xl tracking-wide flex items-center justify-center h-full">${user?.balance.toFixed(2)}</h1>
        </div>
        <div className="bg-neutral-600 rounded overflow-hidden row-span-2">
          <div className="bg-neutral-700 px-4 py-3 border-b border-neutral-500">
            <h1 className="text-white font-bold text-3xl tracking-wide">Place Order</h1>
          </div>
          <PlaceOrder />
        </div>
      </div>
    </div>
  )
}

export default App