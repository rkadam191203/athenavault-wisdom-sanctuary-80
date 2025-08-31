import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export function SearchBar({ 
  placeholder = "Search for books, authors, wisdom...", 
  value, 
  onChange,
  className 
}: SearchBarProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="pl-12 pr-4 py-3 bg-card border-border focus:border-primary/50 focus:ring-primary/20 text-base placeholder:text-muted-foreground/70 rounded-xl shadow-sm"
      />
    </div>
  )
}