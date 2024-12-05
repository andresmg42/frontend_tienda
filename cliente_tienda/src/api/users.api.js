 import axios from 'axios'


const UserApi = axios.create({
    baseURL: 'http://localhost:8000',
});


export const getAllUsers = () => UserApi.get("/api/usuarios/",{headers: {
    'Authorization': `Token ${localStorage.getItem('authToken')}`
  }})




export const registerUser=(user)=>{
    return UserApi.post("/api/usuarios/register/",user, {headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('authToken')}`
        
        
      }})
}

export const getUser=(id)=>UserApi.get('/api/usuarios/'+id+'/',{headers: {
    'Authorization': `Token ${localStorage.getItem('authToken')}`
  }})

export const updateUser=(user)=>{
    return UserApi.put("/api/usuarios/update_user/",user,{headers: {
        'Authorization': `Token ${localStorage.getItem('authToken')}`
      }})
}

export const deleteUser=(id)=> UserApi.delete('/api/usuarios/'+id+'/',{headers: {
    'Authorization': `Token ${localStorage.getItem('authToken')}`
  }})


export const searchUsers=(searchCriteria,searchValue)=> UserApi.get('/api/usuarios/search_users/?criteria='+searchCriteria+'&'+'value='+searchValue,{headers: {
    'Authorization': `Token ${localStorage.getItem('authToken')}`
  }})

export const login=(user)=>UserApi.post('/login/',user)





  // COPIA------------------------------------------------------------------

//   const UserApi = axios.create({
//     baseURL: 'http://localhost:8000/',
// });


// export const getAllUsers = () => UserApi.get("api/usuarios/",{headers: {
//     'Authorization': `Token ${localStorage.getItem('authToken')}`
//   }})




// export const registerUser=(user)=>{
//     return UserApi.post("usuarios/register/",user, {headers: {
//         'Content-Type': 'application/json'
//       }})
// }

// export const getUser=(id)=>UserApi.get('api/usuarios/'+id+'/',{headers: {
//     'Authorization': `Token ${localStorage.getItem('authToken')}`
//   }})

// export const updateUser=(user)=>{
//     return UserApi.put("usuarios/update/",user,{headers: {
//         'Authorization': `Token ${localStorage.getItem('authToken')}`
//       }})
// }

// export const deleteUser=(id)=> UserApi.delete('api/usuarios/'+id+'/',{headers: {
//     'Authorization': `Token ${localStorage.getItem('authToken')}`
//   }})


// export const searchUsers=(searchCriteria,searchValue)=> UserApi.get('api/filter_users/?criteria='+searchCriteria+'&'+'value='+searchValue,{headers: {
//     'Authorization': `Token ${localStorage.getItem('authToken')}`
//   }})

// export const login=(user)=>UserApi.post('login/',user)

// export const profile=(user)=>UserApi.post('profile/',user,{headers: {
//     'Authorization': `Token ${localStorage.getItem('authToken')}`
//   }})