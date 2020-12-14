## Gyro STG
### 説明
大学の講義で制作した課題のゲームです。  
コントローラとゲームの両方をグループで制作しました。  
担当はゲームとコントローラー（全部）のプログラムです。

### 詳細
- GitHub：[https://github.com/TomSuzuki/Arduino_Game](https://github.com/TomSuzuki/Arduino_Game)
- 制作時期： 2020/01
- 言語： Arduino など

### 画像
![STG](./img/2020-01_Gyro%20STG/9578.jpg)
![STG](./img/2020-01_Gyro%20STG/9581.jpg)

### プログラムの一部
```
#include "Arduino.h"

class LEDX {

	private:
	int pin = 0;

	public:
	LEDX();
	void setup(int pin);
	void set(bool b);
};

LEDX::LEDX(){
}

void LEDX::setup(int _pin) {
	pin = _pin;
	pinMode(pin, OUTPUT);
	digitalWrite(pin, LOW);
}

void LEDX::set(bool b) {
	digitalWrite(pin, b ? HIGH : LOW);
}
```
LEDを簡単に点けたり消したりするためのプログラムです。各電子パーツは独立したファイル、プログラムで動いており、コントローラの調整や昨日の追加がやりやすくなるように工夫をしました。  
> 上のプログラムでは、最初にLEDのピンを設定すると、set関数でtrue, falseを指定するだけでLEDの制御を行うことができます（詳しくはGitHubを見てください）。これにより、Arduinoで制御するピンの場所が変わってもプログラムの書き換えをほとんど行わずに制御することができました。

