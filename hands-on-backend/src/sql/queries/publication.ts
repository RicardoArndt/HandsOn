export const INSERT_QUERY = `INSERT INTO publications
(
  publication_id,
  code,
  title,
  description,
  created_at,
  created_by,
  priority
) VALUES
(
  $1,
  $2,
  $3,
  $4,
  $5,
  $6,
  $7
);`;
