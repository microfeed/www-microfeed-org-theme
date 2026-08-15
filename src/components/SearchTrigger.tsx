import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd, KbdGroup } from "@/components/ui/kbd"

export function SearchTrigger() {
  return (
    <>
      <InputGroup className="nav-search-trigger">
        <InputGroupAddon align="inline-start">
          <Search aria-hidden="true" />
        </InputGroupAddon>
        <InputGroupInput
          type="search"
          readOnly
          placeholder="Search"
          aria-label="Search microfeed"
          aria-haspopup="dialog"
          aria-controls="microfeed-search-dialog"
          data-microfeed-search-open
        />
        <InputGroupAddon align="inline-end">
          <KbdGroup aria-label="Command K">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </InputGroupAddon>
      </InputGroup>
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="nav-search-mobile-trigger"
        aria-label="Search microfeed"
        aria-haspopup="dialog"
        aria-controls="microfeed-search-dialog"
        data-microfeed-search-open
      >
        <Search aria-hidden="true" />
      </Button>
    </>
  )
}
