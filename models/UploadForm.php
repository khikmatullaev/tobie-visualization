<?php

namespace app\models;

use yii\base\Model;
use yii\web\UploadedFile;

class UploadForm extends Model
{
    /**
     * @var UploadedFile
     */
    public $connection;
    public $occurrence;
    public $from_date;
    public $to_date;
    public $country;

    public function rules()
    {
        return [
            [['connection'], 'file', 'skipOnEmpty' => false, 'extensions' => 'csv'],
            [['occurrence'], 'file', 'skipOnEmpty' => false, 'extensions' => 'csv'],
            [['from_date, to_date, country'], 'safe'],
        ];
    }

    public function attributeLabels()
    {
        return [
            'connection' => 'Connection',
            'occurrence' => 'Occurrence',
            'country' => 'Country',
        ];
    }

    public function upload()
    {
        if ($this->validate()) {
            $this->Connection->saveAs('uploads/' . $this->Connection->baseName . '.' . $this->Connection->extension);
            $this->Occurrence->saveAs('uploads/' . $this->Occurrence->baseName . '.' . $this->Occurrence->extension);
            return true;
        } else {
            return false;
        }
    }
}