import * as React from "react";
import { Admin, Resource, CustomRoutes } from "react-admin";
import { Dashboard } from "./Components/DashBoard.jsx";
import BrandList from "./views/brands/index.jsx";
import dataProvider from "./dataProvider";
import { authProvider } from "./authProvider.js";
import ProductsCreate from "./views/products/components/CreateProducts.jsx";
import EditProducts from "./views/products/components/EditProducts.jsx";
import ProductList from "./views/products";
import Login from "./views/Login.jsx";
import { Route } from "react-router-dom";
import Register from "./views/Register";

const App = () => (
  <Admin
    loginPage={Login}
    dashboard={Dashboard}
    authProvider={authProvider}
    dataProvider={dataProvider}
  >
    <CustomRoutes noLayout>
      <Route path="/register" element={<Register />} />
    </CustomRoutes>

    <Resource name="brands" list={BrandList} />
    <Resource
      name="products"
      list={ProductList}
      edit={EditProducts}
      create={ProductsCreate}
    />
  </Admin>
);

export default App;
