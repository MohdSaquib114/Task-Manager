'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from 'next/link'
import axios from "axios"
import { useRouter } from 'next/navigation'

export default function SignInForm() {
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

    if (!username || !password) {
      setError('Email and password are required')
      return
    }

    const {data} = await axios.post('http://localhost:9000/api/user/sign-in',{username,password}, {
      withCredentials:true
    })
    console.log(data)
    setSuccess(true)
    if(data.success){
       router.push("/")
    }


   
    } catch (error ) {
      //@ts-ignore
      if(error.response.data?.message ){
        //@ts-ignore
        setError(error.response.data?.message)
      }

      setError("Something went wrong")
    } finally {
  
      setUsername('')
      setPassword('')
    }
    
  }

  return (
    <div className='w-screen h-screen flex items-center bg-black '>

  
    <Card className="w-full max-w-md mx-auto bg-gray-900 border-gray-700 text-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
        <CardDescription className="text-gray-400">Welcome back! Please sign in to your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-200">Username</Label>
            <Input 
              id="username" 
              type="text" 
              placeholder="johh_doe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-800 text-white border-gray-700 rounded-[8px] focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-200">Password</Label>
            <Input 
              id="password" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-800 text-white border-gray-700 rounded-[8px] focus:border-blue-500"
            />
          </div>
          {error && (
            <Alert variant="destructive" className="bg-red-900 border-red-800 rounded-[8px]">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="bg-green-900 border-green-800 rounded-[8px]">
              <AlertDescription>Signed in successfully!</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full rounded-[8px] bg-blue-600 hover:bg-blue-700 text-white">
            Sign In
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <p className="text-sm text-gray-400">
          Don't have an account? <Link href="/sign-up" className="text-blue-400 hover:underline">Sign up</Link>
        </p>
      
      </CardFooter>
    </Card>
    </div>
  )
}