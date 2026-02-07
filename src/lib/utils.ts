import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ROLES = {
  SUPER_ADMIN: '超级管理员',
  MODULE_ADMIN: '模块管理员',
  MEMBER: '普通队员',
  TEACHER: '指导老师',
  GUEST: '游客',
} as const;

export const MEMBER_STATUS = {
  ACTIVE: '在队',
  RETIRED: '退役',
  LEAVE: '请假',
} as const;
