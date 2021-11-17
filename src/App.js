import HomePage from './Homepage';
import Features from './Features';
import Service from './Service';
import SignUp from './SignUp';
import Guide from './Guide';
import SignupUser from './SignupUser';
import SignAdmin from './SignupAdmin';
import UserProfile from './UserProfile';
import AdminProfile from './AdminProfile';
import CreateOrder from './CreateOrder';
import Popup from './DestinationPopup';
import Login from './Login';

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/Features" component={Features}/>
          <Route exact path="/Service" component={Service}/>
          <Route exact path="/SignUp" component={SignUp}/>
          <Route exact path="/Guide" component={Guide}/>
          <Route exact path="/SignupUser" component={SignupUser}/>
          <Route exact path="/SignupAdmin" component={SignAdmin}/>
          <Route exact path="/UserProfile" component={UserProfile}/>
          <Route exact path="/AdminProfile" component={AdminProfile}/>
          <Route exact path="/CreateOrder" component={CreateOrder}/>
          <Route exact path="/DestinationPopup" component={Popup}/>
          <Route exact path="/Login" component={Login}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
