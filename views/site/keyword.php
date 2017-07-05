<?php
use yii\widgets\ActiveForm;
use kartik\slider\Slider;

$this->title = 'Connection graph';
?>

<script src="../../js/plot.js"></script>
<link href="../../css/plot.css" rel="stylesheet">

<div><svg id="graph" width="960" height="600"></svg></div>

<?php $form = ActiveForm::begin();?>

    <div style="margin-left: 15%;">
        <b class="badge" style="margin-right: 10px; float:left"> Jan </b>
        <?= $form->field($model, 'from_date')->widget(Slider::classname(), [
                'sliderColor' => Slider::TYPE_INFO,
                'options' => [
                    'width' => '1000px',
                    'float' => 'left',
                ],
                'pluginOptions' => [
                    'min'   => 01,
                    'max'   => 12,
                    'step'  => 1,
                    'range' => true,

                ],
                'pluginEvents' => [
                    'slideStop' => 'function() { graphVisualization(); }',
                ],
            ])->label(false);
        ?>
        <b class="badge" style="margin-left: 10px;"> Dec </b>
    </div>
<?php ActiveForm::end();?>

<script>graphVisualization();</script>

