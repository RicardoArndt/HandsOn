export const INSERT_QUERY = `INSERT INTO tags
(
  tag_id,
  name
) VALUES
(
  $1,
  $2
);`;

export const SELECT_IN_NAMES = (names: string[]) => `SELECT * FROM tags WHERE name IN
(${names.map((n, i) => '$' + (i+1)).join(',')});`;

export const SELECT_IN_IDS = (ids: string[]) => `SELECT * FROM tags WHERE tag_id IN
(${ids.map((n, i) => '$' + (i+1)).join(',')});`;
