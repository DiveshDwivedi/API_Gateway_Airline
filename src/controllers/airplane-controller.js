const { StatusCodes } = require('http-status-codes');

const { AirplaneService } = require('../services');

async function createAirplane(req, response) {
    try {
       const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity:req.body.capacity,
       });
       
       return res
                .status(StatusCodes.CREATED)
                .json({
                    success:true,
                    message: 'Successfully create an airplane',
                    data: response,
                    error: {}
                });
    } catch (error) {
        return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({
                    success:false,
                    message: 'Something went wrong while creating airplane',
                    data: {},
                    error: error
                });
    }
}

module.exports = {
    createAirplane
}