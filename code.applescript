-- ターミナルのカレントディレクトリを取得してVSCodeで開く
do shell script "open -a 'Visual Studio Code' " & quoted form of (do shell script "pwd")