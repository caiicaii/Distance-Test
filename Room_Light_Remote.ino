int value;

void setup()
{
  Serial.begin(9600);//Change the baud rate value depending on the default baud rate of your bluetooth module, for Bluesmirf-115200 and for JY-MCU-9600
  
  pinMode(2, OUTPUT);//Light1 pin
}

void loop()
{
 if(Serial.available())
  {
    value=Serial.read();
    Serial.println((int)value);
    
    if(value==49)//Turn Light1 ON
      digitalWrite(2,HIGH);

    else if (value==48)//Turn Light1 OFF
      digitalWrite(2,LOW);
  }
}
