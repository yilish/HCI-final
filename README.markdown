### Introduction

**The shy birds** is a web-3D voice assistant project based on **Three-JS** and Tweenmax, which allows users to chat with three birds with dialogs and certain commands just like asking the weather forecast or making phone calls, or just moving the mouse or finger to make the three shy birds staring at your finger. 

Three-JS is an elegant and light 3D engine, which enables our project to be cross-platform and low hashrate-required. The custom 3D engines like u3d or unreal ask users to  possess an expensive graphic hardware. Unlike those custom engines, Three-JS allows users to have a  fresh and cool experience.

The reason why we developed such a voice assistant project is that we found our previous ASR system or certain commercial ASR systems are lack of other kinds of interaction and visual patterns. They pay too much attention to the accuracy of their deep learning models, and the power consuming of listening to users' voice or their intelligence to do certain commands, but they ignored that many users original requirement of using ASR is for easing their personal emotion. Maybe they are too stressed or lonely, or they have a lot of stories to share but they have no soul mates to talk with. Then, these birds we created may help. Just clicking and talking, these three birds will accompany you and chat about everything you want.



### Development Environment

- **Development Environment:** ```Win 10```

- **Development Software:**

  ​	**WebStorm** *2020.3.3*

- **Development Language:**

  ``` HTML```

  ``` Javascript```

- **Mainly Reference Count:**

  1. three.js
  2. Node.js
  3. annyang.js

- **Others:**

  Use some **third-party api** : 

  - https://devapi.qweather.com/v7/weather/3d?location=101020500&key=xxx
  - http://www.tuling123.com/openapi/api
  - http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=7&text=xxx
  - https://api.uomg.com/api/rand.music?sort=热歌榜&format=json



### Directory structure

```
 root folder  
      │
      └───build
      |   │───gulpfile.js
      |   │───util.js
      |
      └───src
      |   │───asr.js
      |   │───index.partial.html
      |   │───index.template.html
      |   │───script.js
      |   │───style.css
      |        │────function
      |              │────chat.js
      |              │────randomMusic.js
      | .gitignore
      | license.txt
      | package.json
      | package-lock.json
      | README.markdown
      |
```





### How to run

Method 1：Direct access

Web direct access：https://1850061.github.io/memory-manage/



Method 2：Local operation

This project depends on ```NPM```. Please make sure node.js is installed in the environment before running

1. The command line window enters the root directory of the project file

2. Running following command in the root directory

   ```
   npm install
   ```

   Download the packages that the project depends on

3. Running following command in the root directory

  ```
npm run serve
  ```

You can deploy the project's web pages locally. After completion, the project can be tested in the browser according to the prompt of the command line interface. It runs on the computer [8080 port](http://localhost:8080/) by default  

4.  Since annyang requires VPN to access, and some APIs (such as Netease Cloud API, which can only be accessed by domestic network), it is recommended to open the VPN PAC mode  when running the project.
