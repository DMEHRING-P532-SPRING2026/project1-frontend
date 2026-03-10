import config from '../config'

export async function getStocks() {
  const response = await fetch(`${config.BASE_URL}/api/stocks`)
  return response.json()
}