import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       marginTop: theme.spacing(2),
//     },
//     textAlign: `center`,
//     margin: '0 auto',
//   },
// }));

export default function PaginationSize() {
 // const classes = useStyles();

  return (
    <div className={`pagination`}>
      <Pagination count={10} size="large" />
    </div>
  );
}