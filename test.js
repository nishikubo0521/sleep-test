// WEVサーバー関連モジュール
express = require('express');
app = express();
http = require('http').Server(app);
io = require('socket.io')(http);


// port number
var port = process.env.PORT || 3000;

// ブラウザからのリクエストに関係なく動くnodejs上の処理
count = 0;
setInterval(function(){
	count ++;
	console.log('試行回数: ' + count);
}, 5000);


// サーバーの起動
console.log('稼働中...')
http.listen(port, function(){
  console.log('listening');
});


// ルーティング
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


// ソケット処理
io.on('connection', function(socket){

	// メッセージが来た時、そのメッセージをビューに返す。
	socket.on('chat message', function(msg){
		io.emit('chat message', msg + count );
	});
});
