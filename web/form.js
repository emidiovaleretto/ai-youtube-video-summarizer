import { server } from './server.js'

const form = document.querySelector('#form')
const input = document.querySelector('#url-input')
const button = document.querySelector('.input-submit button')
const content = document.querySelector('#content')
const error = document.querySelector('.error')
const loading = document.querySelector('.overlay')

form.addEventListener('submit', async (event) => {
  event.preventDefault()

  content.classList.add('placeholder')

  const url = input.value

  if (!url.includes('watch?v=')) {
    error.classList.remove('hidden')
    input.style.border = '1px solid red'
    return
  }

  const [path, id] = url.split('=')

  error.classList.add('hidden')
  input.style.border = '1px solid #ccc'
  content.textContent = 'Getting video content...'
  button.classList.add('disabled')
  loading.classList.remove('hidden')

  const transcription = await server.get(`/summary/v=${id}`)

  content.textContent = transcription.data.result

  content.classList.remove('placeholder')
  button.classList.remove('disabled')
  loading.classList.add('hidden')
})
