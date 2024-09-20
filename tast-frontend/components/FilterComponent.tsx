import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface FilterComponentProps {
  onFilterChange: (type: 'status' | 'priority', value: string) => void
}

export function FilterComponent({ onFilterChange }: FilterComponentProps) {
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="status-filter" className="text-gray-300">Filter by Status</Label>
        <Select onValueChange={(value) => onFilterChange('status', value)}>
          <SelectTrigger id="status-filter" className="bg-gray-700 text-gray-100 border-gray-600">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 text-gray-100 border-gray-600">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="To Do">To Do</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col space-y-1.5">
        <Label htmlFor="priority-filter" className="text-gray-300">Filter by Priority</Label>
        <Select onValueChange={(value) => onFilterChange('priority', value)}>
          <SelectTrigger id="priority-filter" className="bg-gray-700 text-gray-100 border-gray-600">
            <SelectValue placeholder="Select Priority" />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 text-gray-100 border-gray-600">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}