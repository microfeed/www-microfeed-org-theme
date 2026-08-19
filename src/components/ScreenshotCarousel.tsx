import { useEffect, useState } from "react"

import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export type ProductScreenshot = {
  alt: string
  label: string
  src: string
}

type ScreenshotCarouselProps = {
  screenshots: ProductScreenshot[]
}

export function ScreenshotCarousel({
  screenshots,
}: ScreenshotCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return

    const updateCurrent = () => setCurrent(api.selectedScrollSnap())

    updateCurrent()
    api.on("reInit", updateCurrent)
    api.on("select", updateCurrent)

    return () => {
      api.off("reInit", updateCurrent)
      api.off("select", updateCurrent)
    }
  }, [api])

  if (screenshots.length === 0) return null

  return (
    <Carousel
      className="product-carousel"
      opts={{ align: "start", loop: true }}
      setApi={setApi}
      tabIndex={0}
      aria-label="microfeed administration interface screenshots"
    >
      <CarouselContent className="-ml-0">
        {screenshots.map((screenshot, index) => (
          <CarouselItem
            className="pl-0"
            key={screenshot.src}
            aria-label={`${index + 1} of ${screenshots.length}`}
          >
            <figure className="product-carousel-slide">
              <img
                src={screenshot.src}
                alt={screenshot.alt}
                width="3206"
                height="2160"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="product-carousel-arrow product-carousel-arrow--previous" />
      <CarouselNext className="product-carousel-arrow product-carousel-arrow--next" />

      <div className="product-carousel-footer">
        <p className="product-carousel-label" aria-live="polite">
          {screenshots[current]?.label}
        </p>
        <div className="product-carousel-dots" aria-label="Choose a screenshot">
          {screenshots.map((screenshot, index) => (
            <button
              type="button"
              key={screenshot.src}
              className="product-carousel-dot"
              aria-current={current === index ? "true" : undefined}
              aria-label={`Show screenshot ${index + 1}: ${screenshot.label}`}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
        <span className="product-carousel-count" aria-hidden="true">
          {current + 1} / {screenshots.length}
        </span>
      </div>
    </Carousel>
  )
}
