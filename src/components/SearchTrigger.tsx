import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"

export function SearchTrigger() {
  return (
    <Button
      type="button"
      variant="outline"
      className="nav-search-trigger"
      aria-label="Search microfeed"
      aria-haspopup="dialog"
      aria-controls="microfeed-search-dialog"
      data-microfeed-search-open
    >
      <Search aria-hidden="true" />
      <span className="nav-search-label">Search</span>
      <kbd>⌘K</kbd>
    </Button>
  )
}
