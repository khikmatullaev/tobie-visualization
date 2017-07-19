<script type="text/javascript" src="https://d3js.org/d3.v4.min.js"></script>
<script src="/js/keyword.js"></script>
<script defer="defer" src="../../js/range.js"></script>
<link href="/css/keyword.css" rel="stylesheet">

<?php $this->title = 'Connection graph'; ?>

<div style="width: 800px; height:500px; margin: auto">
    <div> Occurence threshold<br>
        <div style="float: left;">0</div>
        <div><input type="range" id="thersholdSlider" name="points" value=0 min="0" max="10" onchange="threshold(this.value)"></div>
        <div>5</div>
    </div>
    <div><svg id="graph" width="800" height="500"></svg></div>
    <div id="slider-time-range-container">
        <div class="sliders_step1">
            <div id="slider-time-range"></div>
        </div>

        <p style="width:50%; float:left; text-align:left;">
            Time Range:
            <span id="slider-time-begin" class="slider-time-begin">Jan,2016</span>
            <span id="slider-time-end" class="slider-time-end"></span>
        </p>
        <p style="width:50%; float:left; text-align:right;">
            Zoom:
            <input id="button1" type="button" value="1m"/>
            <input id="button3" type="button" value="3m" />
            <input id="button6" type="button" value="6m" />
            <input id="button12" type="button" value="12m" />
        </p>
    </div>
</div>


