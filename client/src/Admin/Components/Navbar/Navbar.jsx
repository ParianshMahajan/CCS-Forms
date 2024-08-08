import React from 'react'
import styles from './Navbar.module.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Navbar = () => {
  return (
    <div className={styles.main}>
        <div className="">
        Home 

        {/* dropdown here */}
        FORMS 
        
        </div>
        <Button variant="outlined" color="error">
          LOGOUT
        </Button>
    </div>
  )
}

export default Navbar