import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { ThemeProvider } from 'styled-components'

import { AuthProvider } from "@module/core"

import theme from "../theme";
import Navigations from "./navigation";


export default function Root() {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 25 }} >
      <StatusBar
        animated
        translucent
        networkActivityIndicatorVisible
        style={'light'}
        backgroundColor={theme.colors.background}
      />
      <ThemeProvider theme={theme} >
        <AuthProvider>
          <Navigations />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaView>
  )
}