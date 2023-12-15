## Simple calculator api

### Installation:

1. Clone the repository
2. Run `npm install`
3. Run `npm start`

OR

2. Run `docker-compose up`

### Usage:

1. Open `http://localhost:3000` in your browser (if running locally) or (if running in docker) `http://localhost:3009`
2. Access documentation at `http://localhost:3000/api` or (if running in docker) `http://localhost:3009/api`
3. There is no authentication required
4. The api call for evaluating math expressions is:

```
POST /api/calculate
{
    "expression": "1+1"
}
```
