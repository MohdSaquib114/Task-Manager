"use client"

import React from 'react'
import { useTaskContext } from './TaskProvider'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HomeIcon } from 'lucide-react'
import Link from 'next/link'

interface Task {
    _id: string
    title: string
    description?: string
    status: string
    priority: string
    dueDate?: Date
}

export default function KanbanDashboard() {
  const { tasks, updateTask } = useTaskContext();
console.log(tasks)
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const taskToUpdate = tasks.find(task=>task._id === draggableId)
     //@ts-expect-error
     taskToUpdate.status =  destination.droppableId as Task['status'] 

    // const updatedTasks = tasks.filter(task => 
    //     {
    //   if (task._id == draggableId) {
    //     return { ...task, status: destination.droppableId as Task['status'] }
    //   
    //   return task
    // })
    //@ts-expect-error
    updateTask(taskToUpdate)
  }

  const getTasksByStatus = (status: Task['status']) => {
    return tasks.filter(task => task.status === status)
  }

  const getStatusColor = (status: Task['status']) => {
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

  const getPriorityColor = (priority: Task['priority']) => {
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

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4">
    <Link href={"/"} className="flex gap-1 hover:text-blue-400">
      <HomeIcon />
      <p className="cursor-pointer">Go to Home</p>
    </Link>
    <h1 className="text-3xl font-bold mb-6 text-center">Kanban Dashboard</h1>
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["To Do", "In Progress", "Completed"].map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="bg-gray-800 rounded-lg p-4 space-y-2 min-h-[200px]"
              >
                <h2 className="text-xl font-semibold mb-4">{status}</h2>
                {getTasksByStatus(status).map((task, index) => (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Card className="bg-gray-700 border-gray-600 hover:bg-gray-600">
                          <CardHeader className="p-3">
                            <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="p-3 pt-0">
                            <div className="flex justify-between items-center">
                              <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                              <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  </div>
);
}