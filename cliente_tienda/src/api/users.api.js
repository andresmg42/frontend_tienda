import axios from 'axios'
const UserApi= axios.create({
    baseURL:'http://localhost:8000/api/'
})

export const getAllUsers = () => UserApi.get("/usuarios/")


export const createUser=(user)=>{
    return UserApi.post("/usuarios/",user)
}

export const getUser=(id)=>UserApi.get('/usuarios/'+id+'/')

export const updateUser=(id,user)=> {
    return UserApi.put("/usuarios/"+id+"/",user)
}

export const deleteUser=(id)=> UserApi.delete('/usuarios/'+id+'/')


export const searchUsers=(searchCriteria,searchValue)=> UserApi.get('/filter_users/?criteria='+searchCriteria+'&'+'value='+searchValue)