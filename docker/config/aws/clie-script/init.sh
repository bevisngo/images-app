#!/bin/bash

# Chờ LocalStack khởi động
sleep 5

# Tạo bucket
aws --endpoint-url=http://localstack:4566 s3 mb s3://post-images

# Thiết lập CORS cho bucket
aws --endpoint-url=http://localstack:4566 s3api put-bucket-cors --bucket post-images --cors-configuration '{
    "CORSRules": [
        {
            "AllowedHeaders": ["*"],
            "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
            "AllowedOrigins": ["*"],
            "ExposeHeaders": ["x-amz-server-side-encryption", "x-amz-request-id", "x-amz-id-2"],
            "MaxAgeSeconds": 3000
        }
    ]
}'

# Thiết lập chính sách bucket
aws --endpoint-url=http://localstack:4566 s3api put-bucket-policy --bucket post-images --policy '{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::post-images/*"
        }
    ]
}'
