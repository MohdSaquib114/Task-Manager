'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CalendarIcon, HomeIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useTaskContext } from "./TaskProvider"
import { Task } from "./Dashboard"



export default function TaskForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("To Do")
  const [priority, setPriority] = useState("Medium")
  const [dueDate, setDueDate] = useState<Date | undefined>()
  const [loading,setLoading] = useState(false)
  const router = useRouter()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const {  addTask  } = useTaskContext();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
        e.preventDefault()
        setLoading(true)
        const newTask  = {title, description, status, priority, dueDate}
        //@ts-ignore
        await addTask(newTask)
        setSuccess(true)
        
        router.push("/")
    } catch (error) {
      //@ts-ignore
      if(error.response.data?.message ){
        //@ts-ignore
        setError(error.response.data?.message)
      }

      setError("Something went wrong")
        
    }finally{
        setLoading(false)
        setTitle("")
        setDescription("")
        setStatus('To Do')
        setPriority("Medium")
    }

  }

  return (
    <div className="min-h-screen w-full bg-gray-900 flex flex-col items-center justify-center p-4">
       <Link href={'/'} className='flex self-start gap-1 text-white hover:text-blue-400'>
            <HomeIcon /> 
            <p className='cursor-pointer'>Go to Home</p>
        </Link>
      <Card className="w-full max-w-lg bg-gray-800 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create New Task</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-300">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-300">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status" className="text-gray-300">Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600 text-white">
                  <SelectItem value="To Do">To Do</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">Priority</Label>
              <RadioGroup value={priority} onValueChange={setPriority} className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Low" id="low" className="border-gray-600 text-blue-500" />
                  <Label htmlFor="low" className="text-gray-300">Low</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Medium" id="medium" className="border-gray-600 text-blue-500" />
                  <Label htmlFor="medium" className="text-gray-300">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="High" id="high" className="border-gray-600 text-blue-500" />
                  <Label htmlFor="high" className="text-gray-300">High</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dueDate && "text-gray-400",
                      "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-gray-700 border-gray-600">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                    className="bg-gray-700 text-white"
                  />
                </PopoverContent>
              </Popover>
              {error && (
            <Alert variant="destructive" className="bg-red-900 border-red-80 rounded-[8px]">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="bg-green-900 border-green-800 rounded-[8px]">
              <AlertDescription>Task created successfully!</AlertDescription>
            </Alert>
          )}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
             {loading?"Creating Task...": "Create Task"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}