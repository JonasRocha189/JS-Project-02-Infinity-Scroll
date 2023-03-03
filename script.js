//
const imageContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

let ready = false
let imagesLoaded = 0
let totalImages = 0
let photosArray = []

// Unsplash API
const count = 5
const apiKey = 'clTtn2LKs9nFutT6jFBwFGbwe53MFq5mFxOi2FGgTII'
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`

// check if all images are loaded
function imageLoaded() {
  imagesLoaded++
  // console.log('image loaded' + imagesLoaded)
  if (imagesLoaded === totalImages) {
    ready = true
    loader.hidden = true
    count = 20
    // console.log('ready', ready)
  }
}

// Helper function to set attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key])
  }
}

// Create elements for links and Photos, add to DOM
function displayPhotos() {
  imagesLoaded = 0
  totalImages = photosArray.length
  // console.log('total images', totalImages)

  // run function for each each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a')
    // item.setAttribute('href', photo.links.html)
    // item.setAttribute('target', '_blank')
    setAttributes(item, {
      element: 'href',
      target: '_blank',
    })

    // Create <img> for photo
    const img = document.createElement('img')
    // img.setAttribute('src', photo.urls.regular)
    // img.setAttribute('alt', photo.alt_description)
    // img.setAttribute('title', photo.alt_description)
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_descrpition,
      title: photo.alt_descrpition,
    })

    // Event listener, check when each  is finished loading
    img.addEventListener('load', imageLoaded)

    // Put <img> inside <a>, then both inside imageContainer element
    item.appendChild(img)
    imageContainer.appendChild(item)
  })
}

// Get photos from Unsplash api
async function getPhotos() {
  try {
    const response = await fetch(apiUrl)
    photosArray = await response.json()

    displayPhotos(photosArray)
  } catch (error) {
    console.log(error)
  }
}

// Check to see if scrolling near bottom of page, lload more photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false
    getPhotos()
    // console.log('Load more')
  }
})

// On Load
getPhotos()
