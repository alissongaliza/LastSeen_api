variable "aws_region" {
  type        = string
  default     = "us-east-1"
  description = "aws region"
}

variable "appname" {
  type        = string
  default     = "lastseen"
  description = "Application name"
}

variable "REDIS_CLUSTER_PORT" {
  type        = string
  description = "Redis cluster primary port"
  sensitive = true
}

variable "TMDB_API_KEY" {
  type        = string
  description = "The movie database API key"
  sensitive = true
}

variable "ecr_image_uri" {
  type        = string
  description = "ECR image uri"
  sensitive = true
}