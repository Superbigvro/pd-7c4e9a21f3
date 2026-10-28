/*
 * PaperDesk download site
 *
 * To publish the installer somewhere else, only change downloadUrl below.
 * It can be a relative path (default) or a full https:// URL, such as a
 * GitHub Releases asset. The rest of the page updates from this object.
 */

const siteConfig = {
  version: '0.1.0',
  size: '121 MB',
  downloadUrl: 'https://github.com/Superbigvro/pd-7c4e9a21f3/releases/latest/download/PaperDesk-Setup-0.1.0.exe',
  sha256: '407F4465346F75B87D70151D806C3BB42F9F2066F87D2937D7C1126FF7D4C3D7'
}

for (const element of document.querySelectorAll('[data-download]')) {
  element.setAttribute('href', siteConfig.downloadUrl)
}

for (const element of document.querySelectorAll('[data-version]')) {
  element.textContent = siteConfig.version
}

for (const element of document.querySelectorAll('[data-size]')) {
  element.textContent = siteConfig.size
}

for (const element of document.querySelectorAll('[data-sha]')) {
  element.textContent = siteConfig.sha256
}

for (const element of document.querySelectorAll('[data-year]')) {
  element.textContent = String(new Date().getFullYear())
}

const header = document.querySelector('.site-header')
const updateHeader = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 8)
}
updateHeader()
window.addEventListener('scroll', updateHeader, { passive: true })

const copyButton = document.querySelector('[data-copy-sha]')
const copyToast = document.querySelector('[data-copy-toast]')
let toastTimer

const showToast = (message) => {
  if (!copyToast) return
  copyToast.textContent = message
  copyToast.classList.add('is-visible')
  window.clearTimeout(toastTimer)
  toastTimer = window.setTimeout(() => copyToast.classList.remove('is-visible'), 1800)
}

const copyChecksum = async () => {
  try {
    await navigator.clipboard.writeText(siteConfig.sha256)
    showToast('Checksum copied')
  } catch {
    const input = document.createElement('textarea')
    input.value = siteConfig.sha256
    input.setAttribute('readonly', '')
    input.style.position = 'fixed'
    input.style.opacity = '0'
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    input.remove()
    showToast('Checksum copied')
  }
}

copyButton?.addEventListener('click', () => {
  void copyChecksum()
})

const revealItems = [...document.querySelectorAll('.reveal')]
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (reduceMotion || !('IntersectionObserver' in window)) {
  for (const item of revealItems) item.classList.add('is-visible')
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
  )

  for (const item of revealItems) observer.observe(item)
}
