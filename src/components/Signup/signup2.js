import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  
} from "@mui/material"
import  {styled} from "@mui/system"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import axios from "axios";
import useLocalStorage from "../CRUD/value";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const PaperCom = styled(Paper)({
    marginTop: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",    
    padding: 10,
    elevation: 8
    
})
const FormCom = styled('form')({
   width: "100%", // Fix IE 11 issue.
   marginTop: 30,
})
const BuForm = styled(Button)({
  marginTop: 5
})

// const styles = makeStyles((theme) => ({
//   paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     padding: theme.spacing(2),
//   },
//   root: {
//     "& .MuiTextField-root": {
//       margin: theme.spacing(1),
//     },
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(3),
//   },
//   submit: {
//     margin: theme.spacing(3, 0, 2),
//   },
// }));

const SignUp = () => {
  // const classes = styles();
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useLocalStorage("user", []);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const baseUrl = "https://localhost:7140/api/Auth/";
  let navigate = useNavigate();
  // setIsSignup(true);
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      console.log(form);
      axios
        .post(baseUrl + "register", {
          Username: form.email,
          Password: form.password,
        })
        .then((res) => {
          if (window.confirm("Registered Successfully")) {
            setForm(initialState);
            setIsSignup((prevIsSignup) => !prevIsSignup);
            setShowPassword(false);
            window.location.reload(true);
            console.log(res);
          } else {
            console.log(res);
          }
        });
    } else {
      console.log(form);
      try {
        axios
          .post(baseUrl + "login1", {
            Username: form.email,
            Password: form.password,
          })
          .then((res) => {
            if (window.confirm("Logged In Successfully")) {
              setUsername(form);
              navigate("/crud");
              console.log(res);
            }
          })
          .catch((err) => {
            window.alert("Account not found. Please Sign-up");
          });
      } catch (error) {
        window.alert("Error. Please try again");
      }
    }
  };

  const switchMode = (e) => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
    e.target.value = null;
    console.log(form);
  };

  return (
    <>
    <Container component="main" maxWidth="xs">
      <PaperCom >  
        <Avatar>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        <FormCom onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  autoFocus
                  half
                  handleChange={handleChange}
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  half
                  handleChange={handleChange}
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              type="email"
              handleChange={handleChange}
            />
            <Input
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              handleChange={handleChange}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                type="password"
                handleChange={handleChange}
              />
            )}
          </Grid>
          <BuForm type="submit" fullWidth variant="contained" color="primary">
            {isSignup ? "Sign Up" : "Sign In"}
          </BuForm>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </FormCom>
      </PaperCom>
    </Container>

    </>
  );
};

export default SignUp;
