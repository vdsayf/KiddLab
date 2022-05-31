#database_url = mysql://[redacted]
#table_name = FlatEarth1

import mysql.connector

connection = mysql.connector.connect(host = "localhost", user = "redacted" , passwd = "redacted", database = "mTurk")
cursor = connection.cursor()
cursor.execute("SELECT * FROM BoredEngaged")
results = cursor.fetchall()

scrapeHeaders = True
output = []
null = None

# For each participant with data...
for r in results:
    if (r[len(r) - 1]):
        dictionary = eval(r[len(r) - 1].encode("ascii", "ignore"))
        trial = dictionary["data"]

        # Scrape headers once
        #if scrapeHeaders:
            #header = ["workerId"]
            #header.extend(dictionary["data"][0]["trialdata"])
            #output.append(", ".join(map(str, header)))
            #scrapeHeaders = False

        for t in trial:
            #print t["trialdata"]
            #out = [dictionary["workerId"], dictionary["condition"]]
            out = [dictionary["workerId"]]

            #for key in t["trialdata"]:
            #print key
            #t["trialdata"][key] = t["trialdata"][key].replace("\n", "  ")

            #out.extend(t["trialdata"].values()
            out.extend(t["trialdata"])
            output.append(", ".join(map(str, out)))
    else:
        print "Skipping participant with no data"

with open("data.csv", 'w') as f:
    f.write('\n'.join(output))
    f.close()
