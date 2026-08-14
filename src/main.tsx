import { flushSync } from "react-dom"
import { createRoot } from "react-dom/client"

import { SearchTrigger } from "@/components/SearchTrigger"
import "@/styles/theme.css"

const searchRoot = document.querySelector<HTMLElement>(
  "#microfeed-search-trigger-root"
)

if (searchRoot) {
  flushSync(() => {
    createRoot(searchRoot).render(<SearchTrigger />)
  })
}

const header = document.querySelector<HTMLElement>(
  "[data-microfeed-site-header]"
)

if (header) {
  let updateScheduled = false

  const updateHeader = () => {
    header.classList.toggle("is-compact", window.scrollY > 48)
    updateScheduled = false
  }

  const scheduleUpdate = () => {
    if (updateScheduled) return
    updateScheduled = true
    window.requestAnimationFrame(updateHeader)
  }

  updateHeader()
  window.addEventListener("scroll", scheduleUpdate, { passive: true })
}
