//EditProducts.jsx
import React from "react";
import {
  Edit,
  SimpleForm,
  ReferenceInput,
  TextInput,
  SelectInput,
} from "react-admin";
//

 const EditProducts = props => (
  <Edit {...props}>
    <SimpleForm>
      <ReferenceInput source="brandId" reference="brands"  label="brands">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="title" />
      <TextInput source="price" />
      <TextInput multiline source="description" />
    </SimpleForm>
  </Edit>
);

export default EditProducts;