'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import axios from "axios"
import { useRouter } from 'next/navigation'

const api_uri = ""

export default function SignupForm() {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      setError('')
      setSuccess(false)
  
      if (!name || !username || !password) {
        setError('All fields are required')
        return
      }
  
      if (password.length < 6) {
        setError('Password must be at least 6 characters long')
        return
      }
  
      const {data} = await axios.post(`https://task-manager-t77j.onrender.com/api/user/sign-up`,{name,username,password},{withCredentials:true})
      setSuccess(true)
    
      if(data.success){
         router.push("/")
      }
  
     
      
    } catch (error) {
             //@ts-ignore
      if(error.response.data?.message ){
        //@ts-ignore
        setError(error.response.data?.message)
      }

      setError("Something went wrong")
    } finally {
      setName('')
      setUsername('')
      setPassword('')
    }
   
  }

  return (
    <div className='w-screen h-screen flex items-center bg-black'>
    <Card className="w-full max-w-md mx-auto bg-gray-900 border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
        <CardDescription className="text-gray-400">Create a new account to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-200">Name</Label>
            <Input 
              id="name" 
              type="text" 
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-800 text-white border-gray-700 focus:border-blue-500 rounded-[8px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-200">Username</Label>
            <Input 
              id="username" 
              type="text" 
              placeholder="john_11"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-800 text-white border-gray-700 focus:border-blue-500 rounded-[8px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-200">Password</Label>
            <Input 
              id="password" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-800 text-white border-gray-700 focus:border-blue-500 rounded-[8px]"
            />
          </div>
          {error && (
            <Alert variant="destructive" className="bg-red-900 border-red-80 rounded-[8px]">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="bg-green-900 border-green-800 rounded-[8px]">
              <AlertDescription>Account created successfully!</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-[8px]">
            Sign Up
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-400">
          Already have an account? <a href="/sign-in" className="text-blue-400 hover:underline">Log in</a>
        </p>
      </CardFooter>
    </Card>
    </div>
  )
}