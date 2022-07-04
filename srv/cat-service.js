const cds = require("@sap/cds");

class CatalogService extends cds.ApplicationService {
    init() {
        const { Books } = this.entities;
        this.on("READ", "Books", async (req) => {
            try {
                const books = await SELECT.from(Books);
                books && Array.isArray(books) && books.length && books.forEach(book => book.subtitle = req.user.id)
                return books
            } catch (oErr) {
                req.error(oErr);
            }

        })
        return super.init();
    }
}

module.exports = {
    CatalogService
}