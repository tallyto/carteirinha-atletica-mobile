import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import Carteirinha from './pages/Carteirinha'
import Login from './pages/Login'

const switchNavigator = createSwitchNavigator({
    Login: {
        screen: Login
    },
    Carteirinha: {
        screen: Carteirinha
    },
    
})

export default createAppContainer(switchNavigator)