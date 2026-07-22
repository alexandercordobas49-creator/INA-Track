import dotenv from "dotenv";

dotenv.config({
    path: "./backend/.env"
});

const { default: XpRepository } = await import("./repositories/XpRepository.js");


const result = await XpRepository.create({
    userId: "9f1ae148-c7c6-41a9-95ec-acfb5f3d80a4",
    points: 50,
    source: "attendance",
    description: "Prueba XP PostgreSQL"
});


console.log(result);

process.exit();