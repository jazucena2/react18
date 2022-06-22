import axios from "axios";
import { Component } from "react";

const baseUrl = "https://localhost:7140/api/"

export default {
    dCandidate(url = baseUrl + 'CRUD1'){
        return {
            fetchAll : () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + "/"+ id, updateRecord),
            delete: id => axios.delete(url +"/"+ id)
        }
    }
}


    

