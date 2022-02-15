# node-threads-test

## Requirements

- `git`
- `docker`
- `docker-compose`
- `make`

## Run

```bash
# Install deps
make install

# Run the web server
make start

# Run the stress test (don't close the web server)
# This will take about 1 or 2 minutes, depending on your CPU.
make stress-test
```
