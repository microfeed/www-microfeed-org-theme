import { flushSync } from "react-dom"
import { createRoot } from "react-dom/client"

import { GitHubStarButton } from "@/components/GitHubStarButton"
import { SearchTrigger } from "@/components/SearchTrigger"
import {
  type ProductScreenshot,
  ScreenshotCarousel,
} from "@/components/ScreenshotCarousel"
import { ThemeMenu } from "@/components/ThemeMenu"
import "@/styles/theme.css"

const themeMenuRoot = document.querySelector<HTMLElement>(
  "#microfeed-theme-menu-root"
)

if (themeMenuRoot) {
  flushSync(() => {
    createRoot(themeMenuRoot).render(<ThemeMenu />)
  })
}

const searchRoot = document.querySelector<HTMLElement>(
  "#microfeed-search-trigger-root"
)

if (searchRoot) {
  flushSync(() => {
    createRoot(searchRoot).render(<SearchTrigger />)
  })
}

const githubStarRoot = document.querySelector<HTMLElement>(
  "#microfeed-github-star-root"
)

if (githubStarRoot) {
  const iconUrl = githubStarRoot.dataset.iconUrl

  if (iconUrl) {
    flushSync(() => {
      createRoot(githubStarRoot).render(
        <GitHubStarButton iconUrl={iconUrl} />
      )
    })
  }
}

const screenshotCarouselRoot = document.querySelector<HTMLElement>(
  "#microfeed-product-carousel-root"
)

if (screenshotCarouselRoot) {
  const screenshotDefinitions = [
    {
      alt: "The microfeed admin interface editing an item and its media, image, title, publication status, and description",
      label: "Create and edit every kind of content",
      src: screenshotCarouselRoot.dataset.editItemImageUrl,
    },
    {
      alt: "The microfeed admin interface managing published site files including llms.txt, robots.txt, and sitemap.xml",
      label: "Customize files published with your site",
      src: screenshotCarouselRoot.dataset.siteFilesImageUrl,
    },
    {
      alt: "The microfeed admin interface listing published, unlisted, and unpublished items",
      label: "See and manage all your content",
      src: screenshotCarouselRoot.dataset.allItemsImageUrl,
    },
    {
      alt: "The microfeed API overview with API access, documentation, agent instructions, and request examples",
      label: "Build integrations with the REST API",
      src: screenshotCarouselRoot.dataset.apiOverviewImageUrl,
    },
  ]

  const screenshots = screenshotDefinitions.filter(
    (screenshot): screenshot is ProductScreenshot =>
      typeof screenshot.src === "string" && screenshot.src.length > 0
  )

  flushSync(() => {
    createRoot(screenshotCarouselRoot).render(
      <ScreenshotCarousel screenshots={screenshots} />
    )
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
