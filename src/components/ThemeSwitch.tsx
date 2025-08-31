import { Monitor, Terminal, Scroll } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "./ThemeProvider"

export function ThemeSwitch() {
  const { setTheme, theme } = useTheme()

  const themes = [
    {
      name: 'Modern Dark',
      value: 'modern-dark' as const,
      icon: Monitor,
      description: 'Clean modern interface'
    },
    {
      name: 'Retro Terminal',
      value: 'retro-terminal' as const,
      icon: Terminal,
      description: 'Green phosphor on black'
    },
    {
      name: 'Ancient Parchment',
      value: 'ancient-parchment' as const,
      icon: Scroll,
      description: 'Warm vintage library'
    }
  ]

  const currentTheme = themes.find(t => t.value === theme)
  const CurrentIcon = currentTheme?.icon || Monitor

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <CurrentIcon className="h-4 w-4" />
          <span className="hidden sm:inline">{currentTheme?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {themes.map(({ name, value, icon: Icon, description }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => setTheme(value)}
            className={`flex items-start gap-3 p-3 ${
              theme === value ? 'bg-accent' : ''
            }`}
          >
            <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="font-medium">{name}</span>
              <span className="text-xs text-muted-foreground">{description}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}