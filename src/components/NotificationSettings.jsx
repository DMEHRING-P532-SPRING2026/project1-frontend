import { useState, useEffect } from 'react'
import { setNotifications } from '../services/userService'

export default function NotificationSettings({ user }) {
  const [email, setEmail] = useState(false)
  const [sms, setSms] = useState(false)
  const [dashboard, setDashboard] = useState(false)

  useEffect(() => {
    if (user) {
      setEmail(user.emailEnabled)
      setSms(user.smsEnabled)
      setDashboard(user.dashboardEnabled)
    }
  }, [user])

const handleChange = (type, value) => {
    const updated = { emailEnabled: email, smsEnabled: sms, dashboardEnabled: dashboard, [type]: value }
    if (type === 'emailEnabled') setEmail(value)
    if (type === 'smsEnabled') setSms(value)
    if (type === 'dashboardEnabled') setDashboard(value)
    setNotifications(1, updated)
}

  return (
    <div className="flex flex-col gap-2 p-4">
      {[
        { label: 'Email', key: 'emailEnabled', value: email },
        { label: 'SMS', key: 'smsEnabled', value: sms },
        { label: 'Dashboard', key: 'dashboardEnabled', value: dashboard },
      ].map(({ label, key, value }) => (
        <label key={key} className="flex items-center justify-between text-white text-sm font-semibold">
          {label}
          <input type="checkbox" checked={value} onChange={e => handleChange(key, e.target.checked)}
            className="w-4 h-4 accent-blue-500" />
        </label>
      ))}
    </div>
  )
}