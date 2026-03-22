import config from '../config'

export async function getStocks() {
  const response = await fetch(`${config.BASE_URL}/api/stocks`)
  return response.json()
}

export const setStrategy = (strategy) => {
  fetch(`${config.BASE_URL}/api/stocks/strategy`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ strategy })
  })
}