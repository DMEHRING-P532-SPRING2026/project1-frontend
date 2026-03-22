import config from '../config'

export async function getUser(id) {
  const response = await fetch(`${config.BASE_URL}/api/users/${id}`)
  return response.json()
}

export const setNotifications = (userId, settings) => {
  fetch(`${config.BASE_URL}/api/users/${userId}/notifications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(settings)
  }).then(res => console.log('Notifications response:', res.status))
}