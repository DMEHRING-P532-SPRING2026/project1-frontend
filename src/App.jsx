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
import StrategySelector from './components/StrategySelector'
import NotificationSettings from './components/NotificationSettings'
import UserSwitcher from './components/UserSwitcher'

function App() {
  const [stocks, setStocks] = useState([])
  const [user, setUser] = useState()
  const [pendingTrades, setPendingTrades] = useState([])
  const [executedTrades, setExecutedTrades] = useState([])
  const [userId, setUserId] = useState(1)
  const [alertCount, setAlertCount] = useState(0)

  useEffect(() => {
    getUser(userId).then(data => setUser(data))
    getStocks().then(data => setStocks(data))
    getPending(userId).then(data => setPendingTrades(data))
    getExecuted(userId).then(data => setExecutedTrades(data))

    connectWebSocket(userId, {
      onStocks: setStocks,
      onUser: setUser,
      onPendingTrades: setPendingTrades,
      onExecutedTrades: setExecutedTrades,
      onAlert: () => setAlertCount(prev => prev + 1)
    })

    return () => disconnectWebSocket()
  }, [userId])

  const handleUserSwitch = (id) => {
    setUserId(id)
    setAlertCount(0)
  }

  return (
    <div className="grid grid-cols-5 w-full h-screen gap-8 px-8 py-8 bg-neutral-800 overflow-hidden">

      <div className="grid grid-rows-3 gap-8">
        <div className="bg-neutral-600 rounded overflow-hidden row-span-2 flex flex-col">
          <div className="bg-neutral-700 px-4 py-3 border-b border-neutral-500">
            <h1 className="text-white font-bold text-3xl tracking-wide">Stocks</h1>
          </div>
          <div className="overflow-y-auto flex-1">
            <StockList items={stocks} />
          </div>
        </div>
        <div className="bg-neutral-600 rounded overflow-hidden flex flex-col">
          <div className="bg-neutral-700 px-4 py-3 border-b border-neutral-500">
            <h1 className="text-white font-bold text-3xl tracking-wide">Strategy</h1>
          </div>
          <div className="overflow-y-auto flex-1">
            <StrategySelector />
          </div>
        </div>
      </div>

      <div className="bg-neutral-600 rounded overflow-hidden flex flex-col">
        <div className="bg-neutral-700 px-4 py-3 border-b border-neutral-500">
          <h1 className="text-white font-bold text-3xl tracking-wide">Pending Trades</h1>
        </div>
        <div className="overflow-y-auto flex-1">
          <PendingTradeList items={pendingTrades} />
        </div>
      </div>

      <div className="bg-neutral-600 rounded overflow-hidden flex flex-col">
        <div className="bg-neutral-700 px-4 py-3 border-b border-neutral-500">
          <h1 className="text-white font-bold text-3xl tracking-wide">Trade History</h1>
        </div>
        <div className="overflow-y-auto flex-1">
          <ExecutedTradeList items={executedTrades} />
        </div>
      </div>

      <div className="grid grid-rows-4 gap-8">
        <div className="bg-neutral-600 rounded overflow-hidden row-span-2 flex flex-col">
          <div className="bg-neutral-700 px-4 py-3 border-b border-neutral-500">
            <h1 className="text-white font-bold text-3xl tracking-wide">Holding List</h1>
          </div>
          <div className="overflow-y-auto flex-1">
            <HoldingList items={user?.stockHoldingResponses ?? []} />
          </div>
        </div>
        <div className="bg-neutral-600 rounded overflow-hidden flex flex-col">
          <div className="bg-neutral-700 px-4 py-3 border-b border-neutral-500">
            <h1 className="text-white font-bold text-3xl tracking-wide">Notifications</h1>
          </div>
          <div className="overflow-y-auto flex-1">
            <NotificationSettings user={user} userId={userId} />
          </div>
        </div>
        <div className="bg-neutral-600 rounded overflow-hidden flex flex-col">
          <div className="bg-neutral-700 px-4 py-3 border-b border-neutral-500">
            <h1 className="text-white font-bold text-3xl tracking-wide">Switch User</h1>
          </div>
          <div className="overflow-y-auto flex-1">
            <UserSwitcher onSwitch={handleUserSwitch} />
          </div>
        </div>
      </div>

      <div className="grid grid-rows-3 gap-8">
        <div className="bg-neutral-600 rounded overflow-hidden flex flex-col">
          <div className="bg-neutral-700 px-4 py-3 border-b border-neutral-500 flex items-center justify-between">
            <h1 className="text-white font-bold text-3xl tracking-wide">Balance</h1>
            {alertCount > 0 && (
              <button
                onClick={() => setAlertCount(0)}
                className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-400"
              >
                {alertCount}
              </button>
            )}
          </div>
          <h1 className="text-white font-bold text-6xl tracking-wide flex items-center justify-center flex-1">${user?.balance?.toFixed(2)}</h1>
        </div>
        <div className="bg-neutral-600 rounded overflow-hidden row-span-2 flex flex-col">
          <div className="bg-neutral-700 px-4 py-3 border-b border-neutral-500">
            <h1 className="text-white font-bold text-3xl tracking-wide">Place Order</h1>
          </div>
          <div className="overflow-y-auto flex-1">
            <PlaceOrder userId={userId} />
          </div>
        </div>
      </div>

    </div>
  )
}

export default App