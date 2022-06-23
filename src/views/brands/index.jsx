import * as React from "react";
import {  Datagrid, List, TextField } from "react-admin";


const BrandList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
        </Datagrid>
    </List>)

export default BrandList;