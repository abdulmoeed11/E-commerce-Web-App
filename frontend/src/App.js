import Footer from "./components/Footer";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import { Routes, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />}></Route>
            <Route path="/product/:id" element={<ProductScreen />}></Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
