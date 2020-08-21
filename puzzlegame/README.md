# PuzzleGame

## 遊び方
### 起動
1. index.html を Firefox や Google Chrome などのブラウザで開く．

### 操作方法
|      key       |     action     |
|:--------------:|:--------------:|
| **a** or **h** |      left      |
| **s** or **j** |      down      |
| **w** or **k** |       up       |
| **d** or **l** |      right     |
| **i**          |      fill      |
| **x**          |        X       |

## ファイルの説明
### css
見た目を定義する．

### map
map にはサイズごとのファイルが定義されている．

### script->AddElement.js
DOM を変更するためのスクリプト．

### script->Init.js
セルの初期化を行う．

### script->Move.js
操作と判定，クリア後のイベントを指定．

### script->Main.js
Init.js と Draw.js を実行する．

## 編集方法
見た目を編集する場合は main.css を編集する．動作の編集は script 内のファイルを編集．  
プログラムは JavaScript だけで書いているため，コンパイルせずにブラウザをリロードするだけで変更が反映されます．
