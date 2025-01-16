import { ActivityIndicator, View } from "react-native";

export default function Loading() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF'
      }}
    >
      <ActivityIndicator size={"large"} color={'#000'} />
    </View>
  )
}