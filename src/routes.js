import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Carteirinha from "./pages/Carteirinha";
import Login from "./pages/Login";
import Parceiros from "./pages/Parceiros";

const switchNavigator = createSwitchNavigator({
  Login: {
    screen: Login
  },
  Carteirinha: {
    screen: Carteirinha,
  },
  Parceiros: {
    screen: Parceiros
  }
});

export default createAppContainer(switchNavigator);
