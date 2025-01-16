import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { propsScreensNavigations } from "./navigation";

import BottomPrivateNavigation from "./bottom-private.navigation";

const Stack = createNativeStackNavigator<propsScreensNavigations>()

export default function PrivateNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="BottomButtonsNavigation"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="BottomButtonsNavigation" component={BottomPrivateNavigation} />
    </Stack.Navigator>
  )
}