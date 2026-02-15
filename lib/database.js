import { neon } from "@neondatabase/serverless";

function getClient() {
  return neon(process.env.POSTGRES_URL);
}

export async function saveDiagnosticResult({ connectionScore, valuesScore, imaginationScore, coherenceScore, groupCode, userAgent, ipAddress }) {
  const sql = getClient();
  const result = await sql`
    INSERT INTO diagnostic_results (connection_score, values_score, imagination_score, coherence_score, group_code, user_agent, ip_address)
    VALUES (${connectionScore}, ${valuesScore}, ${imaginationScore}, ${coherenceScore}, ${groupCode || null}, ${userAgent}, ${ipAddress})
    RETURNING id, completed_at
  `;
  return result[0];
}

export async function getAnalytics(filters = {}) {
  const sql = getClient();
  const { groupCode, dateFrom, dateTo } = filters;

  const conditions = [];
  const params = [];

  if (groupCode) {
    conditions.push(`group_code = $${params.length + 1}`);
    params.push(groupCode);
  }
  if (dateFrom) {
    conditions.push(`completed_at >= $${params.length + 1}`);
    params.push(dateFrom);
  }
  if (dateTo) {
    conditions.push(`completed_at <= $${params.length + 1}`);
    params.push(dateTo + "T23:59:59.999Z");
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";

  const result = await sql.query(
    `SELECT
      COUNT(*)::int as total_assessments,
      ROUND(AVG(connection_score), 2) as avg_connection,
      ROUND(AVG(values_score), 2) as avg_values,
      ROUND(AVG(imagination_score), 2) as avg_imagination,
      ROUND(AVG(coherence_score), 2) as avg_coherence,
      MIN(completed_at) as first_assessment,
      MAX(completed_at) as last_assessment
    FROM diagnostic_results
    ${where}`,
    params
  );
  return result[0];
}

export async function getRecentResults(limit = 50, filters = {}) {
  const sql = getClient();
  const { groupCode, dateFrom, dateTo } = filters;

  const conditions = [];
  const params = [];

  if (groupCode) {
    conditions.push(`group_code = $${params.length + 1}`);
    params.push(groupCode);
  }
  if (dateFrom) {
    conditions.push(`completed_at >= $${params.length + 1}`);
    params.push(dateFrom);
  }
  if (dateTo) {
    conditions.push(`completed_at <= $${params.length + 1}`);
    params.push(dateTo + "T23:59:59.999Z");
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  params.push(limit);

  return sql.query(
    `SELECT
      id,
      connection_score,
      values_score,
      imagination_score,
      coherence_score,
      group_code,
      LEFT(user_agent, 100) as user_agent,
      completed_at
    FROM diagnostic_results
    ${where}
    ORDER BY completed_at DESC
    LIMIT $${params.length}`,
    params
  );
}

export async function getDistinctGroupCodes() {
  const sql = getClient();
  return sql`
    SELECT DISTINCT group_code
    FROM diagnostic_results
    WHERE group_code IS NOT NULL AND group_code != ''
    ORDER BY group_code
  `;
}
