import { EnhancedBookCard } from "@/components/EnhancedBookCard"
import { DashboardStats } from "@/components/DashboardStats"
import { WisdomQuote } from "@/components/WisdomQuote"
import { ReadingProgress } from "@/components/ReadingProgress"
import { AdvancedSearch } from "@/components/AdvancedSearch"
import { CategoryFilter } from "@/components/CategoryFilter"
import { Button } from "@/components/ui/button"
import { ArrowRight, Plus, TrendingUp, Award, Target } from "lucide-react"

// Sample data
import sampleBook1 from "@/assets/sample-book-1.jpg"
import sampleBook2 from "@/assets/sample-book-2.jpg"
import sampleBook3 from "@/assets/sample-book-3.jpg"

const recentBooks = [
  {
    id: "1",
    title: "The Art of Wisdom",
    author: "Marcus Chen",
    cover: sampleBook1,
    rating: 4.5,
    genre: "Philosophy",
    readingTime: "8h 30m",
    progress: 75,
    status: "reading" as const,
    lastRead: "2 hours ago",
    pagesRead: 245,
    totalPages: 320,
    isFavorite: true
  },
  {
    id: "2", 
    title: "Classical Foundations",
    author: "Elena Rodriguez",
    cover: sampleBook2,
    rating: 4.2,
    genre: "Literature", 
    readingTime: "12h 15m",
    progress: 45,
    status: "reading" as const,
    lastRead: "Yesterday",
    pagesRead: 180,
    totalPages: 400
  },
  {
    id: "3",
    title: "Modern Mindfulness",
    author: "David Kim",
    cover: sampleBook3,
    rating: 4.8,
    genre: "Psychology",
    readingTime: "6h 45m",
    progress: 20,
    status: "paused" as const,
    lastRead: "3 days ago",
    pagesRead: 64,
    totalPages: 280,
    isFavorite: true
  },
  {
    id: "4",
    title: "Digital Ethics",
    author: "Sarah Johnson",
    cover: sampleBook1,
    rating: 4.1,
    genre: "Technology",
    readingTime: "9h 20m",
    progress: 0,
    status: "want-to-read" as const
  }
]

const currentBook = {
  title: "The Art of Wisdom",
  author: "Marcus Chen",
  progress: 75,
  pagesRead: 245,
  totalPages: 320,
  timeToday: 45
}

const wisdomQuote = {
  quote: "The only true wisdom is in knowing you know nothing.",
  author: "Socrates",
  book: "Apology"
}

export default function Dashboard() {
  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* Hero Section with Advanced Search */}
      <div className="text-center space-y-8 py-16 gradient-hero rounded-3xl border border-border/50">
        <div className="space-y-6">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Award className="w-4 h-4" />
              7-day reading streak!
            </div>
          </div>
          <h1 className="text-6xl font-bold text-foreground tracking-tight leading-tight">
            Discover Your Next
            <span className="block bg-gradient-to-r from-primary to-wisdom-gold bg-clip-text text-transparent">
              Great Adventure
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Explore thousands of books, track your reading journey, and unlock achievements as you discover wisdom from the world's greatest minds.
          </p>
        </div>
        
        {/* Advanced Search */}
        <div className="max-w-3xl mx-auto">
          <AdvancedSearch />
        </div>
        
        {/* Quick Categories */}
        <CategoryFilter className="justify-center flex-wrap max-w-4xl mx-auto" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Reading Progress Sidebar */}
        <div className="lg:col-span-1">
          <ReadingProgress 
            currentBook={currentBook}
            dailyGoal={60}
            streak={7}
          />
        </div>

        {/* Featured Books */}
        <div className="lg:col-span-3 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-3xl font-bold text-foreground">Continue Reading</h2>
                <p className="text-muted-foreground mt-1">Pick up where you left off</p>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-success/10 text-success px-3 py-1 rounded-full text-sm">
                <TrendingUp className="w-4 h-4" />
                +3 books this month
              </div>
            </div>
            <Button variant="ghost" className="gap-2 text-primary text-lg">
              View all <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {recentBooks.map((book) => (
              <EnhancedBookCard key={book.id} {...book} />
            ))}
          </div>
        </div>
      </div>

      {/* Stats & Wisdom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-foreground mb-2">Reading Analytics</h3>
            <p className="text-muted-foreground">Track your progress and achievements</p>
          </div>
          <DashboardStats 
            totalBooks={127}
            booksRead={43}
            currentlyReading={8}
            favoriteBooks={15}
          />
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-4">Daily Wisdom</h3>
            <WisdomQuote {...wisdomQuote} />
          </div>
          
          {/* Reading Goals */}
          <div className="gradient-card rounded-xl p-6 border border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-card-foreground">Monthly Goal</h4>
                <p className="text-sm text-muted-foreground">8 of 12 books</p>
              </div>
            </div>
            <div className="bg-muted rounded-full h-2">
              <div className="bg-gradient-to-r from-primary to-primary-glow h-2 rounded-full w-2/3" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              4 books to go - you're doing great!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}