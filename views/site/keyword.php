<?php

use yii\widgets\ActiveForm;

$this->title = 'TOBIE Visualisation';
?>

<script src="http://d3js.org/d3.v4.min.js"></script>
<script src="/js/plot.js"></script>
<link href="/css/plot.css" rel="stylesheet">

<div style="float:left">
    <svg id="graph" width="960" height="600"></svg>
</div>

<?php $form = ActiveForm::begin();?>
<?php ActiveForm::end();?>


