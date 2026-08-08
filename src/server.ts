import express = require("express");
import dotenv = require("dotenv");
import pool = require("./db/database");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static("public"));

interface Tool {
    id: number;
    name: string;
    category: string;
    purpose: string;
    status: string;
    difficulty: string;
}


// ==================== CREATE ====================

app.post("/api/tools", async (req, res) => {

    try {

        const {
            name,
            category,
            purpose,
            status,
            difficulty
        } = req.body;

        const [result] = await pool.execute(
            `INSERT INTO tools
            (name, category, purpose, status, difficulty)
            VALUES (?, ?, ?, ?, ?)`,
            [name, category, purpose, status, difficulty]
        );

        res.status(201).json({
            status: "Tool added successfully",
            result: result
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: "Failed to add tool"
        });
    }
});


// ==================== READ ALL ====================

app.get("/api/gettools", async (req, res) => {

    try {

        const [rows] = await pool.execute(
            "SELECT * FROM tools"
        );

        res.status(200).json({
            tools: rows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: "Failed to fetch tools"
        });
    }
});


// ==================== READ ONE ====================

app.get("/api/gettool/:id", async (req, res) => {

    try {

        const id = Number(req.params.id);

        const [rows]: any = await pool.execute(
            "SELECT * FROM tools WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                status: "Tool not found"
            });
        }

        res.status(200).json({
            tool: rows[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: "Failed to fetch tool"
        });
    }
});


// ==================== UPDATE ====================

app.put("/api/modifytool/:id", async (req, res) => {

    try {

        const id = Number(req.params.id);

        const {
            name,
            category,
            purpose,
            status,
            difficulty
        } = req.body;

        const [result]: any = await pool.execute(
            `UPDATE tools
             SET name = ?,
                 category = ?,
                 purpose = ?,
                 status = ?,
                 difficulty = ?
             WHERE id = ?`,
            [
                name,
                category,
                purpose,
                status,
                difficulty,
                id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: "Tool not found"
            });
        }

        res.status(200).json({
            status: "Tool modified"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: "Failed to update tool"
        });
    }
});


// ==================== DELETE ====================

app.delete("/api/deletetool/:id", async (req, res) => {

    try {

        const id = Number(req.params.id);

        const [result]: any = await pool.execute(
            "DELETE FROM tools WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: "Tool not found"
            });
        }

        res.status(200).json({
            status: "Tool deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: "Failed to delete tool"
        });
    }
});


// ==================== HEALTH ====================

app.get("/health", (req, res) => {

    res.status(200).json({
        status: "ok",
        ahmed: "na dhan da hero"
    });

});


// ==================== SERVER ====================

const PORT = process.env.PORT || 3000;

pool.getConnection()
    .then((Connection)=>{
        console.log("Connected Successfully");
    })
    .catch((error)=>{
        console.log("Connected UnSuccessfully")
    })
app.listen(PORT, () => {
    console.log(`Tool Registry API is running on port ${PORT}`);
});
