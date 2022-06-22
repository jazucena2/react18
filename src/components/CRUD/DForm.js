import {    
    Grid,        
    Paper,    
    Container,
    Button,
    Typography,    
    TextField 
  } from "@mui/material";  
  import React, { useEffect, useState } from "react";   
  import useLocalStorage from "./value";  
  import { connect } from "react-redux";  
  import {create, update, fetchAll} from "../../actions/dcandidate";
  import {store} from '../../actions/store'
  import  {style, styled} from "@mui/system"

  const PapCom = styled(Paper)({
        marginTop: 80,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20
  })
  const ForCom = styled('form')({
        width: '100%', // Fix IE 11 issue.
        marginTop: 10,
  })
  const TextForm = styled(TextField)({
        marginTop:10
  })
  const BForm = styled(Button)({
    marginTop:8
})

  const DForm = ({...props}) => {    
    const [defaultstate, setDefault] = useLocalStorage("edit", []);
    const [username, setUsername] = useLocalStorage("user",[]);
    const [id, setID] = useState([]);
    const [errors, setErrors] = useState([]);
    const baseUrl = "https://localhost:7140/api/CRUD1/";
    const initialV = {
      Name: "",
      FirstName: "",
      LastName: "",
      Place: "",
    };
    const [values, setValues] = useState({ initialV });
    
    try {
      useEffect(() => {
        if (localStorage.getItem("edit") !== null || []) {
          setValues(JSON.parse(localStorage.getItem("edit")));
          setUsername(JSON.parse(localStorage.getItem("user")));
          setID(values.Id);
          console.log(values)
          console.log(values.Name)
        } else {
          window.alert("id");
          setDefault([]);
          setValues(initialV);
          setID([]);
          console.log(values)
        }
      }, [id]);
    } catch (error) {
      setValues(initialV);
      setID([]);
      setDefault([]);
      console.log(error);
    }
  
    function resetAll(e) {
      setDefault([]);
      setID([]);
      setValues(initialV);
    }
    function handle(e) {
      const newdata = { ...values };
      newdata[e.target.name] = e.target.value;
      setValues(newdata);
      // console.log(newdata);
    }
    const validate = (fieldValues = values) =>{
      let temp ={...errors}
      if ('Name' in fieldValues)
      temp.Name = values.Name ?"":"This field is required."
      if ('Place' in fieldValues)
      temp.Place = values.Place ?"":"This field is required."
      if ('FirstName' in fieldValues)
      temp.FirstName = values.FirstName ?"":"This field is required."
      if ('LastName' in fieldValues)
      temp.Place = values.LastName ?"":"This field is required."
      setErrors({
          ...temp
      })
      if ( fieldValues == values)
      return Object.values(temp).every(x => x == "")
  }

    const post = (e,...props) =>{      
      try{
        e.preventDefault()        
        console.log(values)
        console.log(values.Id)
        const onSuccess = () => {console.log(values)}
            if(values.Id){
              store.dispatch(update(id,values,onSuccess))
              setDefault([]);
              setID([]);
              setValues(initialV)              
              window.location.reload(true) 
              store.dispatch(fetchAll())
            }   
            else{              
              store.dispatch(create(values,onSuccess))
              window.location.reload(false) 
            }
      }catch(error){  
          console.log(error)
      }
    }
    return (
      <ForCom autoComplete="off"  onSubmit={post}>      
        <>
        <Container component="main" maxWidth="xs">
        <PapCom>
        {username.email != null ?
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextForm
              name="Name"
              required
              variant="outlined"
              fullWidth
              label="Hero Name"              
              value={values.Name}
              type="text"              
              onChange={(e) => handle(e)}
            />
            <TextForm
            name="Place"
            required
            variant="outlined"
            fullWidth
            label="Place"              
            value={values.Place}
            onChange={(e) => handle(e)}
            />            
          
            <TextForm
              name="FirstName"
              required
              variant="outlined"
              label="First Name"
              fullWidth
              value={values.FirstName}
              onChange={(e) => handle(e)}
            />
            <TextForm
              name="LastName"
              required
              variant="outlined"
              label="Last Name"
              fullWidth
              value={values.LastName}
              onChange={(e) => handle(e)}
            />
            
              <BForm
                fullWidth 
                variant="contained"
                color="primary"
                type="submit"
                spacing={6}
                xs={6}                
              >
                Submit
              </BForm>
              <BForm
                fullWidth
                variant="contained"
                color="primary"
                onClick={(e) => resetAll(e)}
                spacing={6}
                xs={6}
              >
                Reset
              </BForm>
              </Grid>
            </Grid>:
            <PapCom>
            <Typography variant="h6" align="center">

              Please Sign In to enter your superhero.

            </Typography>
          </PapCom> }
        </PapCom>
        </Container>
        </>      
      </ForCom>
    );
  };
const mapStateToProps = state => ({
    
    dTableList:state.dCandidate.list

})


  export default connect(mapStateToProps)(DForm);
  
  