// Listen for web requests and block if URL matches a blocked website
chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    chrome.storage.sync.get('blockedWebsites', function (data) {
      const blockedWebsites = data.blockedWebsites || []
      for (const blockedWebsite of blockedWebsites) {
        if (details.url.includes(blockedWebsite)) {
          return { cancel: true }
        }
      }
    })
  },
  { urls: ['<all_urls>'] },
  ['blocking']
)
