import { pool } from "../config/database.js";

const LevelService = {

    async calculateLevel(totalXp) {

        const result = await pool.query(
            `
            SELECT
                level_number,
                name,
                min_xp
            FROM levels
            WHERE min_xp <= $1
            ORDER BY min_xp DESC
            LIMIT 1
            `,
            [totalXp]
        );

        return result.rows[0] || null;

    },

    async updateUserLevel(userId) {

        const userResult = await pool.query(
            `
            SELECT total_xp
            FROM users
            WHERE id = $1
            `,
            [userId]
        );

        if (userResult.rowCount === 0) {
            throw new Error("Usuario no encontrado");
        }

        const totalXp = Number(userResult.rows[0].total_xp);

        const level = await this.calculateLevel(totalXp);

        await pool.query(
            `
            UPDATE users
            SET current_level = $1
            WHERE id = $2
            `,
            [
                level.level_number,
                userId
            ]
        );

        return level;

    }

};

export default LevelService;