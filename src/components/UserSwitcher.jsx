import { useEffect, useState } from 'react'

export default function UserSwitcher({ onSwitch }) {
  const [selected, setSelected] = useState(1)

  const handleSwitch = (id) => {
    setSelected(id)
    onSwitch(id)
  }

  return (
    <div className="flex flex-col gap-2 p-4">
      <div className="flex gap-2">
        {[1, 2, 3].map(id => (
          <button
            key={id}
            onClick={() => handleSwitch(id)}
            className={`flex-1 py-2 rounded font-semibold text-sm transition-colors
              ${selected === id
                ? 'bg-blue-500 text-white'
                : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-500'}`}
          >
            User {id}
          </button>
        ))}
      </div>
    </div>
  )
}