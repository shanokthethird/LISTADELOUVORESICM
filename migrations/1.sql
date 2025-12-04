
CREATE TABLE public_hymns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  number TEXT NOT NULL,
  name TEXT NOT NULL,
  submitted_by TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_public_hymns_number ON public_hymns(number);
CREATE INDEX idx_public_hymns_name ON public_hymns(name);
