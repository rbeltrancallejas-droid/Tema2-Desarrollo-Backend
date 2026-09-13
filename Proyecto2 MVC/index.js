const express = require("express");
const pool = require("./database");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

// GET - Obtener todos los registros
app.get("/test", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM client_records"
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST - Crear un registro
app.post("/test", async (req, res) => {
  try {
    const {
      username,
      payment_status,
      comission_status,
      deadline
    } = req.body;

    const result = await pool.query(
      `INSERT INTO client_records
      (username, payment_status, comission_status, deadline)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [username, payment_status, comission_status, deadline]
    );

    console.log("Record inserted successfully");

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT - Actualizar un registro
app.put("/test/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      username,
      payment_status,
      comission_status,
      deadline
    } = req.body;

    const result = await pool.query(
      `UPDATE client_records
       SET username = $1,
           payment_status = $2,
           comission_status = $3,
           deadline = $4
       WHERE id = $5
       RETURNING *`,
      [
        username,
        payment_status,
        comission_status,
        deadline,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Client not found"
      });
    }

    console.log("Record updated successfully");

    res.status(200).json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
});

// DELETE - Eliminar un registro
app.delete("/test/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM client_records
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Client not found"
      });
    }

    console.log("Record deleted successfully");

    res.status(200).json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error"
    });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});