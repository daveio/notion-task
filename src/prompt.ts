import { format } from 'date-fns';
import chalk from 'chalk';

export async function promptForTaskDetails() {
  const { prompt } = await import('enquirer');
  
  const responses = await prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Task title:',
      validate: (value: string) => value.trim() ? true : 'Title is required'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Description (optional):'
    },
    {
      type: 'confirm',
      name: 'hasDueDate',
      message: 'Set a due date?',
      initial: false
    },
    {
      type: 'input',
      name: 'dueDate',
      message: 'Due date (YYYY-MM-DD):',
      initial: format(new Date(), 'yyyy-MM-dd'),
      skip: ({ hasDueDate }: any) => !hasDueDate,
      validate: (value: string) => {
        const date = new Date(value);
        return !isNaN(date.getTime()) ? true : 'Please enter a valid date in YYYY-MM-DD format';
      }
    },
    {
      type: 'select',
      name: 'priority',
      message: 'Priority:',
      choices: ['Low', 'Medium', 'High'],
      initial: 1
    },
    {
      type: 'select',
      name: 'status',
      message: 'Status:',
      choices: ['Not Started', 'In Progress', 'Completed'],
      initial: 0
    }
  ]);
  
  const { title, description, hasDueDate, dueDate, priority, status } = responses as any;
  
  return {
    title,
    description,
    dueDate: hasDueDate ? new Date(dueDate) : null,
    priority,
    status
  };
}
