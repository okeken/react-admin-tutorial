//CreateProducts.jsx
import React from "react";
import {
  Create,
  SimpleForm,
  ReferenceInput,
  TextInput,
  SelectInput,
} from "react-admin";


const ProductsCreate = props => (
  <Create {...props}>
    <SimpleForm>
      <ReferenceInput source="brandId" reference="brands"  label="brands">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="title" />
      <TextInput source="price" />
      <TextInput multiline source="description" />
    </SimpleForm>
  </Create>
);

export default ProductsCreate;