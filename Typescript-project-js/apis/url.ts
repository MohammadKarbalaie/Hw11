export const urls = {  
    auth: {  
     login: "/auth/login",  
     signup: "/auth/signup",  
    },  
    user: "/user",  
    sneaker: "/sneaker",  
    sneakeritm: (id: string | number): string => `/sneaker/item/${id}`,  
    brands: "/sneaker/brands",  
  };