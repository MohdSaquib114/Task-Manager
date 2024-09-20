import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { format } from 'date-fns'

interface TaskProps {
  _id: string
  title: string
  description?: string
  status: string
  priority: string
  dueDate?: Date
  onDelete: (id: string) => void
}

export default function TaskCard({ _id, title, description, status, priority, dueDate, onDelete }: TaskProps) {
  const [showFullDescription, setShowFullDescription] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'To Do':
        return 'bg-yellow-700 text-yellow-200'
      case 'In Progress':
        return 'bg-blue-700 text-blue-200'
      case 'Completed':
        return 'bg-green-700 text-green-200'
      default:
        return 'bg-gray-700 text-gray-200'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low':
        return 'bg-green-800 text-green-200'
      case 'Medium':
        return 'bg-yellow-800 text-yellow-200'
      case 'High':
        return 'bg-red-800 text-red-200'
      default:
        return 'bg-gray-800 text-gray-200'
    }
  }

  const truncatedDescription = description && description.length > 20 
    ? `${description.slice(0, 20)}...` 
    : description

  return (
    <Card className="w-full max-w-md bg-gray-800 text-gray-100 border-gray-700">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{title}</span>
          <Badge className={getStatusColor(status)}>{status}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {description && (
          <div>
            <p className="text-sm text-gray-300">
              {showFullDescription ? description : truncatedDescription}
            </p>
            {description.length > 20 && (
              <Button
                variant="link"
                className="p-0 h-auto font-normal text-blue-400 hover:text-blue-300"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? (
                  <>
                    Show Less <ChevronUpIcon className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Show More <ChevronDownIcon className="ml-1 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Badge className={getPriorityColor(priority)}>{priority} Priority</Badge>
          {dueDate && (
            <div className="flex items-center text-sm text-gray-400">
              <CalendarIcon className="mr-1 h-4 w-4" />
              {format(new Date(dueDate), 'MMM d, yyyy')}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="destructive" 
          className="w-full bg-red-700 hover:bg-red-600 text-white"
          onClick={() => onDelete(_id)}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}