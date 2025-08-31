import { Book, Clock, Target, Flame } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReadingProgressProps {
  currentBook?: {
    title: string
    author: string
    progress: number
    pagesRead: number
    totalPages: number
    timeToday: number
  }
  dailyGoal: number
  streak: number
  className?: string
}

export function ReadingProgress({ 
  currentBook,
  dailyGoal = 30,
  streak = 7,
  className 
}: ReadingProgressProps) {
  const progressPercentage = currentBook ? (currentBook.timeToday / dailyGoal) * 100 : 0
  
  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground">Today's Progress</h3>
        <div className="flex items-center gap-2 text-primary">
          <Flame className="w-5 h-5" />
          <span className="font-semibold">{streak} day streak</span>
        </div>
      </div>

      {/* Daily Reading Goal */}
      <div className="gradient-card rounded-xl p-6 border border-border/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-card-foreground">Daily Goal</p>
              <p className="text-sm text-muted-foreground">{dailyGoal} minutes</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">
              {currentBook?.timeToday || 0}
            </p>
            <p className="text-xs text-muted-foreground">minutes</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-card-foreground">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-primary-glow h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Current Book Progress */}
      {currentBook && (
        <div className="gradient-card rounded-xl p-6 border border-border/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-wisdom-gold/10 rounded-lg">
              <Book className="w-5 h-5 text-wisdom-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-card-foreground truncate">
                {currentBook.title}
              </p>
              <p className="text-sm text-muted-foreground">
                by {currentBook.author}
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Page {currentBook.pagesRead} of {currentBook.totalPages}
              </span>
              <span className="text-card-foreground font-medium">
                {currentBook.progress}%
              </span>
            </div>
            
            <div className="bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-wisdom-gold to-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${currentBook.progress}%` }}
              />
            </div>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>
                {Math.round((currentBook.totalPages - currentBook.pagesRead) / 10)} pages left
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}