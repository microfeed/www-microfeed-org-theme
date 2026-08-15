import { useEffect, useState } from "react"

const REPOSITORY_URL = "https://github.com/microfeed/microfeed"
const REPOSITORY_API_URL = "https://api.github.com/repos/microfeed/microfeed"

type GitHubStarButtonProps = {
  iconUrl: string
}

type GitHubRepository = {
  stargazers_count?: unknown
}

const starCountFormatter = new Intl.NumberFormat("en-US")

export function GitHubStarButton({ iconUrl }: GitHubStarButtonProps) {
  const [starCount, setStarCount] = useState<number | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    void fetch(REPOSITORY_API_URL, {
      headers: {
        Accept: "application/vnd.github+json",
      },
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`GitHub returned ${response.status}`)
        }
        return response.json() as Promise<GitHubRepository>
      })
      .then((repository) => {
        if (
          typeof repository.stargazers_count === "number" &&
          Number.isFinite(repository.stargazers_count)
        ) {
          setStarCount(repository.stargazers_count)
        }
      })
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setStarCount(null)
        }
      })

    return () => controller.abort()
  }, [])

  const formattedStarCount =
    starCount === null ? null : starCountFormatter.format(starCount)
  const label =
    starCount === null
      ? "Star microfeed/microfeed on GitHub"
      : `Star microfeed/microfeed on GitHub, ${formattedStarCount} stars`
  const className = starCount === null
    ? "github-star-button github-star-button--icon-only"
    : "github-star-button"

  return (
    <a className={className} href={REPOSITORY_URL} aria-label={label}>
      <img src={iconUrl} alt="" aria-hidden="true" />
      {formattedStarCount === null ? null : (
        <>
          <span>Star</span>
          <span className="github-star-count" aria-hidden="true">
            {formattedStarCount}
          </span>
        </>
      )}
    </a>
  )
}
