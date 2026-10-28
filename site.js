/*
 * PaperDesk download site
 *
 * To publish the installer somewhere else, only change downloadUrl below.
 * The rest of the page updates from this object.
 */

const siteConfig = {
  version: '0.1.0',
  size: '121 MB',
  downloadUrl: 'https://github.com/Superbigvro/pd-7c4e9a21f3/releases/latest/download/PaperDesk-Setup-0.1.0.exe',
  sha256: '3A1C56049550B77E6F951C5ACA1A65B02EA126B54A84D2977AD2D98A10559819'
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

const copyButton = document.querySelector('[data-copy-sha]')
const copyStatus = document.querySelector('[data-copy-status]')
let statusTimer

const showStatus = (message) => {
  if (!copyStatus) return
  copyStatus.textContent = message
  window.clearTimeout(statusTimer)
  statusTimer = window.setTimeout(() => {
    copyStatus.textContent = ''
  }, 1800)
}

const copyChecksum = async () => {
  try {
    await navigator.clipboard.writeText(siteConfig.sha256)
    showStatus('Copied')
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
    showStatus('Copied')
  }
}

copyButton?.addEventListener('click', () => {
  void copyChecksum()
})
