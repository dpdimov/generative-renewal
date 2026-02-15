import { neon } from "@neondatabase/serverless";

function getClient() {
  return neon(process.env.POSTGRES_URL);
}

export async function saveDiagnosticResult({ connectionScore, valuesScore, imaginationScore, coherenceScore, userAgent, ipAddress }) {
  const sql = getClient();
  const result = await sql`
    INSERT INTO diagnostic_results (connection_score, values_score, imagination_score, coherence_score, user_agent, ip_address)
    VALUES (${connectionScore}, ${valuesScore}, ${imaginationScore}, ${coherenceScore}, ${userAgent}, ${ipAddress})
    RETURNING id, completed_at
  `;
  return result[0];
}
