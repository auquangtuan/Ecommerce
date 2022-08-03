import './App.css';
import DefaultTemplate from './Templates/DefaultTemplate/DefautTemplate'
import { publicRoutes } from './routers';
import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


function App() {
  
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          let Layout = DefaultTemplate;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
