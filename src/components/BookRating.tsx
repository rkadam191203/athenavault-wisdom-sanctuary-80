import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface BookRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  interactive?: boolean
  onRatingChange?: (rating: number) => void
  className?: string
}

export function BookRating({ 
  rating, 
  maxRating = 5, 
  size = "md", 
  interactive = false,
  onRatingChange,
  className 
}: BookRatingProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  }
  
  const handleStarClick = (starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating)
    }
  }
  
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxRating }, (_, index) => {
        const starRating = index + 1
        const isFilled = starRating <= rating
        const isHalfFilled = starRating - 0.5 === rating
        
        return (
          <button
            key={index}
            onClick={() => handleStarClick(starRating)}
            disabled={!interactive}
            className={cn(
              "transition-all duration-200",
              interactive && "hover:scale-110 cursor-pointer",
              !interactive && "cursor-default"
            )}
          >
            <Star 
              className={cn(
                sizeClasses[size],
                isFilled || isHalfFilled
                  ? "fill-wisdom-gold text-wisdom-gold" 
                  : "text-muted-foreground hover:text-wisdom-gold"
              )}
            />
          </button>
        )
      })}
      <span className="ml-2 text-sm text-muted-foreground">
        {rating.toFixed(1)}
      </span>
    </div>
  )
}