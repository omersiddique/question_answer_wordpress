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

export default function PaginationSize(props) {
  const postsPerPage = 5;
 // const classes = useStyles();
 const numPages = Math.ceil(props.pages/postsPerPage);
 //console.log('POPS', props.pages);
 //console.log('numPages', numPages);
  return (
    <div className={`pagination`}>
      <Pagination count={numPages} size="large" onChange={props.changeFunction} />
    </div>
  );
}