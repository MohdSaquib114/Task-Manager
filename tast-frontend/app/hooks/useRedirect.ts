'use client'
import { useEffect } from "react";
import axios from "axios"
import { useRouter } from "next/navigation";


export default function useRedirect() {
    const router = useRouter()
    useEffect(() => {
        const checkAuth = async () => {
          try {
            const {data} = await axios.get('https://task-manager-t77j.onrender.com/api/cookie/check-auth',{withCredentials:true});
            
            if(data.cookie){
             
            return 
            }
            else{
                
              router.push("/sign-in");
            }
          } catch (error) {
            router.push("/sign-in");
         
          }
        };
        checkAuth();
      }, [router]);
}