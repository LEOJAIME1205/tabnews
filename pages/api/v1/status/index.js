import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();

  const isHealthy = await database.query("SELECT 1;");
  let databaseStatus;
  if (isHealthy) {
    databaseStatus = "healthy";
  } else {
    databaseStatus = "unhealthy";
  }

  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConnectionsValue = parseInt(
    databaseMaxConnectionsResult.rows[0].max_connections,
  );

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;

  const databaseVersionResult = await database.query("SHOW SERVER_VERSION;");

  response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        db_status: databaseStatus,
        max_connections: databaseMaxConnectionsValue,
        opened_connections: databaseOpenedConnectionsValue,
        version: databaseVersionResult.rows[0].server_version,
      },
    },
  });
}
export default status;
