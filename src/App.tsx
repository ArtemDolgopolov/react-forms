import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Main from './components/Main';
import UncontrolledForm from './components/Uncontrolled';
import ReactHookForm from './components/reactHookForm';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Main</Link>
              </li>
              <li>
                <Link to="/uncontrolled">Uncontrolled Form</Link>
              </li>
              <li>
                <Link to="/react-hook-form">React Hook Form</Link>
              </li>
            </ul>
          </nav>

          <hr />

          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/uncontrolled" element={<UncontrolledForm />} />
            <Route path="/react-hook-form" element={<ReactHookForm />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
