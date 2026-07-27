'use client';

import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  flag?: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: boolean;
}

export function Select({
  options,
  value,
  onValueChange,
  placeholder = 'Select option...',
  className,
  error = false,
}: SelectProps) {
  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'flex h-11 items-center justify-between gap-2 rounded-xl border border-border bg-background px-3 py-2 text-xs font-mono font-medium text-foreground transition-all focus:outline-hidden hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer shadow-xs',
          error && 'border-red-500 shadow-sm shadow-red-500/20 ring-1 ring-red-500/50',
          className
        )}
      >
        <span className="flex items-center gap-1.5 truncate">
          {selectedOption?.flag && <span>{selectedOption.flag}</span>}
          <span>{selectedOption?.label || placeholder}</span>
        </span>
        <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={6}
        className="w-48 max-h-60 overflow-y-auto rounded-xl p-1 shadow-lg border-border bg-popover text-popover-foreground z-50"
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onValueChange(option.value)}
            className={cn(
              'flex items-center justify-between cursor-pointer rounded-lg px-2.5 py-2 text-xs font-medium transition-colors',
              value === option.value
                ? 'bg-zinc-100 dark:bg-zinc-800 text-foreground font-semibold'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <div className="flex items-center gap-2">
              {option.flag && <span className="text-sm">{option.flag}</span>}
              <span>{option.label}</span>
            </div>
            {value === option.value && <Check className="size-3 text-foreground" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
