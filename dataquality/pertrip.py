#/usr/bin/python3
import pymysql
import datetime

red = "\033[1;38m"
green = "\033[1;32m"
end = "\033[1;m"


bikes = ["0587","0603","0636","0657","0665","0669","1210","1473","2910","3014","3215","3410","3469","4381","5233","5432","6089","6097","6473","6904","6994","7303","7459","7517","7710","8508","8664","8870","9050","9407","9519"]

today = datetime.datetime.now()
time1 = "2015-05-00 00:00:00"
time2 = str(today.year) + "-" + str(today.month) + "-" + str(today.day) + " 00:00:00"
biketrips = []

for IMEI in bikes:
    perbiketrips = {};
    perbiketrips["IMEI"] = IMEI
    exe = "SELECT id, start_time, end_time  FROM trip"+ IMEI +" WHERE start_time BETWEEN '"+ time1 + "' AND '"+ time2 + "'"
    connection = pymysql.connect(host='typhoon',
                             user='keshav',
                             passwd='typasswd123',
                             db='webike')
    cur = connection.cursor()
    cur.execute(exe)

    trips = []
    for row in cur.fetchall():
        trip = {'id' : row[0], 'ST' : row[1], 'ET' : row[2]}
        exe = "SELECT * FROM per_trip_each_minute_quality WHERE imei =" + str(int(IMEI))+ " AND id = " + str(trip['id'])
        cur.execute(exe)
        reading = [];
        minute = 4
        valid_reading = 5
        Start = trip['ST'].replace(second=0, microsecond=0)
        for row in cur.fetchall():
            if (row[valid_reading] == 0):
                reading.append({"t" : str(Start + datetime.timedelta(minutes=row[minute])), "v" : 0 })
            else:
                reading.append({"t" : str(Start + datetime.timedelta(minutes=row[minute])), "v" : 1 })
        trip["quality"] = reading
        trip["ST"] = str(trip["ST"])
        trip["ET"] = str(trip["ET"])
        trips.append(trip)
    perbiketrips["trips"] = trips
    biketrips.append(perbiketrips)

    cur.close()
    connection.close()
print(biketrips)