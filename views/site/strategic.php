<?php $this->title = 'Strategic Diagram'; ?>

<html>
<head>
<script defer="defer" src="../../timeSlider.js"></script>
<script defer="defer" src="../../js/strategic.js"></script>
</head>
<body>
<div style="width: 800px; height: 400px; margin: 0 auto">
	<div id="container" style="width: 600px; height:400px; float: left"></div>
	<div style="width: 190px; height:400px; float: right">
		<div style="margin-top: 10px">
			<label>Country</label><br>
			<select id="country"></select>
		</div>
		<div style="margin-top: 50px">
			<label>Threshold</label><br>
			<select id="threshold"></select>
		</div>
	</div>
</div>
	
<div style="width: 600px; height:200px; margin: auto">
	<div id="time-range">
		<div class="sliders_step1">
			<div id="slider-range"></div>
		</div>
		
		<p style="width:50%; float:left; text-align:left;">Time Range: <span class="slider-time"></span><span class="slider-time2"></span></p>
		<p style="width:50%; float:left; text-align:right;">Zoom:  <input id="but1" type="button" value="1m"/><input id="but2" type="button" value="3m" /><input id="but3" type="button" value="6m" /><input id="but4" type="button" value="1y" /></p>
		
	</div>
</div>
</body>
</html>