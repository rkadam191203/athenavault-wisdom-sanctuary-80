import { Book, Bookmark, Headphones, Sparkles, Heart, Sword, Wand2, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CategoryFilterProps {
  selectedCategory?: string
  onCategoryChange?: (category: string) => void
  className?: string
}

const categories = [
  { id: "all", label: "All", icon: Book, color: "bg-primary/10 text-primary" },
  { id: "Philosophy", label: "Philosophy", icon: Sparkles, color: "bg-wisdom-gold/10 text-wisdom-gold" },
  { id: "Literature", label: "Literature", icon: Bookmark, color: "bg-accent/10 text-accent" },
  { id: "Technology", label: "Technology", icon: Globe, color: "bg-success/10 text-success" },
  { id: "Writing", label: "Writing", icon: Wand2, color: "bg-purple-500/10 text-purple-600" },
  { id: "Fiction", label: "Fiction", icon: Sword, color: "bg-blue-500/10 text-blue-600" },
  { id: "Romance", label: "Romance", icon: Heart, color: "bg-pink-500/10 text-pink-600" },
  { id: "Audiobooks", label: "Audio", icon: Headphones, color: "bg-green-500/10 text-green-600" },
]

export function CategoryFilter({ 
  selectedCategory = "all", 
  onCategoryChange,
  className 
}: CategoryFilterProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {categories.map((category) => {
        const IconComponent = category.icon
        const isSelected = selectedCategory === category.id
        
        return (
          <Button
            key={category.id}
            variant={isSelected ? "default" : "ghost"}
            size="sm"
            onClick={() => onCategoryChange?.(category.id)}
            className={cn(
              "gap-2 transition-all duration-200",
              isSelected 
                ? "bg-primary text-primary-foreground shadow-md" 
                : `${category.color} hover:scale-105`
            )}
          >
            <IconComponent className="w-4 h-4" />
            {category.label}
          </Button>
        )
      })}
    </div>
  )
}