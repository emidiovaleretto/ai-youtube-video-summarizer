import cors from "cors"
import express from "express"

import { download } from "./downloader.js"

const app = express()
app.use(cors())

app.get("/summary/v=:id", (request, response) => {
  let videoId = request.params.id
  download(videoId)

  response.json({ result: "Download completed successfully" })
})

app.listen(3333, () => console.log("Server running on port 3333"))
