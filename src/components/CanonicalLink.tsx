import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function CanonicalLink() {
  const location = useLocation()

  useEffect(() => {
    // Get or create canonical link element
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }

    // Set the href to current page
    const canonicalUrl = `https://simplecalculators.io${location.pathname}`
    canonicalLink.setAttribute('href', canonicalUrl)
  }, [location.pathname])

  return null
}
