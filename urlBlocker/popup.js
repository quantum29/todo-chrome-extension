document.addEventListener('DOMContentLoaded', function () {
  const blockForm = document.getElementById('block-form')
  const unblockForm = document.getElementById('unblock-form')
  const blockedList = document.getElementById('blocked-list')

  // Function to update the displayed blocked websites list
  function updateBlockedList() {
    blockedList.innerHTML = ''
    chrome.storage.sync.get('blockedWebsites', function (data) {
      const blockedWebsites = data.blockedWebsites || []
      blockedWebsites.forEach(function (url) {
        const li = document.createElement('li')
        li.textContent = url
        blockedList.appendChild(li)
      })
    })
  }

  updateBlockedList()

  blockForm.addEventListener('submit', function (event) {
    event.preventDefault()
    const url = document.getElementById('url').value
    chrome.runtime.sendMessage({ action: 'block', url }, function () {
      updateBlockedList()
    })
  })

  unblockForm.addEventListener('submit', function (event) {
    event.preventDefault()
    const urlToUnblock = document.getElementById('unblock-url').value
    chrome.runtime.sendMessage(
      { action: 'unblock', url: urlToUnblock },
      function () {
        updateBlockedList()
      }
    )
  })
})
