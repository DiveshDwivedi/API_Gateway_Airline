const { Logger } = require("../config");

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const response = await this.model.create(data);

            return response;
        } catch (error) {
            Logger.error('Something went wrong in CRUD Repo : Create');
            throw error;
        }
    }

    async destroy(data) {
        try {
            const response = await this.model.destroy({
                where : {
                    id:data,
                }
            });

            return response;
        } catch (error) {
            Logger.error('Something went wrong in CRUD Repo : Destroy');
            throw error;
        }
    }

    async get(data) {
        try {
            const response = await this.model.findByPK(data);

            return response;
        } catch (error) {
            Logger.error('Something went wrong in CRUD Repo : Get');
            throw error;
        }
    }

    async getAll(data) {
        try {
            const response = await this.model.findAll(data);

            return response;
        } catch (error) {
            Logger.error('Something went wrong in CRUD Repo : Get');
            throw error;
        }
    }
}

module.exports = CrudRepository;