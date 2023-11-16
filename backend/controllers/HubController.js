const {models: {Branch}} = require("../models");

class HubController {
    //GET /hub
    async getAllHub(req, res, next) {
        const hubs = await Branch.findAll({
            where: {
                is_hub: true,
            }
        })
        return res.status(200).json(hubs);
    }

    //GET /hub/:hubId
    async getHubById(req, res, next) {
        const hubId = req.params.hubId;
        const hub = await Branch.findOne({
            where: {
                hub_id: hubId,
                is_hub: true,
            },
        });

        if (!hub) {
            return res.status(404).json({
                status: "Query fail",
                msg: `Hub with id ${hubId} doesn't exist`,
            });
        }

        return res.status(200).json(hub);
    }

    //GET /hub/:hubId/branch
    async getBranchOfHub(req, res, next) {
        const hubId = req.params.hubId;
        const hub = await Branch.findOne({
            where: {
                hub_id: hubId,
                is_hub: true,
            },
        });
        if (!hub) {
            return res.status(401).json({
                status: "Query fail",
                msg: `Hub with id ${hubId} doesn't exist`,
            });
        }

        const branches = await Branch.findAll({
            where: {
                hub_id: hubId,
                is_hub: false,
            },
        })
        return res.status(200).json(branches);
    }
}