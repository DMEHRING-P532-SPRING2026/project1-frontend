import { useState } from 'react'
import { setStrategy } from '../services/stocksService'

const strategies = ['RandomWalk', 'MeanReversion', 'TrendFollowing']

export default function StrategySelector() {
  const [selected, setSelected] = useState('RandomWalk')

  const handleSelect = (strategy) => {
    setSelected(strategy)
    setStrategy(strategy)
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      {strategies.map(s => (
        <button
          key={s}
          onClick={() => handleSelect(s)}
          className={`px-4 py-2 rounded font-semibold text-sm transition-colors
            ${selected === s
              ? 'bg-blue-500 text-white'
              : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-500'}`}
        >
          {s}
        </button>
      ))}
    </div>
  )
}