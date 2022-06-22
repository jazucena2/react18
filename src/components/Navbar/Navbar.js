import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@mui/material/';
import useLocalStorage from '../CRUD/value';
import { useNavigate } from "react-router-dom";
import  {style, styled} from "@mui/system"
import { deepPurple } from '@mui/material/colors'

const AppCom = styled(AppBar)({
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
//     [theme.breakpoints.down('sm')]: {
//       flexDirection: 'column',
//     },
  
})
const TypoCom = styled(Typography)({
    display: 'flex',
    alignItems: 'center',
    textAlign: 'right',
    marginRight: '30px',
})
const ToolCom = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  //     [theme.breakpoints.down('sm')]: {
  //       width: 'auto',
  //     },
})
const DivCom = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  width: '400px',
  alignItems: 'center',
//     [theme.breakpoints.down('sm')]: {
//       width: 'auto',
//       marginTop: 20,
//       justifyContent: 'center',
//     },
})
const AvaCom = styled(Avatar)({
  // color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    marginRight: '10px' ,
})

const ButCom = styled(Button)({
  marginRight: '30px',
})
const Navbar = () => {
  const [user, setUser] = useLocalStorage("user", []);  
  let navigate = useNavigate();

  try{
    useEffect(() => {
    if (localStorage.getItem("user") !== null || []) {
      setUser(JSON.parse(localStorage.getItem("user")))
      
    }else{
      window.alert("Error occured. Please reload page.")
    }},[])
  } catch(err){
    window.alert("Error occured. Please reload page.")  
  }
  
  const logout = () => {    
      setUser([]);
      navigate("/")
    
    
  };



  return (
    
    <AppCom position="static" color="inherit">        
      <TypoCom variant="h6">SUPERHEROES LIST</TypoCom>
      <ToolCom>
        {user?.email ? (
          <DivCom>                      
            <AvaCom>User</AvaCom>
            <TypoCom variant="h6">
              {user?.email}
            </TypoCom>            
            <ButCom variant="contained"  color="secondary" onClick={logout}>Logout</ButCom>
          </DivCom>
        ) : (
          <Button  variant="contained" color="primary" onClick={logout}>Sign In</Button>
        )}       
      </ToolCom>
    </AppCom>
  );
};

export default Navbar;