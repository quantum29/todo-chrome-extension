chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ blockedWebsites: [] })
})

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'block') {
    chrome.storage.sync.get('blockedWebsites', function (data) {
      const blockedWebsites = data.blockedWebsites || []
      blockedWebsites.push(message.url)
      chrome.storage.sync.set({ blockedWebsites })
      sendResponse({ success: true })
    })
  } else if (message.action === 'unblock') {
    chrome.storage.sync.get('blockedWebsites', function (data) {
      const blockedWebsites = data.blockedWebsites || []
      const updatedBlockedWebsites = blockedWebsites.filter(
        (url) => url !== message.url
      )
      chrome.storage.sync.set({ blockedWebsites: updatedBlockedWebsites })
      sendResponse({ success: true })
    })
  }
  return true
})
