import { register_user ,verfify_Email} from '../api/users.api';
import { createPedido, llenarPedidosProductos } from '../api/pedidos.api';

export const authService = {
  async register(username, email, password,captcha) {
    try {
        const newdata={
            captcha:captcha,
            user:{
            username:username,
            email:email,
            password:password,
            is_staff:false,
            is_superuser:false
          }

        
        }
      const response= await register_user(newdata)
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  async verifyEmail(token) {
    try {
      const response = await verfify_Email(token);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  async HacerCompra(formData,userProducts) {

 
    // const [userProducts,setUserProducts]=useState([]);
     
    
     
    
    //   useEffect(()=>{
    //    async function loadUserProducts(){
    //     try {
    //       const res= await searchUserProducts(localStorage.getItem('user_id'))
    //       setUserProducts(res.data)
    //     } catch (error) {
    //       console.log('error al cargar los productos del usuario en PedidosClientePage',error)
    //     }
    
    //    };
    //    loadUserProducts()
    
    //   },[])
    
    
      // const [formData, setFormData]=useState({
      //   direccion:"",
      //   metodo_pago:"Transferencia bancaria",
      //   usuarios:parseInt( localStorage.getItem('user_id')),
      //   estado_pedido:false,
    
        
    
      // });


    
      // const handleChange=(e)=>{
      //   setFormData({
      //     ...formData,[e.target.name]:e.target.value
      //   });
      // };
    
     
        
    
        try {
          const res_pedido= await createPedido(formData)
    
          const lista=userProducts.map((product)=>{
            return {
              cantidad_producto_carrito:product.cantidad_user_producto,
              pedido_ppid:res_pedido.data.id,
              producto_ppid:product.id
      
            } 
          })
          
          console.log(lista)

        } catch (error) {
          console.log('error al crear Pedido',error)
        }

        try {
          const res2=await llenarPedidosProductos(lista)
          console.log('esto es lo que retorna llenar tabla',res2.data)
        } catch (error) {
          console.error('error la llenarPedidosProduct',error)
        }
  
    
       
        
       
      

 
}
}