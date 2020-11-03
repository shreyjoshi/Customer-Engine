import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import AuthNavigation from './AuthNavigator'
import AppNavigation from './BottomTabNavigator'

const SwitchNavigator = createSwitchNavigator(
  {
    Auth: AuthNavigation,
    App: AppNavigation
  },
  {
    initialRouteName: 'App'
  }
)

const AppContainer = createAppContainer(SwitchNavigator)

export default AppContainer