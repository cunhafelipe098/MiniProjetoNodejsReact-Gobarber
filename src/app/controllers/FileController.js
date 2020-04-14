import File from '../models/File'
import User from '../models/User'

class FileController {
  async store (req, res) {
    const { originalname: name, filename: path } = req.file

    const file = await File.create({
      name,
      path
    })

    const userId = req.userId

    const user = await User.findOne({
      where: { id: userId }
    })

    const userUpdated = await user.update({ avatar_id: file.id })

    return res.json(file)
  }
}

export default new FileController()
