<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "skill".
 *
 * @property integer $id
 * @property integer $statistics_id
 * @property string $name
 * @property integer $cluster
 * @property double $radius
 *
 * @property Statistics $statistics
 * @property SkillConnection[] $skillConnections
 * @property SkillConnection[] $skillConnections0
 */
class Skill extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'skill';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['statistics_id', 'cluster'], 'integer'],
            [['radius'], 'number'],
            [['name'], 'string', 'max' => 255],
            [['statistics_id'], 'exist', 'skipOnError' => true, 'targetClass' => Statistics::className(), 'targetAttribute' => ['statistics_id' => 'id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'statistics_id' => 'Statistics ID',
            'name' => 'Name',
            'cluster' => 'Cluster',
            'radius' => 'Radius',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getStatistics()
    {
        return $this->hasOne(Statistics::className(), ['id' => 'statistics_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSkillConnections()
    {
        return $this->hasMany(SkillConnection::className(), ['skill1_id' => 'id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSkillConnections0()
    {
        return $this->hasMany(SkillConnection::className(), ['skill2_id' => 'id']);
    }
}
