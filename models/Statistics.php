<?php

namespace app\models;

/**
 * This is the model class for table "statistics".
 *
 * @property integer $id
 * @property string $from_date
 * @property string $to_date
 * @property integer $cooccurrence
 * @property integer $pass1link
 * @property integer $pass2link
 * @property string $country
 * @property integer $enabled
 *
 * @property Skill[] $skills
 * @property SkillConnection[] $skillConnections
 */
class Statistics extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'statistics';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['from_date', 'to_date'], 'safe'],
            [['to_date', 'cooccurrence', 'pass1link', 'pass2link', 'country'], 'required'],
            [['pass1link', 'pass2link', 'enabled', 'cooccurrence'], 'integer'],
            [['country'], 'string', 'max' => 64],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'from_date' => 'From Date',
            'to_date' => 'To Date',
            'cooccurrence' => 'Cooccurrence',
            'pass1link' => 'Pass1link',
            'pass2link' => 'Pass2link',
            'country' => 'Country',
            'enabled' => 'Enabled',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSkills()
    {
        return $this->hasMany(Skill::className(), ['statistics_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSkillConnections()
    {
        return $this->hasMany(SkillConnection::className(), ['statistics_id' => 'id']);
    }
}
