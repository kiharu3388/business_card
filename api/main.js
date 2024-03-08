// webカメラを起動する

const userMedia = {video: {facingMode: "environment"}};
navigator.mediaDevices.getUserMedia(userMedia).then((stream)=>{
	video.srcObject = stream;
	video.setAttribute("playsinline", true);
	video.play();
	startTick();
});

// キャンバスに描画する

function startTick(){
	msg.innerText = "Loading video...";
	if(video.readyState === video.HAVE_ENOUGH_DATA){
		canvas.height = video.videoHeight;
		canvas.width = video.videoWidth;
		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
		// このタイミングでQRコードを判定します
	}
	setTimeout(startTick, 250);
}

//QRコード判定
window.onload = (e)=>{

	let video  = document.createElement("video");
	let canvas = document.getElementById("canvas");
	let ctx    = canvas.getContext("2d");
	let msg    = document.getElementById("msg");

	const userMedia = {video: {facingMode: "environment"}};
	navigator.mediaDevices.getUserMedia(userMedia).then((stream)=>{
		video.srcObject = stream;
		video.setAttribute("playsinline", true);
		video.play();
		startTick();
	});

	function drawRect(location){
		drawLine(location.topLeftCorner,     location.topRightCorner);
		drawLine(location.topRightCorner,    location.bottomRightCorner);
		drawLine(location.bottomRightCorner, location.bottomLeftCorner);
		drawLine(location.bottomLeftCorner,  location.topLeftCorner);
	}

	function drawLine(begin, end){
		ctx.lineWidth = 4;
		ctx.strokeStyle = "#FF3B58";
		ctx.beginPath();
		ctx.moveTo(begin.x, begin.y);
		ctx.lineTo(end.x, end.y);
		ctx.stroke();
	}

	function startTick() {
		msg.innerText = "Loading video...";
		if (video.readyState === video.HAVE_ENOUGH_DATA) {
			canvas.height = video.videoHeight;
			canvas.width = video.videoWidth;
			ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
			let img = ctx.getImageData(0, 0, canvas.width, canvas.height);
			let code = jsQR(img.data, img.width, img.height, { inversionAttempts: "dontInvert" });
			if (code) {
				drawRect(code.location); // Rect
				msg.innerText = code.data;
				fetch('camera_process.php', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ qrData: code.data }),
				}).then(response => {
					if (response.ok) {
						console.log('QRコードデータをサーバーに送信しました。');
						window.location.href = "addFriends_process.php";
					} else {
						console.error('サーバーへのデータ送信中にエラーが発生しました。');
					}
				}).catch(error => {
					console.error('データ送信中にエラーが発生しました:', error);
				});
				return;
			} else {
				msg.innerText = "Detecting QR-Code...";
			}
		}
		setTimeout(startTick, 250);
	}
}