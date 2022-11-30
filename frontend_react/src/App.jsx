import { useState } from "react";
import "./App.scss";

import { About, Footer, Header, Skills, Testimonial, Work } from "./container";
import { Navbar } from "./components/index";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Footer />
    </div>
  );
}

export default App;
