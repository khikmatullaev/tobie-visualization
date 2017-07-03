<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "skill_connection".
 *
 * @property integer $id
 * @property integer $statistics_id
 * @property integer $skill1_id
 * @property integer $skill2_id
 * @property double $strength
 * @property double co_occurrence
 *
 * @property Statistics $statistics
 * @property Skill $skill1
 * @property Skill $skill2
 */
class SkillConnection extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'skill_connection';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['statistics_id', 'skill1_id', 'skill2_id'], 'integer'],
            [['strength'], 'number'],
            [['co_occurrence'], 'number'],
            [['statistics_id'], 'exist', 'skipOnError' => true, 'targetClass' => Statistics::className(), 'targetAttribute' => ['statistics_id' => 'id']],
            [['skill1_id'], 'exist', 'skipOnError' => true, 'targetClass' => Skill::className(), 'targetAttribute' => ['skill1_id' => 'id']],
            [['skill2_id'], 'exist', 'skipOnError' => true, 'targetClass' => Skill::className(), 'targetAttribute' => ['skill2_id' => 'id']],
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
            'skill1_id' => 'Skill1 ID',
            'skill2_id' => 'Skill2 ID',
            'strength' => 'Strength',
            'co_occurrence' => 'Co-occurrence',
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
    public function getSkill1()
    {
        return $this->hasOne(Skill::className(), ['id' => 'skill1_id']);
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getSkill2()
    {
        return $this->hasOne(Skill::className(), ['id' => 'skill2_id']);
    }
}
