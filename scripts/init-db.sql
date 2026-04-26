CREATE TABLE IF NOT EXISTS site_stats (
  id INTEGER PRIMARY KEY,
  active_members INTEGER NOT NULL CHECK (active_members >= 0)
);

INSERT INTO site_stats (id, active_members)
VALUES (1, 478)
ON CONFLICT (id) DO NOTHING;
