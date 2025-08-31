import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Play, Calendar, Users, ChevronLeft, ChevronRight } from "lucide-react"
import { BookCard } from "@/components/BookCard"

// Sample data
import sampleBook1 from "@/assets/sample-book-1.jpg"
import sampleBook2 from "@/assets/sample-book-2.jpg"
import sampleBook3 from "@/assets/sample-book-3.jpg"

const bookData = {
  "1": {
    title: "The Art of Wisdom",
    author: "Marcus Chen",
    cover: sampleBook1,
    description: "Wow! you've delved deep into the wizarding world's secrets. Have Harry's parents died yet? Oops, looks like you're not there yet. Get reading now!",
    pages: [
      {
        content: `The ancient art of wisdom has been passed down through generations of scholars and philosophers. In this comprehensive exploration, we delve into the fundamental principles that have guided human understanding for millennia.

        The journey begins with understanding the nature of knowledge itself. What does it mean to truly know something? How do we distinguish between mere information and genuine wisdom? These questions have puzzled thinkers from Socrates to modern day philosophers.

        As we embark on this intellectual adventure, we must first acknowledge that wisdom is not simply the accumulation of facts, but rather the ability to apply knowledge with sound judgment and deep understanding.`,
        illustration: "/lovable-uploads/ea819b08-6546-484a-a038-25dd5ec1cb4d.png"
      }
    ],
    currentPage: 154,
    totalPages: 300,
    readingProgress: 75
  }
}

const popularBooks = [
  { id: "2", title: "The World of Ice and Fire", author: "George R.R. Martin", cover: sampleBook1 },
  { id: "3", title: "Fantastic Beasts Volume II", author: "J.K. Rowling", cover: sampleBook2 },
  { id: "4", title: "Game of Thrones Volume III", author: "George R.R. Martin", cover: sampleBook3 },
  { id: "5", title: "The Wise Man's Fear", author: "Patrick Rothfuss", cover: sampleBook1 }
]

const readerFriends = [
  {
    name: "Roberto Jordan",
    avatar: "",
    activity: "What a delightful and magical chapter it is! It indeed transports readers to the wizarding world..",
    chapter: "Chapter Five: Diagon Alley",
    time: "2 min ago"
  },
  {
    name: "Anna Henry", 
    avatar: "",
    activity: "I finished reading the chapter last night and",
    time: "5 min ago"
  }
]

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const calendarDates = [11, 12, 13, 14, 15, 16, 17]

export default function BookDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(0)
  
  const book = bookData[id as keyof typeof bookData]
  
  if (!book) {
    return <div>Book not found</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="space-y-6">
            {/* Welcome Message */}
            <Card className="gradient-card border-border/50">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-card-foreground mb-4">
                  Happy reading, Harvey
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {book.description}
                </p>
                <Button size="sm" className="gap-2">
                  <Play className="w-4 h-4" />
                  Start reading
                </Button>
              </CardContent>
            </Card>

            {/* Popular Now */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Popular Now</h3>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="w-2 h-2 bg-muted rounded-full"></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {popularBooks.slice(0, 4).map((book) => (
                  <div key={book.id} className="cursor-pointer group">
                    <img 
                      src={book.cover} 
                      alt={book.title}
                      className="w-full aspect-[3/4] object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="mt-2 space-y-1">
                      <p className="text-sm font-medium text-card-foreground line-clamp-1">{book.title}</p>
                      <p className="text-xs text-muted-foreground">{book.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* New Series Collection */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">New Series Collection</h3>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="w-2 h-2 bg-muted rounded-full"></div>
                </div>
              </div>
              
              <Card className="gradient-card border-border/50">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="flex">
                      <img src={sampleBook1} alt="Series" className="w-12 h-16 object-cover rounded" />
                      <img src={sampleBook2} alt="Series" className="w-12 h-16 object-cover rounded -ml-2" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-card-foreground">A Legend of Ice and Fire: The Ice Horse</h4>
                      <p className="text-xs text-muted-foreground mt-1">8 chapters each vol</p>
                      <Badge variant="outline" className="text-xs mt-2">2 vol</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content - Book Pages */}
          <div className="lg:col-span-2">
            <Card className="gradient-card border-border/50 min-h-[600px]">
              <CardContent className="p-8">
                <div className="relative">
                  {/* Book spine shadow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-lg transform -rotate-1"></div>
                  
                  {/* Open book layout */}
                  <div className="relative bg-background rounded-lg shadow-2xl p-8 grid grid-cols-2 gap-8 min-h-[500px]">
                    {/* Left Page */}
                    <div className="space-y-4">
                      <div className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                        {book.pages[0]?.content}
                      </div>
                    </div>
                    
                    {/* Right Page */}
                    <div className="space-y-4">
                      <div className="relative">
                        <img 
                          src={book.pages[0]?.illustration} 
                          alt="Book illustration"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                      </div>
                      <p className="text-xs text-muted-foreground italic">
                        The mystical forest where ancient wisdom dwells
                      </p>
                    </div>
                    
                    {/* Page navigation */}
                    <div className="col-span-2 flex justify-between items-center pt-4 border-t border-border">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        {book.currentPage} / {book.totalPages} pages
                      </span>
                      <Button variant="ghost" size="sm" className="gap-2">
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Reading Progress */}
            <Card className="gradient-card border-border/50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-card-foreground mb-4">{book.title}</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">{book.currentPage} / {book.totalPages} pages</span>
                    </div>
                    <div className="bg-muted rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-primary-glow h-2 rounded-full transition-all duration-500"
                        style={{ width: `${book.readingProgress}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Harry as he returns to Hogwarts school of witchcraft and wizardry for his 2nd year, only to discover that..
                  </p>
                  <p className="text-xs text-muted-foreground">~ J.K Rowlings</p>
                </div>
              </CardContent>
            </Card>

            {/* Schedule Reading */}
            <Card className="gradient-card border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-card-foreground">Schedule Reading</h3>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-7 gap-1 text-center">
                  {weekDays.map((day) => (
                    <div key={day} className="text-xs text-muted-foreground p-1">
                      {day}
                    </div>
                  ))}
                  {calendarDates.map((date, index) => (
                    <div 
                      key={date} 
                      className={`text-sm p-2 rounded cursor-pointer transition-colors ${
                        index === 3 
                          ? "bg-primary text-primary-foreground" 
                          : "text-card-foreground hover:bg-accent"
                      }`}
                    >
                      {date}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reader Friends */}
            <Card className="gradient-card border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-card-foreground">Reader Friends</h3>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="w-2 h-2 bg-muted rounded-full"></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {readerFriends.map((friend, index) => (
                    <div key={index} className="flex gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {friend.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-card-foreground text-sm">{friend.name}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                          {friend.activity}
                        </p>
                        {friend.chapter && (
                          <p className="text-xs text-primary mt-1">✓ {friend.chapter}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">{friend.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}