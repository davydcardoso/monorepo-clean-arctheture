import React from 'react'
import { Alert } from "react-native"
import { Buffer } from "buffer"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { getAxiosErrorMessage, useApi } from '../libs/api'
import { HttpStatus } from '../dtos/http.dto'
import { accountServices } from '../domain'
import { accountRepository } from '../infra'

interface DataProps {
  token: string
  account: object
}

interface CredentialProps {
  username: string
  password: string
}

interface AuthContextProps {
  loading: boolean
  token: string
  account: object
  signIn: (credentials: CredentialProps) => Promise<void>
  signOut: () => Promise<void>
}

interface ProviderProps {
  children: React.ReactNode
}

const AuthContext = React.createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [data, setData] = React.useState<DataProps>({} as DataProps)
  const [loading, setLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    async function main() {
      setLoading(true)

      try {
        const token = await AsyncStorage.getItem("monorepoapp.auth.token")
        const account = await AsyncStorage.getItem("monorepoapp.auth.account")

        if (token && account) {
          setData({
            token,
            account: JSON.parse(account)
          })
        }
      } catch (err: any) {
        Alert.alert("Session failure", err.message)
      } finally {
        setLoading(false)
      }
    }

    main()
  }, [])

  const signIn = async ({ username, password }: CredentialProps) => {
    setLoading(true)

    try {
      const basicToken = Buffer.from(`${username}:${password}`, 'ascii').toString("base64")

      const { token, account } = await accountServices(accountRepository(useApi)).login(basicToken)

      await AsyncStorage.setItem("monorepoapp.auth.token", token)
      await AsyncStorage.setItem("monorepoapp.auth.account", JSON.stringify(account))

      setData({ token, account })
      return

    } catch (err: any) {
      const error = getAxiosErrorMessage(err)
      console.log('Sign In failed', error)

      Alert.alert("Login failed", error)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)

    try {
      await AsyncStorage.removeItem("monorepoapp.auth.token")
      await AsyncStorage.removeItem("monorepoapp.auth.account")

      setData({} as DataProps)
    } catch (err: any) {
      console.log('Sign Out failed', err.mesage)
      Alert.alert('Sign out failed', err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ loading, token: data.token, account: data.account, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext)

  if (!context) {
    throw new Error("Auth context/provider not defined in app root")
  }

  return context;
}