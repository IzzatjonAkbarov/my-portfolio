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
          'flex h-11 items-center justify-between gap-2 border border-input bg-transparent px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-muted cursor-pointer figures',
          error && 'border-destructive',
          className
        )}
      >
        <span className="flex items-center gap-1.5 truncate">
          {selectedOption?.flag && <span>{selectedOption.flag}</span>}
          <span>{selectedOption?.label || placeholder}</span>
        </span>
        <ChevronDown className="size-4 shrink-0 text-ink-soft" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={6}
        className="w-44 max-h-60 overflow-y-auto rounded-none border border-ink/30 bg-paper-raised p-1 text-ink shadow-[0_12px_30px_-14px_rgb(0_0_0/0.45)] z-50"
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onValueChange(option.value)}
            className={cn(
              'flex items-center justify-between cursor-pointer rounded-none px-2.5 py-2.5 text-sm font-medium transition-colors',
              value === option.value
                ? 'bg-muted text-ink font-semibold'
                : 'text-ink-soft hover:text-ink'
            )}
          >
            <div className="flex items-center gap-2">
              {option.flag && <span className="text-sm">{option.flag}</span>}
              <span>{option.label}</span>
            </div>
            {value === option.value && <Check className="size-3.5 text-trail" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
