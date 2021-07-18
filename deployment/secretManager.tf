resource "aws_secretsmanager_secret" "lastSeenCredentials" {
  name                    = "lastSeenCredentials"
  recovery_window_in_days = 0
}

resource "aws_secretsmanager_secret_version" "sversion" {
  secret_id     = aws_secretsmanager_secret.lastSeenCredentials.id
  secret_string = jsonencode({
    REDIS_CLUSTER_HOST: aws_elasticache_replication_group.default.primary_endpoint_address
    REDIS_CLUSTER_PORT: var.REDIS_CLUSTER_PORT
    TMDB_API_KEY : var.TMDB_API_KEY
  })
}