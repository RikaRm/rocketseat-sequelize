module.exports = {
    async validation(request, model) {
        const { user_id } = request.params
        const user = await model.findByPk(user_id)
        return user
    }
}