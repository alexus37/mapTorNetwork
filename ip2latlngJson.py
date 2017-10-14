#!/usr/bin/env python
import json
import numpy as np
import urllib2
from tqdm import tqdm
import json

filenames=["20151106.npy",  "20151108.npy",  "20151110.npy",  "20151112.npy",  "20151115.npy", "20151107.npy",  "20151109.npy",  "20151111.npy",  "20151114.npy"]
api="http://freegeoip.net/json/"
def loadAllData():
    allIps = []
    for f in filenames:
        ips = np.load("data/" + f)
        allIps += ips.tolist()

    return list(set(allIps))

def getGeocoding(allIps):
    geocodedIps = []
    print(allIps)

    for ip in tqdm(allIps):
        try:
           geocodedIps.append(json.loads(urllib2.urlopen(api + ip).read()))
        except urllib2.HTTPError, err:
           if err.code == 404:
               print "Page not found!"
           elif err.code == 403:
               print "Access denied!"
           else:
               print "Something happened! Error code", err.code
        except urllib2.URLError, err:
            print "Some other error happened:", err.reason
        

    return geocodedIps


def main():
    allIps = loadAllData()
    geocodedIps = getGeocoding(allIps)
    with open('geocodedIps.json', 'w') as outfile:
        json.dump(geocodedIps, outfile)



if __name__ == "__main__":
    main()