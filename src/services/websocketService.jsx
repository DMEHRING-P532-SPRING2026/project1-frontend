import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import config from '../config'

let client = null
export function connectWebSocket(userId, { onStocks, onUser, onPendingTrades, onExecutedTrades, onAlert }) {
  client = new Client({
    webSocketFactory: () => new SockJS(`${config.BASE_URL}/ws`),
    onConnect: () => {
      client.subscribe('/topic/stocks', (message) =>
        onStocks?.(JSON.parse(message.body)))

      client.subscribe(`/topic/user/${userId}`, (message) =>
        onUser?.(JSON.parse(message.body)))

      client.subscribe(`/topic/trade/pending/${userId}`, (message) =>
        onPendingTrades?.(JSON.parse(message.body)))

      client.subscribe(`/topic/trade/executed/${userId}`, (message) =>
        onExecutedTrades?.(JSON.parse(message.body)))

      client.subscribe(`/topic/alerts/${userId}`, () =>
        onAlert?.())
    }
  })
  client.activate()
}

export function disconnectWebSocket() {
  if (client) client.deactivate()
}