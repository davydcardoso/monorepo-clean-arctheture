import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { LayoutDashboard } from "lucide-react-native"

import { propsScreensNavigations } from "./navigation"

import Dashboard from "../views/screens/Dashboard"

import theme from "../../theme"

const BottomTab = createBottomTabNavigator<propsScreensNavigations>()

export default function BottomPrivateNavigation() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarStyle: {
          height: 75,
          elevation: 5,
          paddingTop: 5,
          borderWidth: 0,
          shadowOffset: { width: 2, height: 2, },
          paddingBottom: 10,
          shadowOpacity: 1,
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <BottomTab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <LayoutDashboard size={24} color={color} />
          )
        }}
      />
    </BottomTab.Navigator>
  )
}
