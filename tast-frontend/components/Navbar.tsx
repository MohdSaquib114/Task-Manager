'use client'
import axios from 'axios'
import { useEffect, useState } from "react"
import { Button } from './ui/button'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import { useRouter } from 'next/navigation'



export default function Navbar() {
    const [isMenuOpen,setIsMenuOpen] = useState(false)
    const [user,setUser] = useState(null)
    const router = useRouter()

  
 useEffect(()=>{
   async function fecthUser(){
    try {
        const {data} = await axios.get(`https://task-manager-t77j.onrender.com/api/cookie/check-auth`,{withCredentials:true});
        if(data.cookie){
            
            setUser(data.user)
           
        }
    } catch (error) {
      console.log(error)  
    }
   }
   fecthUser()
 },[router])

 const handleLogout = async () => {
    try {
        const res = await axios.post(`https://task-manager-t77j.onrender.com/api/user/logout`,{withCredentials:true})
    
        setUser(null)
        router.push("/sign-in")

    } catch (error) {
        alert("Some thing went wrong")
    }
 }
   
  return (
    <header className="bg-gray-900 py-4">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-blue-500">TaskMaster</h1>
        <nav className="hidden md:flex space-x-4">
       { !user &&  <>
        <Button variant="ghost" className="text-white hover:text-blue-400">
            <Link href="/sign-in">Login</Link>
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 rounded-[.5rem] text-white">
            <Link href="/sign-up">Sign Up</Link>
          </Button>
       </> }
       {user && 
       <>
       
       
           <Button onClick={handleLogout} variant="ghost" className="bg-red-600 hover:bg-red-700 rounded-[.5rem] text-white">
           Logout
         </Button>
       </>
       } 
        </nav>
        <Button
          variant="ghost"
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
   {  isMenuOpen && 

            <div 
            className={`
            mt-4 md:hidden flex flex-col space-y-2 
            ${isMenuOpen ? 'animate-slide-in' : 'animate-slide-out'}
            ${isMenuOpen ? 'opacity-100' : 'opacity-0'}
            transition-opacity duration-500
            `}
           
            >
                {  !user && 
                <>                <Button variant="ghost" className="text-white hover:text-blue-400">
                            <Link href="/sign-in">Login</Link>
                    </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/sign-up">Sign Up</Link>
            </Button>
            </>

            }
             {user && 
       <>
       
       
           <Button onClick={handleLogout} variant="ghost" className="bg-red-600 hover:bg-red-700 rounded-[.5rem] text-white">
           Logout
         </Button>
       </>
       } 
            </div>
        }
      
    </div>
  </header>
  )
}
