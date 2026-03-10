import config from '../config'

export async function getPending(id) {
  const response = await fetch(`${config.BASE_URL}/api/trades/pending/${id}`)
  return response.json()
}

export async function getExecuted(id) {
  const response = await fetch(`${config.BASE_URL}/api/trades/completed/${id}`)
  return response.json()
}