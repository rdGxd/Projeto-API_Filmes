#!/usr/bin/env bash

# Test review creation
curl -X POST http://localhost:3001/review \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "movieId": "550e8400-e29b-41d4-a716-446655440000",
    "rating": 8.5,
    "comment": "This is a test comment for the movie review"
  }' \
  -v
