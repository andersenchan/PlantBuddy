# communicate between the pi and the arduino

from subprocess import call

import time
import smbus
import requests
import json

# TODO: put this in a onstants file
# Constants 
bus = smbus.SMBus(1)
address = 0x04 # address of the arduino pin
host = "http://cslinux.utm.utoronto.ca";
port = 10689
plantID = 1
interval = 1
threshold = 10

def writeNumber(value):
    bus.write_byte(address, value)
    return -1

def readNumber():
    number = bus.read_byte(address)
    return number

# 1 is temp
# 2 is humidity
# 3 is moisture
def readData(type):
    writeNumber(type)
    time.sleep(1)
    response = readNumber() # this is the value the arduino responds with
    
    return response

if __name__ == '__main__':
    while True:
        
        # Read values from arduino
        try:
            temp = readData(1)
            humidity = readData(2)
            moisture = readData(3)
        except OSError:
            print("OSError caught!")
            continue
        except IOError:
            print("IOError caught!")
            continue
        except BaseException as error:
            print("An exception occured: {}".format(error))
        
        water = 0
        try:
          # Update the database
            link_for_push = host + ":" + str(port) + "/api/updateHistory"
            push = requests.put(
                url=link_for_push, 
                data={"id":plantID, "temp":temp, "humidity":humidity, "moisture":moisture})
            print("pushed " + str(temp) + " " + str(humidity) + " " + str(moisture) + " to plant " + str(plantID))


          # Read from database and turn on the pump if watering is on
            link_for_water = host + ":" + str(port) + "/api/getState?id=" + str(plantID)
            json_water = requests.get(link_for_water)
            water = json_water.json()['state'][0]

            link_for_threshold = host + ":" + str(port) + "/api/getThreshold?id=" + str(plantID)
            json_threshold = requests.get(link_for_threshold)
            threshold = json_threshold.json()['moisture'][0]['optMoisture']

        
        except BaseException as error:
            print("An exception occured: {}".format(error))
        
        waterCommand = 0

        if (moisture < threshold):
            water = 1 # "Moisture too low!"

        if (water):
            waterCommand = 7 #rework thhis logic
        else:
            waterCommand = 8

        try:
            writeNumber(waterCommand)
        except OSError:
            print("Caught OSError!")
            continue
        except IOError:
            print("Caught IOError!")
            continue
        except BaseException as error:
            print("An exception occured: {}".format(error))

        time.sleep(interval)

    




