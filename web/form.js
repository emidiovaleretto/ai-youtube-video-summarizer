import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url-input")
const content = document.querySelector("#content")
const error = document.querySelector(".error")

form.addEventListener("submit", async (event) => {
  event.preventDefault()

  const url = input.value

  if (!url.includes("watch?v=")) {
    error.classList.remove("hidden")
    input.style.border = "1px solid red"
    return
  }

  const [path, id] = url.split("=")

  content.textContent = "Getting video content..."

  const transcription = await server.get(`/summary/v=${id}`)

  content.textContent = transcription.data.result
})
