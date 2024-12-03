import axios from 'axios'
const UserApi= axios.create({
    baseURL:'http://localhost:8000/api/'
})

export const getAllUsers = () => UserApi.get("/usuarios/")


export const createUser=(user)=>{
    return UserApi.post("/usuarios/",user)
}

export const registerUser=(user)=>{
    return UserApi.post("http://localhost:8000/usuarios/register/",user, {headers: {
        'Content-Type': 'application/json'
      }})
}

export const getUser=(id)=>UserApi.get('/usuarios/'+id+'/')

// export const updateUser=(id,user)=> {
//     return UserApi.put("/usuarios/"+id+"/",user)
// }

export const updateUser=(user)=>{
    return UserApi.put("http://localhost:8000/usuarios/update/",user)
}

export const deleteUser=(id)=> UserApi.delete('/usuarios/'+id+'/')


export const searchUsers=(searchCriteria,searchValue)=> UserApi.get('/filter_users/?criteria='+searchCriteria+'&'+'value='+searchValue)