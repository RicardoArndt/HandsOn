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

export const UPDATE_QUERY = `UPDATE publications
SET (title, description, priority) = ($2, $3, $4)
WHERE publication_id = $1;`;

export const SELECT_BY_ID = `SELECT *
FROM publications AS p
JOIN publications_tags AS pt ON pt.publication_id = p.publication_id
LEFT JOIN tags AS t ON t.tag_id = pt.tag_id
WHERE p.publication_id = $1;`;

export const SELECT_ALL = `SELECT *
FROM publications AS p
JOIN publications_tags AS pt ON pt.publication_id = p.publication_id
LEFT JOIN tags AS t ON t.tag_id = pt.tag_id;`;

export const SELECT_TAGS_BY_ID = `SELECT * FROM publications_tags WHERE publication_id = $1`
