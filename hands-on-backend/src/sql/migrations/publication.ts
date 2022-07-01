export const CREATE_PUBLICATION_TABLE = `CREATE TABLE IF NOT EXISTS publications
(
  publication_id TEXT NOT NULL,
  code INT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  created_by TEXT NOT NULL,
  priority INT NOT NULL,
  PRIMARY KEY(publication_id)
);`;

export const CREATE_PUBLICATION_TAG_TABLE = `CREATE TABLE IF NOT EXISTS publications_tags
(
  publication_tag_id TEXT NOT NULL,
  publication_id TEXT NOT NULL,
  tag_id TEXT NOT NULL,
  PRIMARY KEY(publication_tag_id),
  CONSTRAINT fk_publication
      FOREIGN KEY(publication_id)
      REFERENCES publications(publication_id),
  CONSTRAINT fk_tag
      FOREIGN KEY(tag_id)
      REFERENCES tags(tag_id)
);`;

export const CREATE_TAG_TABLE = `CREATE TABLE IF NOT EXISTS tags
(
  tag_id TEXT NOT NULL,
  name TEXT NOT NULL,
  PRIMARY KEY(tag_id)
);`;

export const ALTER_TABLE_AUTO_INCREMENT_CODE = `ALTER TABLE publications
ALTER code ADD GENERATED ALWAYS AS IDENTITY;`;
