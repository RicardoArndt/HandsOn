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
