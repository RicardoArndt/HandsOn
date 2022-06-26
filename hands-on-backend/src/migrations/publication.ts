export const CREATE_PUBLICATION_TABLE = `CREATE TABLE IF NOT EXISTS publication
(
  id TEXT NOT NULL,
  code INT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  created_by TEXT NOT NULL,
  priority INT NOT NULL,
  PRIMARY KEY(id)
);`;

export const CREATE_PUBLICATION_TAG_TABLE = `CREATE TABLE IF NOT EXISTS publication_tag
(
  id TEXT NOT NULL,
  publication_id TEXT NOT NULL,
  tag_id TEXT NOT NULL,
  PRIMARY KEY(id),
  CONSTRAINT fk_publication
      FOREIGN KEY(publication_id)
      REFERENCES publication(id),
  CONSTRAINT fk_tag
      FOREIGN KEY(tag_id)
      REFERENCES tag(id)
);`;

export const CREATE_TAG_TABLE = `CREATE TABLE IF NOT EXISTS tag
(
  id TEXT NOT NULL,
  name TEXT NOT NULL,
  PRIMARY KEY(id)
);`;
