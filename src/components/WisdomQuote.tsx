import { Quote } from "lucide-react"

interface WisdomQuoteProps {
  quote: string
  author: string
  book?: string
}

export function WisdomQuote({ quote, author, book }: WisdomQuoteProps) {
  return (
    <div className="gradient-card rounded-xl p-8 border border-border/50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-4 right-4 opacity-5">
        <Quote className="w-16 h-16" />
      </div>
      
      <div className="relative z-10">
        <div className="mb-4">
          <Quote className="w-6 h-6 text-wisdom-gold mb-3" />
          <blockquote className="text-lg text-card-foreground font-medium leading-relaxed">
            "{quote}"
          </blockquote>
        </div>
        
        <div className="text-right">
          <p className="text-sm text-muted-foreground">
            — {author}
            {book && <span className="block text-xs mt-1">from "{book}"</span>}
          </p>
        </div>
      </div>
    </div>
  )
}