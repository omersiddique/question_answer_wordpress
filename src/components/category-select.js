import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import {categoryReducer, noCategories} from './category_reducer';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [];

for(let i = 2; i <= noCategories; i++){
  let categoryName = categoryReducer(i);
  categoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  names.push({id: i, title: categoryName});
}


export default function MultipleSelect(props) {
  const classes = useStyles();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const nameArray = [];
    event.target.value.forEach(element => {  
        var nameIndex = names.findIndex(x => x.title === element);
        nameArray.push(names[nameIndex].id);
    });
    props.categories(nameArray);
    setPersonName(event.target.value);
  };


  return (
    <div>    
      
      <FormControl fullWidth className={classes.formControl}>
        <InputLabel id="categories-label">Question Categories</InputLabel>
        <Select
          labelId="categories"
          id="categories"
          multiple                    
          value={personName}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {names.map((category) => (
            <MenuItem key={category.id} name={category.title} value={category.title} >
              {category.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
     
 
    </div>
  );
}