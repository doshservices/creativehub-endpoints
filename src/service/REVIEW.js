const reviewSchema = require("../models/reviewModel")

class REVIEW {
    constructor(data) {
        this.data = data
        this.errors = []
    }

    async reviewCreative() {
        const {userId, stars, comment} = this.data
        return await new reviewSchema({userId, stars, comment}).save()
    }
}

module.exports = REVIEW