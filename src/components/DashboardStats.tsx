import { BookOpen, Target, Clock, Star } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  subtitle?: string
}

function StatCard({ title, value, icon, subtitle }: StatCardProps) {
  return (
    <div className="gradient-card rounded-xl p-6 border border-border/50">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-card-foreground mt-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        <div className="p-2 bg-primary/10 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  )
}

interface DashboardStatsProps {
  totalBooks: number
  booksRead: number
  currentlyReading: number
  favoriteBooks: number
}

export function DashboardStats({ 
  totalBooks, 
  booksRead, 
  currentlyReading, 
  favoriteBooks 
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Books"
        value={totalBooks}
        icon={<BookOpen className="w-5 h-5 text-primary" />}
        subtitle="In your library"
      />
      
      <StatCard
        title="Books Read"
        value={booksRead}
        icon={<Target className="w-5 h-5 text-success" />}
        subtitle="Completed"
      />
      
      <StatCard
        title="Currently Reading"
        value={currentlyReading}
        icon={<Clock className="w-5 h-5 text-wisdom-gold" />}
        subtitle="In progress"
      />
      
      <StatCard
        title="Favorites"
        value={favoriteBooks}
        icon={<Star className="w-5 h-5 text-primary" />}
        subtitle="Starred books"
      />
    </div>
  )
}