#!/usr/bin/python
#+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
#|R|a|s|p|b|e|r|r|y|P|i|-|S|p|y|.|c|o|.|u|k|
#+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
#
# ultrasonic_1.py
# Measure distance using an ultrasonic module
#
# Author : Matt Hawkins
# Date   : 09/01/2013

# Import required Python libraries
import time
import RPi.GPIO as GPIO

# Use BCM GPIO references
# instead of physical pin numbers
GPIO.setmode(GPIO.BCM)

# Define GPIO to use on Pi
GPIO_TRIGGER1 = 23
GPIO_ECHO1 = 24
GPIO_TRIGGER2 = 27
GPIO_ECHO2 = 22


print ("Ultrasonic Measurement")

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

# Send 10us pulse to trigger
GPIO.output(GPIO_TRIGGER2, True)
time.sleep(0.00001)
GPIO.output(GPIO_TRIGGER2, False)

start2 = time.time()
while GPIO.input(GPIO_ECHO2)==0:
  start2 = time.time()

while GPIO.input(GPIO_ECHO2)==1:
  stop2 = time.time()

# Calculate pulse length
elapsed2 = stop2-start2

# Distance pulse travelled in that time is time
# multiplied by the speed of sound (cm/s)
distance1 = elapsed1 * 34000
distance2 = elapsed2 * 34000

# That was the distance there and back so halve the value
distance1 = distance1 / 2
distance2 = distance2 / 2

print ("Distance1 : %.1f" % distance1)
print ("Distance2 : %.1f" % distance2)

# Reset GPIO settings
GPIO.cleanup()