const pool = require('../database');
const bcrypt = require('bcryptjs');

const seed = async () => {

  const client = await pool.connect();

  try {

    await client.query('BEGIN');

    console.log('Iniciando Seeder...');


    // ==========================================
    // 1. Crear rol Administrator si no existe
    // ==========================================

    const roleResult = await client.query(
      `SELECT id
       FROM roles
       WHERE name = $1`,
      ['Administrator']
    );

    let administratorRoleId;

    if (roleResult.rows.length > 0) {

      administratorRoleId = roleResult.rows[0].id;

      console.log(
        '✓ El rol Administrator ya existe.'
      );

    } else {

      const newRole = await client.query(
        `INSERT INTO roles
        (name, description)
        VALUES ($1, $2)
        RETURNING id`,
        [
          'Administrator',
          'Administrador del sistema'
        ]
      );

      administratorRoleId = newRole.rows[0].id;

      console.log(
        '✓ Rol Administrator creado.'
      );

    }


    // ==========================================
    // 2. Crear usuario administrador
    // ==========================================

    const userResult = await client.query(
      `SELECT id
       FROM usuarios
       WHERE nickname = $1`,
      ['RaulBeltran']
    );

    if (userResult.rows.length > 0) {

      console.log(
        '✓ El usuario RaulBeltran ya existe.'
      );

    } else {

      const hashedPassword = await bcrypt.hash(
        'admin',
        10
      );

      await client.query(
        `INSERT INTO usuarios
        (
          nickname,
          password,
          email,
          role
        )
        VALUES ($1, $2, $3, $4)`,
        [
          'RaulBeltran',
          hashedPassword,
          'admin@sistema.com',
          administratorRoleId
        ]
      );

      console.log(
        '✓ Usuario administrador creado.'
      );

    }


    // ==========================================
    // 3. Crear algunos clientes de prueba
    // ==========================================

    const clients = [
      [
        'Cliente Seeder 1',
        'Paid',
        'Paid',
        '2026-10-15'
      ],
      [
        'Cliente Seeder 2',
        'Pending',
        'Pending',
        '2026-10-20'
      ]
    ];


    for (const clientData of clients) {

      const existingClient = await client.query(
        `SELECT id
         FROM client_records
         WHERE unsername = $1`,
        [clientData[0]]
      );

      if (existingClient.rows.length === 0) {

        await client.query(
          `INSERT INTO client_records
          (
            unsername,
            paymaent_status,
            comission_status,
            deadline
          )
          VALUES ($1, $2, $3, $4)`,
          clientData
        );

        console.log(
          `✓ Cliente ${clientData[0]} creado.`
        );

      } else {

        console.log(
          `✓ Cliente ${clientData[0]} ya existe.`
        );

      }

    }


    await client.query('COMMIT');

    console.log('');
    console.log('====================================');
    console.log('✓ Seeder ejecutado correctamente');
    console.log('====================================');


  } catch (error) {

    await client.query('ROLLBACK');

    console.error('');
    console.error('❌ Error ejecutando Seeder:');
    console.error(error.message);

  } finally {

    client.release();

  }

};


seed();