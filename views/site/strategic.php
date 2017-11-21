<?php $this->title = 'Strategic Diagram'; ?>

<link rel="stylesheet" href="../../web/css/main.css" type="text/css"/>
<link rel="stylesheet" href="../../web/css/menu.css" type="text/css"/>
<script defer="defer" src="https://code.highcharts.com/highcharts.js"></script>
<script defer="defer" src="https://code.highcharts.com/highcharts-more.js"></script>
<script defer="defer" src="../../web/js/param.js"></script>
<script defer="defer" src="../../web/js/timeSlider.js"></script>
<script defer="defer" src="../../web/js/filters/country.js"></script>
<script defer="defer" src="../../web/js/filters/threshold.js"></script>
<script defer="defer" src="../../web/js/filters/quarter.js"></script>
<script defer="defer" src="../../web/js/strategic.js"></script>

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
		<p style="margin-top: 20px;">Threshold</p>
		<div class="dropp">
			<div class="dropp-header">
				<span class="dropp-header__title" id="t_dropp_title"></span>
				<a href="#" class="dropp-header__btn js-dropp-action" id="js-dropp-action-2">
					<i class="icon"></i>
				</a>
			</div>
			<div class="dropp-body" id="threshold" style="overflow-y:auto">
				<a href="#" class="ui-icon">
					<label>Option 1
						<input type="radio" name="threshold" value="1"/>
					</label>
				</a>
				<div class="ch-drop" tag="1">
					<li class="cf">Co-occurrence(min): 1</li>
					<li class="cf">External-link(max): 2</li>
					<li class="cf">Internal-link(max): 2</li>
				</div>
				<a href="#" class="ui-icon">
					<label>Option 2
						<input type="radio" name="threshold" value="2"/>
					</label>
				</a>
				<div class="ch-drop" tag="1">
					<li class="cf">Co-occurrence(min): 2</li>
					<li class="cf">External-link(max): 3</li>
					<li class="cf">Internal-link(max): 3</li>
				</div>
				<a href="#" class="ui-icon">
					<label>Option 3
						<input type="radio" name="threshold" value="3"/>
					</label>
				</a>
				<div class="ch-drop" tag="1">
					<li class="cf">Co-occurrence(min): 5</li>
					<li class="cf">External-link(max): 5</li>
					<li class="cf">Internal-link(max): 8</li>
				</div>
				<a href="#" class="ui-icon">
					<label>Option 4
						<input type="radio" name="threshold" value="4"/>
					</label>
				</a>
				<div class="ch-drop" tag="1">
					<li class="cf">Co-occurrence(min): 8</li>
					<li class="cf">External-link(max): 5</li>
					<li class="cf">Internal-link(max): 8</li>
				</div>
				<a href="#" class="ui-icon">
					<label>Option 5
						<input type="radio" name="threshold" value="5"/>
					</label>
				</a>
				<div class="ch-drop" tag="1">
					<li class="cf">Co-occurrence(min): 15</li>
					<li class="cf">External-link(max): 8</li>
					<li class="cf">Internal-link(max): 12</li>
				</div>
			</div>
		</div>
		<p style="margin-top: 20px;">Quarter</p>
		<div class="dropp">
			<div class="dropp-header">
				<span class="dropp-header__title" id="q_dropp_title">All Quarters</span>
				<a href="#" class="dropp-header__btn js-dropp-action" id="js-dropp-action-3">
					<i class="icon"></i>
				</a>
			</div>
			<div class="dropp-body" id="quarter">
				<label>All Quarters
					<input type="radio" name="quarter" value="0"/>
				</label>
				<label>Quarter 1(upper right)
					<input type="radio" name="quarter" value="1"/>
				</label>
				<label>Quarter 2(lower right)
					<input type="radio" name="quarter" value="2"/>
				</label>
				<label>Quarter 3(lower left)
					<input type="radio" name="quarter" value="3"/>
				</label>
				<label>Quarter 4(upper left)
					<input type="radio" name="quarter" value="4"/>
				</label>
			</div>
		</div>		
	</div>
	<div id="page-wrapper">
		<div id="title-breadcrumb-option-demo" class="page-title-breadcrumb">
			<div class="page-header pull-left">
				<div class="page-title">Centrality and Density</div>
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