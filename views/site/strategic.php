<?php $this->title = 'Strategic Diagram'; ?>

<script defer="defer" src="../../timeSlider.js"></script>
<script defer="defer" src="../../js/strategic.js"></script>

<div style="width: 800px; height: 400px; margin: 0 auto">
	<div id="container" style="width: 600px; height:400px; float: left"></div>
	<div style="width: 200px; height:400px; float: right">
		<div style="margin-top: 10px">
			<h>Country</h><br>
			<select id="country"></select>
		</div>
		<div style="margin-top: 90px">
			<form>
				<h>Co-occurrence</h><br>
				<input type="text" name="co" id="co" style="width : 115px"><br>
				<h>pass1link</h><br>
				<input type="text" name="ps1" id="ps1" style="width : 115px"><br>
				<h>pass2link</h><br>
				<input type="text" name="ps2" id="ps2" style="width : 115px"><br>
				<input type="submit" value="Submit">
			</form>
		</div>
	</div>
</div>
	
<div style="width: 800px; height:200px; margin: auto">
	<div id="time-range">
		<div class="sliders_step1">
			<div id="slider-range"></div>
		</div>
		
		<p style="width:50%; float:left; text-align:left;">Time Range: <span class="slider-time"></span><span class="slider-time2"></span></p>
		<p style="width:50%; float:left; text-align:right;">Zoom:  <input id="but1" type="button" value="1m"/><input id="but2" type="button" value="3m" /><input id="but3" type="button" value="6m" /><input id="but4" type="button" value="1y" /></p>
		
	</div>
</div>
