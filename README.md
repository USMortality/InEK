# Install
```
brew install nvm docker
nvm use stable
npm i
```

# Run InEK Extraction
Download from InEK:
```
node index.js
```

Parse all XLSX files into a single CSV:
```
node parse.js
```

# Import into DB
```
docker run --name db -e MYSQL_ALLOW_EMPTY_PASSWORD=true -d -p 3306:3306 mariadb:latest --secure-file-priv=""

./import_csv.sh data.csv inek
```

# Generated Queries from:
https://docs.google.com/spreadsheets/d/1um4KVTIK-fo98GlERS1XOFOzhrwmA2K6Hi7fulpiSXw/edit#gid=0
