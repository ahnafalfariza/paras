import React, { useEffect, useState, useRef } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { connect, useSelector } from 'react-redux'
import Axios from 'axios'

import { fcmService } from '../services/FCMService'
import { localNotificationService } from '../services/LocalNotificationService'
import { REGISTER_DEVICE } from '../utils/api'
import { Platform } from 'react-native'

import NewPostNavigator from './NewPostNavigator'
import TabNavigator from './TabNavigator'
import LandingNavigator from './LandingNavigator'
import AuthNavigator from './AuthNavigator'
import { VERIFY_TOKEN } from '../utils/api'
import CommentScreen from '../screen/Interaction/CommentScreen'
import EditProfileScreen from '../screen/Profile/EditProfileScreen'
import RoutesName from '../utils/RoutesName'

const Stack = createStackNavigator()

const AppNavigator = ({ isLoggedIn }) => {
  const navRef = useRef()
  const token = useSelector((state) => state.user.token)
  const [ready, setReady] = useState(false)
  const [tokenLoaded, setTokenLoaded] = useState(false)
  const [onOpenScreen, setOnOpenScreen] = useState(null)

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
      localNotificationService.showNotification(0, notify.notification.title, notify.notification.body, notify, options)
    }

    function onOpenNotification(notify) {
      console.log('[App] onOpenNotification: ', notify)
      // notify.data = {
      //   screen: 'post || comment || walletHistory',
      //   id: 'postId || postId'
      // }
      if (notify.data) {
        if (notify.data.screen === 'walletHistory') {
          setOnOpenScreen({
            routeName: RoutesName.WalletTab,
            params: {
              screen: RoutesName.WalletHistory
            }
          })
        }
      }
      //alert("Open Notification: " + notify.body)
    }

    return () => {
      console.log('[App] unRegister')
      //alert("[App] unRegister")
      fcmService.unRegister()
      localNotificationService.unRegister()
    }
  }, [])

  useEffect(() => {
    if (token) {
      Axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      console.log(token)
      Axios.post(VERIFY_TOKEN)
        .then(() => setTokenLoaded(true))
        .catch((err) => console.log(err))
    } else {
      setTokenLoaded(true)
    }
  }, [token])

  useEffect(() => {
    if (ready && onOpenScreen) {
      // check push notification
      console.log(`[App] Navigate to ${onOpenScreen}`)
      navRef.current.navigate(onOpenScreen.routeName, onOpenScreen.params || {})
      setOnOpenScreen(null)
    }
  }, [ready, onOpenScreen])

  if (!tokenLoaded) {
    return null
  }

  return (
    <NavigationContainer
      ref={navRef}
      onReady={() => {
        setReady(true)
      }}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="LandingNavigator" component={LandingNavigator} />
            <Stack.Screen name="AuthNavigator" component={AuthNavigator} />
          </>
        ) : (
            <>
              <Stack.Screen name="TabNavigator" component={TabNavigator} />
              <Stack.Screen
                name="New Post"
                component={NewPostNavigator}
                options={{
                  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                  gestureEnabled: false,
                }}
              />
              <Stack.Screen
                name="Comment"
                component={CommentScreen}
                options={{
                  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                  gestureDirection: 'vertical',
                }}
              />
              <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{
                  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                  gestureDirection: 'vertical',
                }}
              />
            </>
          )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
})

export default connect(mapStateToProps)(AppNavigator)
