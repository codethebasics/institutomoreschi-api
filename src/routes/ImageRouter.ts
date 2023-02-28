import express from "express"
import multer from "multer"

import ArchiveService from "../services/ArchiveService"

const storage = multer.memoryStorage()
const upload = multer({ storage })

const router = express.Router()
const archiveService = new ArchiveService()

router.post("/", (req, res) => {
  const { userId, title, extension, checksum }: any = req.params

  upload.single("file")(req, res, (err) => {
    if (!req.file) {
      return res.status(400).send("O arquivo deve ser envaido")
    }
    if (err) {
      return res.status(400).send("Erro ao enviar o arquivo")
    }

    archiveService.create({
      title: title,
      extension: extension,
      checksum: checksum,
      blob: req.file.buffer,
      userId: userId,
    })

    res.status(200).json({ message: "Arquivo recebido com sucesso!" })
  })
})

export default router
