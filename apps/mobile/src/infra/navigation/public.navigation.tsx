import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { propsScreensNavigations } from "./navigation";

import Login from "../views/screens/Login";

const Stack = createNativeStackNavigator<propsScreensNavigations>()

export default function PublicNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={Login} />
    </Stack.Navigator>
  )
}