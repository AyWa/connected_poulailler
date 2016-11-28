#!/usr/bin/python


# Import required Python libraries
import time
import RPi.GPIO as GPIO
import datetime
from pymongo import MongoClient
client = MongoClient()
client = MongoClient("mongodb://MarcAdmin:Poule@ds033285.mlab.com:33285/poule")
db = client.get_default_database()
users = db['users']
cursor = users.find_one({})
print cursor['profile']
print cursor['poule']
query = {'profile.lastName': 'Hurabielle'}
query_dec = {'profile.lastName': 'Hurabielle','poule.nombre_inside':{'$gt': 0 }}
query_inc = {'profile.lastName': 'Hurabielle','poule.nombre_inside':{'$lte': 2 }}
#from subprocess import call

# Use BCM GPIO references
# instead of physical pin numbers
GPIO.setmode(GPIO.BCM)

# A couple of variables Define GPIO to use on Pi ---------------------
GPIO_TRIGGER1 = 17
GPIO_ECHO1 = 27
GPIO_TRIGGER2 = 26
GPIO_ECHO2 = 19

EXIT = 0 # Infinite loop

lastdistance1 = 0.0
lastdistance2 = 0.0
sensitivity = 10 #sensitivity %


# Set pins as output and input
GPIO.setup(GPIO_TRIGGER1,GPIO.OUT)  # Trigger1
GPIO.setup(GPIO_ECHO1,GPIO.IN)      # Echo1
GPIO.setup(GPIO_TRIGGER2,GPIO.OUT)  # Trigger2
GPIO.setup(GPIO_ECHO2,GPIO.IN)      # Echo2

# Set trigger to False (Low)
GPIO.output(GPIO_TRIGGER1, False)
GPIO.output(GPIO_TRIGGER2, False)

# Allow module to settle
time.sleep(0.5)

# Send 10us pulse to trigger
def measure1():
  GPIO.output(GPIO_TRIGGER1, True)
  time.sleep(0.00001)
  GPIO.output(GPIO_TRIGGER1, False)
  start1 = time.time()

  while GPIO.input(GPIO_ECHO1)==0:
    start1 = time.time()

  while GPIO.input(GPIO_ECHO1)==1:
    stop1 = time.time()
  # Calculate pulse length
  elapsed1 = stop1-start1

  # Distance pulse travelled in that time is time
  # multiplied by the speed of sound (cm/s)
  distance1 = elapsed1 * 34300

  # That was the distance there and back so halve the value
  distance1 = distance1 / 2

  #print "Distance : %.1f" % distance
  return distance1

def measure_average1():
  count = 1
  # Reset GPIO settings GPIO.cleanup()
  distance1 = 0
  while ( count <= 3 ):
    distance1 = distance1 + measure1()
    time.sleep(0.1)
    count = count + 1
  distance1 = distance1 / 3
  return distance1

def measure2():
  GPIO.output(GPIO_TRIGGER2, True)
  time.sleep(0.00001)
  GPIO.output(GPIO_TRIGGER2, False)
  start1 = time.time()

  while GPIO.input(GPIO_ECHO2)==0:
    start2 = time.time()

  while GPIO.input(GPIO_ECHO2)==1:
    stop2 = time.time()
  # Calculate pulse length
  elapsed2 = stop2-start2

  # Distance pulse travelled in that time is time
  # multiplied by the speed of sound (cm/s)
  distance2 = elapsed2 * 34300

  # That was the distance there and back so halve the value
  distance2 = distance2 / 2

  #print "Distance : %.1f" % distance
  return distance2

def measure_average2():
  count = 1
  # Reset GPIO settings GPIO.cleanup()
  distance2 = 0
  while ( count <= 3 ):
    distance2 = distance2 + measure2()
    time.sleep(0.1)
    count = count + 1
  distance2 = distance2 / 3
  return distance2

try:
  # Never ending loop -----------------
  while EXIT == 0:
	distance1 = measure_average1()
    	distance2 = measure_average2()
	if lastdistance1 <> 0.0 and lastdistance2 <> 0.0:

		minDiff = 20.0 * (100 - sensitivity) / 100
		maxDiff = 20.0 * (100 + sensitivity) / 100
            	print "minDiff : %.1f" % minDiff
            	print "maxDiff : %.1f" % maxDiff
		if distance1 < minDiff or distance1 < maxDiff:
				time.sleep(1)
    	       			distance2 = measure_average2()
				if distance2 < minDiff or distance2 < maxDiff:
					print "ENTREEEEEEEEE"
                    			users.update(query_inc, {'$inc': {'poule.nombre_inside': +1}})

        		#t = datetime.datetime.now()
        		#timeStr = t.strftime('%Y%m%d-%H%M%S')
        		#call (["raspistill -o image_"+timeStr+".jpg -t 100"], shell=True)
        		#time.sleep(0.2)
      			#print "minDiff : %.1f" % minDiff
      			#print "maxDiff : %.1f" % maxDiff
		elif distance2 < minDiff or distance2 < maxDiff:
				time.sleep(1)
                		distance1 = measure_average1()
				if distance1 < minDiff or distance1 < maxDiff:
					print "SORTIEEEEEE"
			                users.find_and_modify(query_dec, {'$inc': {'poule.nombre_inside': -1}})


	print "****************************"
    	print "distance1 : %.1f" % distance1
    	print "last distance1 : %.1f" % lastdistance1

    	lastdistance1 = distance1
	print "distance2 : %.1f" % distance2
    	print "last distance2 : %.1f" % lastdistance2
	lastdistance2 = distance2
	print "****************************"
	cursor = users.find_one({})


except KeyboardInterrupt:
  # Reset GPIO settings
  GPIO.cleanup()
