import { useEffect, useState } from "react"
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const THEME_STORAGE_KEY = "microfeed-public-theme"
const THEME_PREFERENCES = ["system", "light", "dark"] as const

type ThemePreference = (typeof THEME_PREFERENCES)[number]

const themeOptions: Array<{
  icon: typeof MonitorIcon
  label: string
  value: ThemePreference
}> = [
  { icon: MonitorIcon, label: "System", value: "system" },
  { icon: SunIcon, label: "Light", value: "light" },
  { icon: MoonIcon, label: "Dark", value: "dark" },
]

function parseThemePreference(value: string | null): ThemePreference {
  return THEME_PREFERENCES.includes(value as ThemePreference)
    ? (value as ThemePreference)
    : "light"
}

function currentThemePreference(): ThemePreference {
  return parseThemePreference(
    document.documentElement.dataset.themePreference ?? null
  )
}

function applyTheme(preference: ThemePreference) {
  const isDark =
    preference === "dark" ||
    (preference === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  document.documentElement.classList.toggle("dark", isDark)
  document.documentElement.dataset.themePreference = preference
  document.documentElement.dataset.colorMode = isDark ? "dark" : "light"
  document.documentElement.style.colorScheme = isDark ? "dark" : "light"
}

export function ThemeMenu() {
  const [theme, setTheme] = useState<ThemePreference>(currentThemePreference)

  useEffect(() => {
    applyTheme(theme)

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
    const handleSystemThemeChange = () => {
      if (theme === "system") applyTheme("system")
    }
    const handleStorage = (event: StorageEvent) => {
      if (event.key === THEME_STORAGE_KEY) {
        setTheme(parseThemePreference(event.newValue))
      }
    }

    systemTheme.addEventListener("change", handleSystemThemeChange)
    window.addEventListener("storage", handleStorage)

    return () => {
      systemTheme.removeEventListener("change", handleSystemThemeChange)
      window.removeEventListener("storage", handleStorage)
    }
  }, [theme])

  const ActiveIcon =
    themeOptions.find((option) => option.value === theme)?.icon ?? SunIcon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="theme-menu-trigger"
            aria-label={`Color theme: ${theme}`}
          />
        }
      >
        <ActiveIcon aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="theme-menu-content">
        <DropdownMenuLabel>Color theme</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(value) => {
            const nextTheme = parseThemePreference(value)

            try {
              window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
            } catch {
              // The preference still applies to the current page.
            }

            setTheme(nextTheme)
          }}
        >
          {themeOptions.map(({ icon: Icon, label, value }) => (
            <DropdownMenuRadioItem key={value} value={value}>
              <Icon aria-hidden="true" />
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
