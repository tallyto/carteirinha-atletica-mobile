import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Carteirinha from "./pages/Carteirinha";
import Login from "./pages/Login";
import Parceria from "./pages/Parceria";

const tabNavigator = createMaterialTopTabNavigator(
  {
    Perfil: {
      screen: Carteirinha,
      navigationOptions: {
        title: "Perfil",
      }
    },
    Parceiros: {
      screen: Parceria,
      navigationOptions: {
        title: "Parceiros"
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#ffff",
      upperCaseLabel: false,
      tabStyle: {
        height: 50
      },
      style: {
        backgroundColor: "#000"
      },
      indicatorStyle: {
        backgroundColor: "#ffff"
      }
    },
    tabBarPosition: "bottom"
  }
);
const switchNavigator = createSwitchNavigator({
  Login: {
    screen: Login
  },
  Tab: {
    screen: tabNavigator,
  }
});

export default createAppContainer(switchNavigator);
