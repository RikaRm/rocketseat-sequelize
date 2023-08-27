const User = require('../models/User')
const Tech = require('../models/Tech')
const { validation } = require('./Helpers/validation')

module.exports = {
    async index(req, res) {
        const {user_id} = req.params

        const user = await User.findByPk(user_id, {
            include: {association: 'techs', through:{ attributes: []}}
        })
        if (!user)
            return res.status(400).json({ message: "user not found !" })

        return res.json(user.techs)
    },

    async store(req, res) {
        const { name } = req.body

        const user = await validation(req, User)
        if (!user)
            return res.status(400).json({ message: "user not found !" })

        const [tech] = await Tech.findOrCreate({ where: { name } })

        await user.addTech(tech)

        return res.json(tech)
    },
    async delete(req, res) {
        const { name } = req.body

        const user = await validation(req, User)
        if (!user)
            return res.status(400).json({ message: "user not found !" })

        const tech = await Tech.findOne({ where: { name } })
        await user.removeTech(tech)
        return res.sendStatus(200)
    }
}