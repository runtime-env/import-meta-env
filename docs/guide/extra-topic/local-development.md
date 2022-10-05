# Local Development

In local development, for convenience, you can create a `.env.defaults` file in the project instead of manipulating environment variables in the system:

```ini
# Import-meta-env will only load `S3_BUCKET`'s value if you only defined it in the `.env.example` file.
S3_BUCKET="YOUR_S3_BUCKET"
SECRET_KEY="YOUR_SECRET_KEY_GOES_HERE"
```
