import * as XLSX from 'xlsx';
import { format } from 'date-fns';
import { Task } from '@/firebase/api';

export const exportTasksToExcel = (tasks: Task[]) => {
  // Map tasks to a format suitable for Excel
  const excelData = tasks.map(task => ({
    'Task Name': task.title,
    'Assignees': task.assignees ? task.assignees.join(', ') : 'None',
    'Status': task.status,
    'Priority': task.priority,
    'Due Date': task.dueDate,
    'Created At': task.createdAt ? format(task.createdAt.toDate(), 'yyyy-MM-dd HH:mm:ss') : 'N/A'
  }));

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(excelData);
  
  // Create workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Tasks");

  // Define column widths
  const wscols = [
    { wch: 30 }, // Task Name
    { wch: 20 }, // Assignee
    { wch: 15 }, // Status
    { wch: 15 }, // Priority
    { wch: 15 }, // Due Date
    { wch: 20 }, // Created At
  ];
  worksheet['!cols'] = wscols;

  // Generate filename with timestamp
  const fileName = `BOC_Tasks_${format(new Date(), 'yyyyMMdd_HHmm')}.xlsx`;

  // Write file
  XLSX.writeFile(workbook, fileName);
};
