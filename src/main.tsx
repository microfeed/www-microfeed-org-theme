import { flushSync } from "react-dom"
import { createRoot } from "react-dom/client"

import { CopyTextButton } from "@/components/CopyTextButton"
import { GitHubStarButton } from "@/components/GitHubStarButton"
import { SearchTrigger } from "@/components/SearchTrigger"
import {
  type ProductScreenshot,
  ScreenshotCarousel,
} from "@/components/ScreenshotCarousel"
import { ThemeMenu } from "@/components/ThemeMenu"
import "@/styles/theme.css"

const copyButtonRoots = document.querySelectorAll<HTMLElement>(
  "[data-copy-button-root]"
)

copyButtonRoots.forEach((copyButtonRoot) => {
  const copyable = copyButtonRoot.closest<HTMLElement>("[data-copyable]")
  const copyValue = copyable?.querySelector<HTMLElement>("[data-copy-value]")
  const text = copyValue?.textContent?.trim()
  const label = copyButtonRoot.dataset.copyLabel ?? "text"

  if (text) {
    flushSync(() => {
      createRoot(copyButtonRoot).render(
        <CopyTextButton label={label} text={text} />
      )
    })
  }
})

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
      alt: "The microfeed admin home page showing public access links, recent project updates, and the setup checklist",
      label: "Launch with a guided setup checklist",
      src: screenshotCarouselRoot.dataset.homeImageUrl,
    },
    {
      alt: "The microfeed channel editor with image, title, publisher, website, categories, language, and description controls",
      label: "Shape your channel and publishing identity",
      src: screenshotCarouselRoot.dataset.editChannelImageUrl,
    },
    {
      alt: "The microfeed API overview with API access, documentation, agent instructions, and request examples",
      label: "Build integrations with the REST API",
      src: screenshotCarouselRoot.dataset.apiOverviewImageUrl,
    },
    {
      alt: "The microfeed admin interface listing published, unlisted, and unpublished items",
      label: "See and manage all your content",
      src: screenshotCarouselRoot.dataset.allItemsImageUrl,
    },
    {
      alt: "The microfeed admin interface managing published site files including llms.txt, robots.txt, and sitemap.xml",
      label: "Customize files published with your site",
      src: screenshotCarouselRoot.dataset.siteFilesImageUrl,
    },
    {
      alt: "The microfeed theme editor showing version metadata, template source, preview, and install controls",
      label: "Customize and version every public view",
      src: screenshotCarouselRoot.dataset.themeEditorImageUrl,
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
