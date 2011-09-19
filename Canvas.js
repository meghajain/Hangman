var Canvas = function(canvas) {
	this.canvas = canvas;
	if (canvas.getContext) {
		this.context = canvas.getContext("2d");
	}
	canvas.onmousedown = function() {
		return false;
	};
};

Canvas.prototype = {
	canvas: null,
	context: null
};

Canvas.prototype.isEnabled = function() {
	return this.context != null;
};

Canvas.prototype.clearAll = function() {
	this.context.clearRect(0, 0, 250, 250);
};

Canvas.prototype.drawHead = function() {
	this.context.save();
	this.context.translate(125, 50);
	this.drawCircle(20);
	this.context.restore();
};

Canvas.prototype.drawBody = function() {
	this.context.save();
	this.context.translate(125, 70);
	this.drawLine(80);
	this.context.restore();
}

Canvas.prototype.drawRightArm = function() {
	this.context.save();
	this.context.translate(125, 95);
	this.context.rotate(135 * Math.PI / 180);
	this.drawLine(45);
	this.context.restore();
};

Canvas.prototype.drawLeftArm = function() {
	this.context.save();
	this.context.translate(125, 95);
	this.context.rotate(225 * Math.PI / 180);
	this.drawLine(45);
	this.context.restore();
};

Canvas.prototype.drawRightLeg = function() {
	this.context.save();
	this.context.translate(125, 150);
	this.context.rotate(45 * Math.PI / 180);
	this.drawLine(55);
	this.context.restore();
};

Canvas.prototype.drawLeftLeg = function() {
	this.context.save();
	this.context.translate(125, 150);
	this.context.rotate(-45 * Math.PI / 180);
	this.drawLine(55);
	this.context.restore();
};

Canvas.prototype.drawHanger = function() {
	this.context.save();
	this.context.translate(20, 10);
	this.context.lineWidth = 4;
	this.context.strokeStyle = '#663300';
	this.drawLine(240);

	this.context.translate(105, 0);
	this.drawLine(20);

	this.context.translate(-105, 0);
	this.context.rotate(-90 * Math.PI / 180);
	this.drawLine(105);
	this.context.rotate(90 * Math.PI / 180);

	this.context.translate(-20, 240);
	this.context.rotate(-90 * Math.PI / 180);
	this.drawLine(40);
	this.context.rotate(90 * Math.PI / 180);

	this.context.translate(20, -20);
	this.context.rotate(-45 * Math.PI / 180);
	this.drawLine(28.3);
	this.context.rotate(45 * Math.PI / 180);

	this.context.rotate(45 * Math.PI / 180);
	this.drawLine(28.3);
	this.context.rotate(-45 * Math.PI / 180);

	this.context.translate(0, -200);
	this.context.rotate(225 * Math.PI / 180);
	this.drawLine(28.3);
	this.context.rotate(-225 * Math.PI / 180);

	this.context.restore();
};

Canvas.prototype.drawHappyFace = function() {
	this.context.save();
	this.context.translate(117, 44);
	this.drawCircle();
	this.context.translate(15, 0);
	this.drawCircle();
	this.context.translate(-7, 9);
	this.drawArc(10, 165 * Math.PI / 180, 15 * Math.PI / 180);
	this.context.restore();
};

Canvas.prototype.drawDeadFace = function() {
	this.context.save();
	this.context.font = "bold 10px sans-serif";
	this.context.translate(114, 46);
	this.drawText("x");
	this.context.translate(16, 0);
	this.drawText("x");
	this.context.translate(-8, 16);
	this.drawText("x");
	this.context.restore();
};

Canvas.prototype.drawLine = function(length) {
	if (!length) {
		length = 10;
	}
	this.context.beginPath();
	this.context.moveTo(0, 0);
	this.context.lineTo(0, length);
	this.context.closePath();
	this.context.stroke();
};

Canvas.prototype.drawCircle = function(radius) {
	this.drawArc(radius, 0, Math.PI * 2);
};

Canvas.prototype.drawArc = function(radius, beginAngle, endAngle) {
	if (!radius) {
		radius = 1;
	}
	if (!beginAngle) {
		beginAngle = 0;
	}
	if (!endAngle) {
		endAngle = Math.PI * 2;
	}
	this.context.beginPath();
	this.context.arc(0, 0, radius, beginAngle, endAngle, true);
	this.context.stroke();
};

Canvas.prototype.drawText = function(text) {
	this.context.fillText(text, 0, 0);
};
