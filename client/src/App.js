import './App.scss';
import { Routes, Route} from 'react-router-dom';
import LoginViewController from './viewControllers/LoginViewController';
import SignupViewController from './viewControllers/SignupViewController';
import WelcomeScreenController from './viewControllers/WelcomeScreenController';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LoginViewController />} />
        <Route path="/signup" element={<SignupViewController />} />
        <Route path="/welcome" element={<WelcomeScreenController />} />
      </Routes>
    </div>
  );
}

export default App;
