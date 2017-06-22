<?php
use yii\widgets\ActiveForm;
use kartik\date\DatePicker;
?>

<?php $form = ActiveForm::begin(['options' => ['enctype' => 'multipart/form-data']]) ?>

    <?= DatePicker::widget([
        'model' => $model,
        'attribute' => 'date',
        'options' => ['placeholder' => 'Start date'],
        'type' => DatePicker::TYPE_COMPONENT_PREPEND,
        'form' => $form,
        'pluginOptions' => [
            'format' => 'yyyy/mm/00',
            'autoclose' => true,
            'minViewMode' => 1,
        ]
    ]);;?>

    <?= $form->field($model, 'csvFile')->fileInput() ?>

    <button>Submit</button>

<?php ActiveForm::end() ?>