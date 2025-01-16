import React from 'react'
import { NavigationContainer } from "@react-navigation/native"

import { useAuth } from "@module/core"

import PublicNavigation from "./public.navigation"
import PrivateNavigation from "./private.navigation"

import Loading from "../views/screens/Loading"

export default function Navigations() {
  const { loading, account } = useAuth()

  if (loading) return <Loading />

  const renderRoutes = () => {
    if (!account) return <PublicNavigation />

    return <PrivateNavigation />
  }

  return (
    <NavigationContainer>
      {renderRoutes()}
    </NavigationContainer>
  )
}