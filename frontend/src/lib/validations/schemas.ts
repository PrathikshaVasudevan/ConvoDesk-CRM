import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(8, 'Phone number must be at least 8 characters'),
  email: z.string().email('Please enter a valid email').optional().or(z.literal('')),
  status: z.enum(['New', 'Contacted', 'Qualified', 'Proposal', 'Negotiation', 'Won', 'Lost']),
  priority: z.enum(['High', 'Medium', 'Low']),
  tags: z.array(z.string()).optional(),
});

export const messageSchema = z.object({
  content: z.string().min(1, 'Message content cannot be empty'),
});

export const followupSchema = z.object({
  contactId: z.string().min(1, 'Contact selection is required'),
  task: z.string().min(3, 'Task description must be at least 3 characters'),
  dueDate: z.string().min(1, 'Due date is required'),
  priority: z.enum(['High', 'Medium', 'Low']),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type MessageInput = z.infer<typeof messageSchema>;
export type FollowUpInput = z.infer<typeof followupSchema>;
