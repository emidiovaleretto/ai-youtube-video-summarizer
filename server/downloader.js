import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) => {
  let url = `https://www.youtube.com/watch?v=${videoId}`
  let output = `./tmp/${videoId}.mp4`

  console.log(`Downloading video: ${videoId}`)

  ytdl(url, { quality: "lowestaudio", filter: "audioonly" })
    .on("info", (info) => {
      const seconds = info.formats[0].approxDurationMs / 1000

      if (seconds < 60) {
        throw new Error("Video is less than 1 minute long.")
      }
      return
    })
    .on("end", () => {
      console.log("Finished downloading")
    })
    .on("error", (error) => {
      console.log(`Unable to download video: ${error}`)
    })
    .pipe(fs.createWriteStream(output))
}
