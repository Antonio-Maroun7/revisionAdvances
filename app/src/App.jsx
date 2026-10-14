import ProductsView from "./views/ProductsView";

import UsersView from "./views/UsersView";
import UserFormView from "./views/UsersForm";
import AppNavbar from "./components/AppNavBar";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import ProductFormView from "./views/ProductsFormView";

function App() {
  return (
    <>
      <AppNavbar />
      <Container className="pb-5">
        <Routes>
          <Route path="/" element={<UsersView />} />
          <Route path="/users/new" element={<UserFormView />} />
          <Route path="/users/:id" element={<UserFormView />} />
          <Route path="/products" element={<ProductsView />} />
          <Route path="/products/new" element={<ProductFormView />} />
          <Route path="/products/:id/edit" element={<ProductFormView />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
