import knex from "knex";

export const database = (connectionString, client, sslmode) => {
  try {
    return knex({
      client,
      connection: sslmode
        ? {
            connectionString,
            ssl: { require: true, rejectUnauthorized: false },
          }
        : connectionString,
    });
  } catch (error) {
    console.log("connectdbError", error);
  }
};
