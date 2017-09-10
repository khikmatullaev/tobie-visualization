<?php

namespace app\models;

use yii\base\Model;
use yii\web\UploadedFile;

class UploadForm extends Model
{
    /**
     * @var UploadedFile
     */
    public $connectionFile;
    public $occurrenceFile;
    public $from_date;
    public $to_date;
    public $cooccurrence;
    public $pass1link;
    public $pass2link;
    public $country;

    public function rules()
    {
        return [
            [['connectionFile'], 'file', 'skipOnEmpty' => false, 'extensions' => 'csv'],
            [['occurrenceFile'], 'file', 'skipOnEmpty' => false, 'extensions' => 'csv'],
            [['from_date, to_date, country', 'cooccurrence', 'pass1link', 'pass2link'], 'safe'],
        ];
    }

    public function attributeLabels()
    {
        return [
            'connectionFile' => 'ConnectionFile',
            'occurrenceFile' => 'Occurrence File',
            'country' => 'Country',
        ];
    }
}