import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Star, BookOpen, Clock, Heart, Plus, Play, Pause, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookRating } from "@/components/BookRating"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface EnhancedBookCardProps {
  id: string
  title: string
  author: string
  cover: string
  rating: number
  genre: string
  readingTime: string
  progress?: number
  isFavorite?: boolean
  isReading?: boolean
  status: "want-to-read" | "reading" | "completed" | "paused"
  lastRead?: string
  pagesRead?: number
  totalPages?: number
  onClick?: () => void
  onStatusChange?: (status: string) => void
  onFavoriteToggle?: () => void
}

export function EnhancedBookCard({ 
  id,
  title, 
  author, 
  cover, 
  rating,
  genre,
  readingTime,
  progress = 0, 
  isFavorite = false,
  isReading = false,
  status,
  lastRead,
  pagesRead,
  totalPages,
  onClick,
  onStatusChange,
  onFavoriteToggle
}: EnhancedBookCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()

  const handleCardClick = () => {
    if (onClick) {
      onClick()
    } else {
      navigate(`/book/${id}`)
    }
  }
  
  const statusColors = {
    "want-to-read": "bg-blue-500/10 text-blue-600 border-blue-500/20",
    "reading": "bg-green-500/10 text-green-600 border-green-500/20",
    "completed": "bg-purple-500/10 text-purple-600 border-purple-500/20",
    "paused": "bg-orange-500/10 text-orange-600 border-orange-500/20"
  }

  const statusLabels = {
    "want-to-read": "Want to Read",
    "reading": "Reading",
    "completed": "Completed",
    "paused": "Paused"
  }

  return (
    <div 
      className="group cursor-pointer book-card-hover gradient-card rounded-2xl p-6 border border-border/50 bg-card hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-wisdom-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        {/* Book Cover & Status */}
        <div className="relative mb-6">
          <div className="relative">
            <img 
              src={cover} 
              alt={`${title} cover`}
              className="w-full aspect-[3/4] object-cover rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Reading Progress Overlay */}
            {progress > 0 && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl">
                <div className="p-3">
                  <div className="bg-background/90 backdrop-blur-sm rounded-full px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-1.5">
                        <div 
                          className="bg-gradient-to-r from-primary to-primary-glow h-1.5 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-foreground font-medium">{progress}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Favorite & Menu Buttons */}
          <div className="absolute top-3 left-3 right-3 flex justify-between">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 bg-background/80 backdrop-blur-sm transition-all duration-200",
                isFavorite ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-red-500"
              )}
              onClick={(e) => {
                e.stopPropagation()
                onFavoriteToggle?.()
              }}
            >
              <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onStatusChange?.("want-to-read")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Want to Read
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatusChange?.("reading")}>
                  <Play className="w-4 h-4 mr-2" />
                  Start Reading
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatusChange?.("paused")}>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatusChange?.("completed")}>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Mark as Read
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Status Badge */}
          <div className="absolute bottom-3 right-3">
            <Badge 
              className={cn(
                "text-xs font-medium border",
                statusColors[status]
              )}
            >
              {statusLabels[status]}
            </Badge>
          </div>
        </div>

        {/* Book Information */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-card-foreground line-clamp-2 group-hover:text-primary transition-colors leading-tight">
              {title}
            </h3>
            
            <p className="text-muted-foreground font-medium">
              {author}
            </p>
          </div>

          {/* Rating & Genre */}
          <div className="flex items-center justify-between">
            <BookRating rating={rating} size="sm" />
            <Badge variant="outline" className="text-xs">
              {genre}
            </Badge>
          </div>

          {/* Reading Stats */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{readingTime}</span>
            </div>
            {pagesRead && totalPages && (
              <span>{pagesRead}/{totalPages} pages</span>
            )}
          </div>

          {/* Last Read */}
          {lastRead && (
            <div className="text-xs text-muted-foreground">
              Last read {lastRead}
            </div>
          )}

          {/* Action Buttons */}
          <div className={cn(
            "flex gap-2 transition-all duration-200",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          )}>
            {status === "reading" ? (
              <Button size="sm" className="flex-1 gap-2">
                <BookOpen className="w-4 h-4" />
                Continue
              </Button>
            ) : (
              <Button size="sm" variant="outline" className="flex-1 gap-2">
                <Play className="w-4 h-4" />
                Start Reading
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}