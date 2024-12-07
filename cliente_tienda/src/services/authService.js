import { register_user ,verfify_Email} from '../api/users.api';


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

 
};