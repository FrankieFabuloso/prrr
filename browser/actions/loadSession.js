import request from '../request'
import state from '../state'

export default function loadSession() {
  return request('get', '/api/session')
    .then(response => {
      const session = response.json
      state.set({
        session,
        loadSessionError: null,
      })
    })
    .catch(loadSessionError => {
      state.set({loadSessionError})
    })
}

let isCat = false
let faviconNumURL

let catPic = 'data:image/vnd.microsoft.icon;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAgAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAA6+vrAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAQAAAAEAAAAAEAAAAQAAAAABEAABAAAAAAABAAEAAAAAEQAQAQAAAAAQEBAAEAAAAQAQEAABAAABAQAQAAEAABABAQAAEAAAARABAAEAAAAAEBAAAQAAAAAQAQAAEAAAAQEBAAAQAAABABAAABABEAEAAAAAEBABAQAADgHwAAwA8AAMADAADAAQAAwAAAAMAIAADgGAAA8BAAAPAxAADgAQAAwAMAAMABAADgEQAA4BsAAOAfAADjHwAA'

function toggleFavicon() {
  isCat ? displayNumber() : displayCat()
  isCat = !isCat
}

function displayNumber() {
  let linkEl = document.getElementById('favicon')
  linkEl.href = faviconNumURL
  console.log('displayNumber');
}

function displayCat() {
  let linkEl = document.getElementById('favicon')
  linkEl.href = catPic
  console.log();
  console.log('displayCat');
}

function startFaviconTimer() {
  setInterval(toggleFavicon, 2000)
}

function createFaviconNumURL() {
  let number = 55
  let canvas = document.createElement('canvas')
  let context = canvas.getContext('2d')
  canvas.width = 16
  canvas.height = 16

  context.beginPath()
  context.arc(8, 8, 8, 0, 2 * Math.PI, false)
  context.fillStyle = "green";
  context.fill()
  context.fillStyle = "white";
  if( number < 10 ) {
    context.font = '12px sans-serif'
    context.fillText(number, 4.5, 12)
  } else {
    context.font = '10px sans-serif'
    context.fillText(number, 2.5, 12)
  }
  faviconNumURL = context.canvas.toDataURL()
}

function createFaviconLink() {
  let linkEl = document.createElement('link')
  linkEl.type = 'image/x-icon'
  linkEl.rel = 'icon'
  linkEl.id = 'favicon'
  document.head.appendChild(linkEl)
}


loadSession()


createFaviconNumURL()
createFaviconLink()
startFaviconTimer()
