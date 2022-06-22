import {
    Button,
    ButtonGroup,
    Grid,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    withStyles,
    Typography,
    Paper, Table
  } from "@mui/material";
  // import { Paper, Table } from "@mui/material";
  import React, { useState, useEffect } from "react";
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
  // import { Form } from "react-bootstrap";
  import axios from "axios";
  import useLocalStorage from "./value";
  import * as actions from "../../actions/dcandidate";
  import { connect } from "react-redux";  
  import {fetchAll, Delete} from "../../actions/dcandidate";
  import {store} from '../../actions/store'
  
  
  
  const DTable = ({ classes, ...props }) => {
    const [item, setItem] = useState([]);
    const [currentid, setCurrentId] = useState({ id: "" });
    const [item2, setItem2] = useState([]);
    const [storeID, setStoreID] = useLocalStorage("edit", []);
    const [username, setUsername] = useLocalStorage("user",[]);
    const baseUrl = "https://localhost:7140/api/";
   

    
    useEffect(() => {
      const fetchP = async () => {
        try {
          // const res = await axios.get(baseUrl + "CRUD1/");
          const superhero = store.dispatch(fetchAll())
          setUsername(JSON.parse(localStorage.getItem("user")));
          setItem(superhero);
          // setStoreID([]);
          // console.log(setItem);
        } catch (err) {
          if (err.res) {
            console.log(err.res.data);
          } else {
            console.log(err);
          }
        }
      };
      fetchP();
    }, []);
  
    const fetchID = async (ID) => {
      console.log(ID);  
      const updateitem = await axios.get(baseUrl + "CRUD1/" + ID);
      console.log(baseUrl + "CRUD1/" + ID);      
      setStoreID(updateitem.data.Result);
      window.location.reload(false);
      if (storeID) {
        console.log(updateitem.data.Result.Name);
        console.log(updateitem.data.Result.FirstName);
        console.log(updateitem.data.Result.LastName);
        console.log(updateitem.data.Result.Place);
      } else {
        console.error();
      }
    };
  
    const deleteID = async (ID) => {
      if (window.confirm("Are you sure on deleting this item?")) {
        console.log(ID);
        setStoreID([]);
        const onSuccess = () => {console.log(ID)}
        store.dispatch(Delete(ID, onSuccess))

        // await axios.delete(baseUrl + "CRUD1/" + ID);
        // delete: id => axios.delete(url + id)
        window.location.reload(true);
      }
    };
  
    return (
        <>
         <Paper sx={{ width: "100%", overflow: "hidden" }}>
         <Grid container>
          <TableContainer
            component={Paper}
            sx={{
              border: "4px",
              padding: 1,
              height: 400,
              margin: "auto",
              "&::-webkit-scrollbar": { width: 20 },
              "&::-webkit-scrollbar-track": { backgroundColor: "white" },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "Grey",
                borderRadius: 2,
              },
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6">Hero Name</Typography>{" "}
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">First Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Last Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Place</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{
                
              props.dTableList.map((record, index) => {
                {/* {item.map((record, index) => { */}
                  return (
                    <TableRow key={index} hover>
                      <TableCell>{record.Name}</TableCell>
                      <TableCell>{record.FirstName}</TableCell>
                      <TableCell>{record.LastName}</TableCell>
                      <TableCell>{record.Place}</TableCell>
                      {/* <TableCell>{record.Id}</TableCell> */}
                      {username.email ?
                      <ButtonGroup>
                        <Button>
                          <EditIcon
                            color="primary"
                            onClick={() => fetchID(record.Id)}
                          />
                        </Button>
                        <Button>
                          <DeleteOutlinedIcon
                            color="secondary"
                            onClick={() => deleteID(record.Id)}
                          />
                        </Button>
                      </ButtonGroup>: <></>}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          </Grid>
          </Paper>
        </>
     
    );
  };

  const mapStateToProps = state =>({
    dTableList: state.dCandidate.list
  })

  const mapActionToProps = {
    fetchAlldTable: actions.fetchAll,
    deleteDtable: actions.Delete
  }
  export default connect(mapStateToProps, mapActionToProps)(DTable);
  // export default DTable;
  // export default withStyles((styles)(DTable));
  