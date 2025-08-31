import { useState } from "react"
import { Search, Filter, X, Calendar, Star, BookOpen, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface AdvancedSearchProps {
  onSearch?: (filters: SearchFilters) => void
  className?: string
}

interface SearchFilters {
  query: string
  genre: string
  author: string
  rating: number[]
  readingTime: number[]
  year: string
  status: string
}

const genres = [
  "All Genres", "Philosophy", "Literature", "Science Fiction", "Fantasy", 
  "Biography", "History", "Psychology", "Business", "Self-Help"
]

const years = [
  "Any Year", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "Earlier"
]

const statuses = [
  "All", "Want to Read", "Currently Reading", "Completed", "Paused"
]

export function AdvancedSearch({ onSearch, className }: AdvancedSearchProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    genre: "All Genres",
    author: "",
    rating: [0],
    readingTime: [0],
    year: "Any Year",
    status: "All"
  })

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === "query") return value.length > 0
    if (key === "rating") return value[0] > 0
    if (key === "readingTime") return value[0] > 0
    if (key === "author") return value.length > 0
    return value !== "All Genres" && value !== "Any Year" && value !== "All"
  }).length

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onSearch?.(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters = {
      query: "",
      genre: "All Genres",
      author: "",
      rating: [0],
      readingTime: [0],
      year: "Any Year",
      status: "All"
    }
    setFilters(clearedFilters)
    onSearch?.(clearedFilters)
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder="Search for books, authors, or topics..."
          value={filters.query}
          onChange={(e) => handleFilterChange("query", e.target.value)}
          className="pl-12 pr-16 py-4 bg-card border-border focus:border-primary/50 focus:ring-primary/20 text-lg placeholder:text-muted-foreground/70 rounded-xl shadow-sm"
        />
        <Popover open={isExpanded} onOpenChange={setIsExpanded}>
          <PopoverTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 gap-2"
            >
              <Filter className="w-4 h-4" />
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="px-1 py-0 text-xs">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-6" align="end">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Advanced Filters</h3>
                {activeFiltersCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearFilters}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>

              {/* Genre Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Genre</label>
                <Select value={filters.genre} onValueChange={(value) => handleFilterChange("genre", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Author Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Author</label>
                <Input
                  placeholder="Enter author name..."
                  value={filters.author}
                  onChange={(e) => handleFilterChange("author", e.target.value)}
                />
              </div>

              {/* Rating Filter */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-wisdom-gold" />
                  <label className="text-sm font-medium text-foreground">Minimum Rating</label>
                </div>
                <div className="px-2">
                  <Slider
                    value={filters.rating}
                    onValueChange={(value) => handleFilterChange("rating", value)}
                    max={5}
                    min={0}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Any</span>
                    <span>{filters.rating[0]} stars</span>
                  </div>
                </div>
              </div>

              {/* Reading Time Filter */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <label className="text-sm font-medium text-foreground">Max Reading Time</label>
                </div>
                <div className="px-2">
                  <Slider
                    value={filters.readingTime}
                    onValueChange={(value) => handleFilterChange("readingTime", value)}
                    max={20}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Any</span>
                    <span>{filters.readingTime[0]}h</span>
                  </div>
                </div>
              </div>

              {/* Publication Year */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-accent" />
                  <label className="text-sm font-medium text-foreground">Publication Year</label>
                </div>
                <Select value={filters.year} onValueChange={(value) => handleFilterChange("year", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Reading Status */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-success" />
                  <label className="text-sm font-medium text-foreground">Reading Status</label>
                </div>
                <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.genre !== "All Genres" && (
            <Badge variant="secondary" className="gap-1">
              {filters.genre}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => handleFilterChange("genre", "All Genres")}
              />
            </Badge>
          )}
          {filters.author && (
            <Badge variant="secondary" className="gap-1">
              Author: {filters.author}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => handleFilterChange("author", "")}
              />
            </Badge>
          )}
          {filters.rating[0] > 0 && (
            <Badge variant="secondary" className="gap-1">
              {filters.rating[0]}+ stars
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => handleFilterChange("rating", [0])}
              />
            </Badge>
          )}
          {filters.status !== "All" && (
            <Badge variant="secondary" className="gap-1">
              {filters.status}
              <X 
                className="w-3 h-3 cursor-pointer" 
                onClick={() => handleFilterChange("status", "All")}
              />
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}