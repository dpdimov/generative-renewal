-- Generative Renewal Toolkit: Diagnostic Results
-- Run this against your Neon database to create the table

CREATE TABLE diagnostic_results (
  id SERIAL PRIMARY KEY,
  connection_score DECIMAL(3, 2) NOT NULL,
  values_score DECIMAL(3, 2) NOT NULL,
  imagination_score DECIMAL(3, 2) NOT NULL,
  coherence_score DECIMAL(3, 2) NOT NULL,
  group_code VARCHAR(50),
  user_agent TEXT,
  ip_address INET,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_completed_at ON diagnostic_results(completed_at);
CREATE INDEX idx_group_code ON diagnostic_results(group_code);

-- To add group_code to an existing table:
-- ALTER TABLE diagnostic_results ADD COLUMN group_code VARCHAR(50);
-- CREATE INDEX idx_group_code ON diagnostic_results(group_code);
