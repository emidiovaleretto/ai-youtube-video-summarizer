import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url-input")
const content = document.querySelector("#content")
const error = document.querySelector(".error")
const loading = document.querySelector(".overlay")
const modal = document.querySelector(".modal")

const closeModal = document.querySelector(".close-modal")
const copyButton = document.querySelector(".copy")
const iframe = document.querySelector("iframe")

copyButton.addEventListener("click", () => {
  copyButton.classList.add("copied")

  const range = document.createRange()
  range.selectNode(content)
  window.getSelection().removeAllRanges()
  window.getSelection().addRange(range)
  document.execCommand("copy")
  window.getSelection().removeAllRanges()

  setTimeout(() => {
    copyButton.classList.remove("copied")
  }, 1000)
})

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden")
})

form.addEventListener("submit", async (event) => {
  event.preventDefault()

  content.classList.add("placeholder")

  const url = input.value

  if (!url.includes("watch?v=")) {
    error.classList.remove("hidden")
    input.style.border = "1px solid red"
    return
  }

  const [path, id] = url.split("=")

  error.classList.add("hidden")
  input.style.border = "1px solid #ccc"
  content.textContent = "Getting video content..."
  loading.classList.remove("hidden")

  const transcription = await server.get(`/summary/v=${id}`)

  content.textContent = transcription.data.result
  iframe.src = `https://www.youtube.com/embed/${id}`

  modal.classList.remove("hidden")
  content.classList.remove("placeholder")
  loading.classList.add("hidden")
})
