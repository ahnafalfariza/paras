import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'

import configureStore from './src/store'
import AppNavigator from './src/navigator/AppNavigator'
import { fcmService } from './src/services/FCMService'
import { localNotificationService } from './src/services/LocalNotificationService'
import Axios from 'axios'
import { REGISTER_DEVICE } from './src/utils/api'
import { Platform } from 'react-native'

const { persistor, store } = configureStore()

const App = () => {
  useEffect(() => {
    fcmService.registerAppWithFCM
    fcmService.register(onRegister, onNotification, onOpenNotification)
    localNotificationService.configure(onOpenNotification)

    function onRegister(token) {
      console.log('[App] onRegister: ', token)
      Axios.post(REGISTER_DEVICE, { deviceId: token, type: Platform.OS })
        .then((res) => {
          console.log(res.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
      //alert("[App] onRegister: ", token)
    }

    function onNotification(notify) {
      console.log('[App] onNotification: ', notify)
      //alert("[App] onNotification: ", notify)
      const options = {
        soundName: 'default',
        playSound: true,
      }
      localNotificationService.showNotification(0, notify.title, notify.body, notify, options)
    }

    function onOpenNotification(notify) {
      console.log('[App] onOpenNotification: ', notify)
      //alert("Open Notification: " + notify.body)
    }

    return () => {
      console.log('[App] unRegister')
      //alert("[App] unRegister")
      fcmService.unRegister()
      localNotificationService.unRegister()
    }
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  )
}

export default App
