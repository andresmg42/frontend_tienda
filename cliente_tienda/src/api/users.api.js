 import axios from 'axios'
// const UserApi= axios.create({
//     baseURL:'http://localhost:8000/'
// })

const UserApi = axios.create({
    baseURL: 'http://localhost:8000/',
});

// Agregar el token automáticamente
// UserApi.interceptors.request.use(config => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//         config.headers.Authorization = `Token ${token}`;
//     }
//     return config;
// });

// export default UserApi;

export const getAllUsers = () => UserApi.get("api/usuarios/")


export const createUser=(user)=>{
    return UserApi.post("api/usuarios/",user)
}

export const registerUser=(user)=>{
    return UserApi.post("usuarios/register/",user, {headers: {
        'Content-Type': 'application/json'
      }})
}

export const getUser=(id)=>UserApi.get('api/usuarios/'+id+'/')

// export const updateUser=(id,user)=> {
//     return UserApi.put("/usuarios/"+id+"/",user)
// }

export const updateUser=(user)=>{
    return UserApi.put("usuarios/update/",user)
}

export const deleteUser=(id)=> UserApi.delete('api/usuarios/'+id+'/')


export const searchUsers=(searchCriteria,searchValue)=> UserApi.get('api/filter_users/?criteria='+searchCriteria+'&'+'value='+searchValue)

export const login=(user)=>UserApi.post('login/',user)

export const profile=(user)=>UserApi.post('profile/',user,{headers: {
    'Authorization': `Token ${localStorage.getItem('authToken')}`
  }})