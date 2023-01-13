import HomePage from './components/pages/HomePage'
import LoginPage from './components/pages/LoginPage'
import ProfilePage from './components/pages/ProfilePage'
import SettingsPage from './components/pages/SettingsPage'
import MatchMePage from './components/pages/MatchMePage'
import OpponentsPage from './components/pages/OpponentsPage'
import BuddiesPage from './components/pages/BuddiesPage'
import StatisticsPage from './components/pages/StatisticsPage'
import Layout from './components/nav/Layout'
import Route from './components/nav/Route'

function App() {
  return <div>
    <Layout>
      <Route path="/">
        <HomePage />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/profile">
        <ProfilePage />
      </Route>
      <Route path="/settings">
        <SettingsPage />
      </Route>
      <Route path="/match-me">
        <MatchMePage />
      </Route>
      <Route path="/opponents">
        <OpponentsPage />
      </Route>
      <Route path="/buddies">
        <BuddiesPage />
      </Route>
      <Route path="/statistics">
        <StatisticsPage />
      </Route>
    </Layout>
  </div>;
}

export default App;
