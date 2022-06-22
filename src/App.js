
import { BrowserRouter as Router, Switch, Route, Routes} from "react-router-dom";
import React,{Component} from 'react';
import axios from 'axios';
import { Provider } from "react-redux";
import Signup from './components/Signup/signup2'
import CRUD from './components/CRUD';
import {store} from './actions/store'
import { fetchAll, update, create, Delete } from "./actions/dcandidate";
import  {dCandidate}  from "./reducers/dcandidate";
import api from "./actions/api"
function App() {
  const initialState = {
    list:[]
}

  // const superhero = store.dispatch(fetchAll())
  
  // const superhero2 = store.dispatch(update())
  // const superhero3 = store.dispatch(Delete())
  // console.log(superhero)
  return (
    
  <>
  <Provider store={store}> 
   <Router>
     <Routes>
       <Route path="/crud" element={<CRUD/>} />
       <Route path="/" element={<Signup/>} />
     </Routes>
   </Router>
   </Provider>     
      
  </>
  
  
  );
}

export default App;


      