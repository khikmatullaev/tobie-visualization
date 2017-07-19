<?php
use yii\widgets\ActiveForm;
use kartik\date\DatePicker;

$this->title = "Adding"
?>

<?php $form = ActiveForm::begin(['options' => ['enctype' => 'multipart/form-data']]) ?>

    <?= DatePicker::widget([
        'model' => $model,
        'attribute' => 'from_date',
        'options' => ['placeholder' => 'Start date'],
        'type' => DatePicker::TYPE_COMPONENT_PREPEND,
        'form' => $form,
        'pluginOptions' => [
            'format' => 'yyyy/mm/01',
            'autoclose' => true,
            'minViewMode' => 1,
        ]
    ]);;?>

    <?= DatePicker::widget([
        'model' => $model,
        'attribute' => 'to_date',
        'options' => ['placeholder' => 'Start date'],
        'type' => DatePicker::TYPE_COMPONENT_PREPEND,
        'form' => $form,
        'pluginOptions' => [
            'format' => 'yyyy/mm/01',
            'autoclose' => true,
            'minViewMode' => 1,
        ]
    ]);;?>

    <?= $form->field($model, 'connection')->fileInput() ?>
    <?= $form->field($model, 'occurrence')->fileInput() ?>

    <?= $form->field($model, 'country')->dropDownList([
        'Uk' => 'United Kingdom',
        'AT' => 'Austria',
		'BE' => 'Belgium',
		'BG' => 'Bulgaria',
		'CY' => 'Cyprus',
		'CZ' => 'Czech Republic',
		'DE' => 'Germany',
		'DK' => 'Denmark',
		'EE' => 'Estonia',
		'ES' => 'Spain',
		'FI' => 'Finland',
		'FR' => 'France',
		'GR' => 'Greece',
		'HR' => 'Croatia',
		'HU' => 'Hungary',
		'IE' => 'Ireland',
		'IT' => 'Italy',
		'LT' => 'Lithuania',
		'LU' => 'Luxembourg',
		'LV' => 'Latvia',
		'MT' => 'Malta',
		'NL' => 'Netherlands',
		'PL' => 'Poland',
		'PT' => 'Portugal',
		'RO' => 'Romania',
		'SE' => 'Sweden',
		'SK' => 'Slovakia',
		'SL' => 'Slovenia',
    ]);


$form->field($model, 'country')->textInput() ?>

    <button>Submit</button>

<?php ActiveForm::end() ?>