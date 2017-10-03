<?php $this->title = 'Occurrence Diagram'; ?>

<link rel="stylesheet" href="../../web/css/main.css" type="text/css"/>
<script defer="defer" src="https://code.highcharts.com/highcharts.js"></script>
<script defer="defer" src="../../web/js/param.js"></script>
<script defer="defer" src="../../web/js/timeSlider.js"></script>
<script defer="defer" src="../../web/js/filters/country.js"></script>
<script defer="defer" src="../../web/js/occurrence.js"></script>

<div id="wrapper">
	<div id="sidebar">
		<p style="margin-top: 20px;">Country</p>
		<div class="dropp">
			<div class="dropp-header">
				<span class="dropp-header__title" id="c_dropp_title"></span>
				<a href="#" class="dropp-header__btn js-dropp-action" id="js-dropp-action-1">
					<i class="icon"></i>
				</a>
			</div>
			<div class="dropp-body" id="country" style="overflow-y:auto"></div>
		</div>
	</div>
	<div id="page-wrapper">
		<div id="title-breadcrumb-option-demo" class="page-title-breadcrumb">
			<div class="page-header pull-left">
				<div class="page-title">Skill Occurrence</div>
			</div>
			<div class="breadcrumb page-breadcrumb pull-right">
				<div class="page-subtitle" id="subtitle"></div>
			</div>
		</div>
		<div class="page-content">
			<div id="container"></div>
		</div>
		<div class="footer">
			<div id="time-range" style="width: 80%; margin-left: 10%; margin-bottom: 20px">
				<div class="sliders_step1">
					<div id="slider-range"></div>
				</div>
			</div>
			<div class="text">
				<p class="pull-left">
					Time Range:
					<span class="slider-time"></span>
					<span class="slider-time2"></span>
				</p>
				<p class="pull-right">
					Zoom:
					<input id="but1" type="button" value="1m"/>
					<input id="but2" type="button" value="3m" />
					<input id="but3" type="button" value="6m" />
					<input id="but4" type="button" value="12m" />
				</p>
			</div>
		</div>
	</div>
</div>

