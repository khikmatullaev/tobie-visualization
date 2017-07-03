<?php

namespace app\controllers;

use yii\web\UploadedFile;
use app\models\UploadForm;
use app\models\Statistics;
use app\models\Skill;
use app\models\SkillConnection;

class AdminController extends \yii\web\Controller
{
    protected function appendSkill($name, $cluster, $statistics_id)
    {
        $existSkill = Skill::find()->where(['name' => $name, 'statistics_id' => $statistics_id])->one();

        if( empty($existSkill) )
        {
            $skill = new Skill;
            $skill->statistics_id = $statistics_id;
            $skill->name = $name;
            $skill->cluster = $cluster;

            $skill->save();
        }else{
            if( $existSkill->cluster == 0 && $cluster != 0 )
            {
                $existSkill->cluster = $cluster;
                $existSkill->save(false);
            }
        }
    }

    protected function addSkill($filename, $statistics_id)
    {
        $file = file($filename);

        foreach( $file as $data )
        {
            $columns = explode(",",$data);

            $this->appendSkill($columns[0], $columns[4], $statistics_id);
            $this->appendSkill($columns[1], $columns[4], $statistics_id);
        }
    }

    protected function addSkillConnection($filename, $statistics_id)
    {
        $file = file($filename);

        foreach( $file as $data )
        {
            $columns = explode(",",$data);

            $skill1 = Skill::find()->where(['name' => $columns[0], 'statistics_id' => $statistics_id])->one();
            $skill2 = Skill::find()->where(['name' => $columns[1], 'statistics_id' => $statistics_id])->one();

            if( !empty($skill1) && !empty($skill2) )
            {
                if($columns[4] == 0 && $columns[6] == 0 && $columns[7] == 0)
                    continue;

                $skillConnection = new SkillConnection;
                $skillConnection->statistics_id = $statistics_id;
                $skillConnection->skill1_id = $skill1->id;
                $skillConnection->skill2_id = $skill2->id;
                $skillConnection->co_occurrence  = $columns[2];
                $skillConnection->strength  = $columns[3];

                $skillConnection->save();
            }
        }
    }

    public function actionIndex()
    {
        $model = new UploadForm();

        if( \Yii::$app->request->isPost )
        {
            $from_date = \Yii::$app->request->post()['UploadForm']['from_date'];
            $to_date   = \Yii::$app->request->post()['UploadForm']['to_date'];

            $file = UploadedFile::getInstance($model, 'csvFile');
            $filename = 'Data.'.$file->extension;

            if( $file->saveAs($filename) )
            {
                // create month statistic
                $statistics = new Statistics;
                $statistics->from_date = $from_date;
                $statistics->to_date   = $to_date;
                $statistics->enabled   = 1;
                $statistics->save(false);

                $this->addSkill($filename, $statistics->id);
                $this->addSkillConnection($filename, $statistics->id);

                unlink($filename);
                return $this->redirect(['site/keyword']);
            }
        }

        return $this->render('index', ['model' => $model]);
    }
}
