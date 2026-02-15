-- Generative Renewal Toolkit: Diagnostic Results
-- Run this against your Neon database to create the table

CREATE TABLE diagnostic_results (
  id SERIAL PRIMARY KEY,
  connection_score DECIMAL(3, 2) NOT NULL,
  values_score DECIMAL(3, 2) NOT NULL,
  imagination_score DECIMAL(3, 2) NOT NULL,
  coherence_score DECIMAL(3, 2) NOT NULL,
  user_agent TEXT,
  ip_address INET,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_completed_at ON diagnostic_results(completed_at);

-- Analytics view: aggregate patterns
CREATE VIEW diagnostic_analytics AS
SELECT
  COUNT(*) as total_assessments,
  AVG(connection_score) as avg_connection,
  AVG(values_score) as avg_values,
  AVG(imagination_score) as avg_imagination,
  AVG(coherence_score) as avg_coherence,
  MIN(completed_at) as first_assessment,
  MAX(completed_at) as last_assessment
FROM diagnostic_results;
