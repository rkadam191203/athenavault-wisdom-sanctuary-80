import { Star, BookOpen, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface BookCardProps {
  id: string
  title: string
  author: string
  cover: string
  progress?: number
  isFavorite?: boolean
  genre?: string
  lastRead?: string
  onClick?: () => void
}

export function BookCard({ 
  title, 
  author, 
  cover, 
  progress = 0, 
  isFavorite = false, 
  genre,
  lastRead,
  onClick 
}: BookCardProps) {
  return (
    <div 
      className="group cursor-pointer book-card-hover gradient-card rounded-2xl p-6 border border-border/50 bg-card hover:shadow-2xl transition-all duration-300"
      onClick={onClick}
    >
      <div className="relative mb-6">
        <img 
          src={cover} 
          alt={`${title} cover`}
          className="w-full aspect-[3/4] object-cover rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Progress overlay */}
        {progress > 0 && (
          <div className="absolute bottom-2 left-2 right-2">
            <div className="bg-background/90 backdrop-blur-sm rounded-full px-2 py-1">
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-muted rounded-full h-1">
                  <div 
                    className="bg-primary h-1 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{progress}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Favorite star */}
        {isFavorite && (
          <div className="absolute top-2 right-2">
            <Star className="w-4 h-4 fill-wisdom-gold text-wisdom-gold" />
          </div>
        )}
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-lg text-card-foreground line-clamp-2 group-hover:text-primary transition-colors leading-tight">
          {title}
        </h3>
        
        <p className="text-muted-foreground">
          {author}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {genre && (
              <Badge variant="secondary" className="text-xs">
                {genre}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <BookOpen className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {lastRead && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>Last read {lastRead}</span>
          </div>
        )}
      </div>
    </div>
  )
}