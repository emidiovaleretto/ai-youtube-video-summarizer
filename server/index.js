import cors from "cors"
import express from "express"

import { download } from "./downloader.js"
import { transcribeAudio } from "./transcribe.js"

const app = express()
app.use(cors())

app.get("/summary/v=:id", async (request, response) => {
  await download(request.params.id)
  const result = await transcribeAudio()
  response.json({ result })
})

app.listen(3333, () => console.log("Server running on port 3333"))
