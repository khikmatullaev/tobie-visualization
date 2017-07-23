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
			<form>
				<span title="Minimal co-occurrence: &#10;connections will be elimated if the co-occurrence is less than this threshold"><label>co-occurrence</label></span><br>
				<input type="text" name="co" id="co" style="width : 115px" value=0><br>
				<span title="Maximal internal links: &#10;for one cluster, it has connections inside this cluster no more than this threshold"><label>pass1link</label></span><br>
				<input type="text" name="ps1" id="ps1" style="width : 115px" value=10><br>
				<span title="Maximal external links: &#10;for one cluster, it has connections with other cluster no more than this threshold"><label>pass2link</label></span><br>
				<input type="text" name="ps2" id="ps2" style="width : 115px" value=10><br><br>
				<input type="button" value="submit" id="submit">
			</form>
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