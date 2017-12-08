# Audit

## Run

1. `npm install`
2. `npm start`

### Test result
curl http://localhost:3000/api/v1/audits

## Test

1. `npm install -g mocha@2.3.1`
2. `npm test`

## Docker

Mongo:
```
docker run -d -p 27017:27017 --name audit-db mongo:3.2.7
```
Audit:
```
docker build -t <repo>:<tag> .
docker run -p 3000:3000 --link audit-db -d <repo>:<tag>
```

## Environments

1. development
2. test
3. staging
4. production

##### Example

```
docker run -p 3000:3000 --link audit-db -d -e "NODE_ENV=staging" <repo>:<tag>
```
