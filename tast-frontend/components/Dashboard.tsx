'use client'
import { useState } from 'react'
import TaskCard  from './TaskCard'
import { FilterComponent } from './FilterComponent'

import { useTaskContext } from './TaskProvider'
import Link from 'next/link'
import Navbar from './Navbar'
import useRedirect from '@/app/hooks/useRedirect'

  
export interface Task {
  _id: string
  title: string
  description?: string
  status: string
  priority: string
  dueDate?: Date
}



export default function Dashboard() {
  useRedirect()
  const [filters, setFilters] = useState({ status: 'all', priority: 'all' })
  const { tasks,   deleteTask,  } = useTaskContext();



  const handleFilterChange = (type: 'status' | 'priority', value: string) => {
    setFilters(prev => ({ ...prev, [type]: value }))
  }

  const filteredTasks = tasks.filter(task => 
    (filters.status === 'all' || task.status === filters.status) &&
    (filters.priority === 'all' || task.priority === filters.priority)
  )



  return (
    <div>
    <Navbar />
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4  ">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold mb-6">Task Dashboard</h1>
        <div className='flex flex-col sm:flex-row gap-5'>
        <FilterComponent onFilterChange={handleFilterChange} />
        <div className='flex flex-row justify-between gap-3'>

         <Link href={'/create'} className="bg-blue-600 hover:bg-blue-700 rounded-[.5rem] text-white px-5 py-4" >Add Task</Link>
         <Link href={'/kanban-dashboard'} className="bg-blue-600 hover:bg-blue-700 rounded-[.5rem] text-white px-5 py-4" >Kanban Dashboard</Link>
        
        </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map(task => (
            <TaskCard
            key={task._id}
              {...task}
              onDelete={deleteTask}
              />
          ))}
        </div>
        {filteredTasks.length === 0 && (
          <p className="text-center text-gray-400">No tasks found matching the current filters.</p>
        )}
      </div>
    </div>
        </div>
  )
}