resource "aws_ecr_repository" "ecr_repo" {
  name = "ecr_${var.appname}_repo"
}