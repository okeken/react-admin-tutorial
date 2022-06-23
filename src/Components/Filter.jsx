//FilterPost.jsx
import React from "react";
import { Filter as FilterAdmin, ReferenceInput, TextInput, SelectInput } from "react-admin";

const Filter = ({searchLabel = 'Search', label='', reference='', source='', ...otherProps}) => (
  <FilterAdmin {...otherProps}>
    <TextInput label={searchLabel} source="q" alwaysOn />
    <ReferenceInput label={label} source={source} reference={reference} allowEmpty>
      <SelectInput optionText="name" />
    </ReferenceInput>
  </FilterAdmin>
);



export default Filter;