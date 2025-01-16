import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type propsScreensNavigations = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  BottomButtonsNavigation: undefined;
  Dashboard: undefined;
};

export type propsStack = NativeStackNavigationProp<propsScreensNavigations>;
export type propsNavigation = RouteProp<propsScreensNavigations>;
