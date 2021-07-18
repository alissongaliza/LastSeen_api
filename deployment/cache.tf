resource "aws_elasticache_subnet_group" "default" {
  name       = "${var.appname}-cache-subnet"
  subnet_ids = ["${aws_subnet.public_a.id}", "${aws_subnet.public_b.id}"]
}

resource "aws_elasticache_replication_group" "default" {
  replication_group_id          = "${var.appname}-cluster-default"
  replication_group_description = "replication group"
  node_type                     = "cache.t3.micro"
  parameter_group_name          = "default.redis6.x"
  engine_version                = "6.x"
  port                          = var.REDIS_CLUSTER_PORT
  subnet_group_name             = aws_elasticache_subnet_group.default.name
  availability_zones            = ["us-east-1a", "us-east-1b"]
  number_cache_clusters         = 2
  automatic_failover_enabled    = true
  security_group_ids            = [aws_security_group.security_group_lastseen.id]
}