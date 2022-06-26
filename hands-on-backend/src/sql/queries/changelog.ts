export const GET_BY_NAME_QUERY = `SELECT * FROM changelog WHERE name=$1 LIMIT 1;`;

export const INSERT_QUERY = `INSERT INTO changelog (id, name) VALUES ($1, $2);`;
