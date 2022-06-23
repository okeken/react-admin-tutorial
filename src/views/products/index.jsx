import React from "react";
import { List, Datagrid, TextField,  EditButton } from "react-admin";
import Filter from "../../Components/Filter";


const filterProps = {
  label: "brands",
  reference: "brands",
  source: "brandId",
}
 const ProductsList = props => (
  <List filters={<Filter  {...filterProps} />}  {...props}>
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="brandName"  />
      <TextField source="price" />
      <TextField source="description" />
      <EditButton />
    </Datagrid>
  </List>
);


export default ProductsList