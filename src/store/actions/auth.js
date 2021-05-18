import openNotification from 'components/UI/Notification/Notification'
import axios from 'axios'
import {
  actionToLS,
  addToLS,
  expirationDate,
} from 'utils/localStorage'
import {
  AUTH_LOGOUT,
  AUTH_SUCCESS,
} from 'store/actions/actionTypes'

export function authSuccess(token) {
  return {
    type: AUTH_SUCCESS,
    token,
  }
}

export function logout() {
  const properties = ['token', 'userId', 'expirationDate']
  actionToLS(properties, 'removeItem')
  return {
    type: AUTH_LOGOUT,
  }
}

export function autoLogout(time) {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, time * 1000)
  }
}

export function autoLogin() {
  return dispatch => {
    const token = localStorage.getItem('token')
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(
        localStorage.getItem('expirationDate')
      )
      if (expirationDate <= new Date()) {
        dispatch(logout())
      } else {
        dispatch(authSuccess(token))

        const expirationTime =
          (expirationDate.getTime() -
            new Date().getTime()) /
          1000

        dispatch(autoLogout(expirationTime))
      }
    }
  }
}

export function auth(email, password, isLoggedIn, apiKey) {
  return async dispatch => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    }

    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='

    if (isLoggedIn) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
    }

    try {
      const response = await axios.post(
        url + apiKey,
        authData
      )
      const { data, statusText } = response
      openNotification('success', statusText)

      const dataAuth = {
        token: data.idToken,
        userId: data.localId,
        expirationDate: expirationDate(data.expiresIn),
      }
      addToLS(dataAuth)
      dispatch(authSuccess(data.idToken))
      dispatch(autoLogout(data.expiresIn))
    } catch (error) {
      openNotification(error.name, error.message)
      console.warn(error)
    }
  }
}
