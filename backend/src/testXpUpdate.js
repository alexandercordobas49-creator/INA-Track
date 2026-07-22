import dotenv from "dotenv";

dotenv.config({
    path: "./backend/.env"
});


const { default: XpRepository } = await import("./repositories/XpRepository.js");


const userId = "9f1ae148-c7c6-41a9-95ec-acfb5f3d80a4";


await XpRepository.updateUserXp(userId, 50);


const user = await XpRepository.updateLevel(userId);


console.log(user);


process.exit();