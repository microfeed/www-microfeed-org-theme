import { CheckIcon, CopyIcon } from "lucide-react"
import { useEffect, useRef, useState } from "react"

type CopyTextButtonProps = {
  label: string
  text: string
}

async function writeToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return
    } catch {
      // Embedded previews can expose the API while denying clipboard writes.
    }
  }

  const textarea = document.createElement("textarea")
  textarea.value = text
  textarea.setAttribute("readonly", "")
  textarea.style.position = "fixed"
  textarea.style.opacity = "0"
  document.body.append(textarea)
  textarea.select()

  const copied = document.execCommand("copy")
  textarea.remove()

  if (!copied) {
    throw new Error("The browser did not copy the text")
  }
}

export function CopyTextButton({ label, text }: CopyTextButtonProps) {
  const [copied, setCopied] = useState(false)
  const resetTimer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (resetTimer.current !== null) {
        window.clearTimeout(resetTimer.current)
      }
    }
  }, [])

  const copyText = async () => {
    try {
      await writeToClipboard(text)
      setCopied(true)

      if (resetTimer.current !== null) {
        window.clearTimeout(resetTimer.current)
      }

      resetTimer.current = window.setTimeout(() => {
        setCopied(false)
        resetTimer.current = null
      }, 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      className="copy-text-button"
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      title={copied ? "Copied" : `Copy ${label}`}
      onClick={() => void copyText()}
    >
      {copied ? <CheckIcon aria-hidden="true" /> : <CopyIcon aria-hidden="true" />}
    </button>
  )
}
