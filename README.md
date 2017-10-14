# Tor map
This small project shows the geolocation of may tor servers in 2015. Basically, I crawled the tor network to 
get always a new IP and stored them in a file (different project). Anyhow, I though it would be cool
to show on a map were most of the network is located. So here we go

## Run locally
To compute the json data run 
```python
python ip2latlngJson.py 

```
to see in on the map
```bash
cd viewer
 python -m SimpleHTTPServer 8000
```