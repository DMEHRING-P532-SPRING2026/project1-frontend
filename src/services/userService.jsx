import config from '../config'

export async function getUser(id) {
  const response = await fetch(`${config.BASE_URL}/api/users/${id}`)
  return response.json()
}