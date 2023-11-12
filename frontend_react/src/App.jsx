import "./App.scss";

import { About, Footer, Header, Skills, UTMBuilder, Work } from "./container";
import { Navbar } from "./components/index";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Header />
              <About />
              <Work />
              <Skills />
              <Footer />
            </>
          }
        />
        <Route path="/utm_builder" element={<UTMBuilder />} />
      </Routes>
    </div>
  );
}

export default App;
