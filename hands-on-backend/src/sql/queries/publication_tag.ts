export const INSERT_QUERY = `INSERT INTO publications_tags
(
  publication_tag_id,
  tag_id,
  publication_id
) VALUES
(
  $1,
  $2,
  $3
);`;

export const DELETE_QUERY = `DELETE FROM publications_tags WHERE publication_id = $1;`;