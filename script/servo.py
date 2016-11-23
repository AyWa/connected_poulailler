# !/usr/bin/python
import time
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)
GPIO.setup(17,GPIO.OUT)

dc =0
p = GPIO.PWM(17, 50)

p.start(0)
try:
        while 1:
                for fc in range(0, 101, 2):
                        p.ChangeDutyCycle(dc)
                        time.sleep(0.1)
                for dc in range(100, -1, -2):
                        p.ChangeDutyCycle(dc)
                        time.sleep(0.1)
except KeyboardInterrupt:
        pass
p.stop()
GPIO.cleanup()
