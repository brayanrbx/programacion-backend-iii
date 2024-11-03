import MockingService from "../services/mocks.service.js";
import { usersService, petsService } from "../services/index.js";

const getMockingUsers = async (req, res) => {
    const mockingUsers = await MockingService.generateMockingUsers(50);
    res.send({status: "success", payload: mockingUsers});
};

const getMockingPets = async (req, res) => {
    const mockingPets = await MockingService.generateMockingPets(100);
    res.send({status: "success", payload: mockingPets});
};

const generateData = async (req, res) => {
    const {users, pets} = req.body;

    try {
        const mockingUsers = await MockingService.generateMockingUsers(users);

        const mockingPets = await MockingService.generateMockingPets(pets);

        await Promise.all(
            mockingUsers.map(user => usersService.create(user)),
            mockingPets.map(pet => petsService.create(pet))
        );

        res.send({status: "success", message: "Data generated"});
    } catch (error) {
        console.log(error);
        res.status(500).send({status: "error", error: error.message});
    }
};

export default {
    getMockingUsers,
    getMockingPets,
    generateData
}