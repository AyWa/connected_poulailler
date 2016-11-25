# !/usr/bin/python
import time
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)
GPIO.setup(18,GPIO.OUT)

dc =0
p = GPIO.PWM(18, 50)

p.start(7.5)
try:

	p.ChangeDutyCycle(7.5) #turn towards 90 degree
	time.sleep(1)
	p.ChangeDutyCycle(2.5) #0 degree
	time.sleep(1)
	p.ChangeDutyCycle(12.5) #180 degree
	time.sleep(1)
       # while 1:
       #         for fc in range(0, 101, 2):
       #                 p.ChangeDutyCycle(dc)
       #                 time.sleep(0.1)
       #         for dc in range(100, -1, -2):
       #                 p.ChangeDutyCycle(dc)
       #                 time.sleep(0.1)
except KeyboardInterrupt:
       # pass
	p.stop()
	GPIO.cleanup()
