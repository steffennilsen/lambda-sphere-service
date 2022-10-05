`docker run --rm -p 8080:8080 --name lss lambda-sphere-service:latest`

```bash
aws lambda invoke \
--region eu-north-1 \
--endpoint http://localhost:8080 \
--no-sign-request \
--function-name function \
--cli-binary-format raw-in-base64-out \
--payload '{"queryStringParameters": {"url":"https://icanhazip.com/"}}' output.txt
```

```bash
node -e "console.log(require('./app.js').handler({queryStringParameters: {\"url\": \"https://icanhazip.com/\"}}))"
```