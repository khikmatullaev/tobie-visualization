<?php

namespace app\controllers;

use app\models\Skill;
use app\models\SkillConnection;
use app\models\Statistics;
use app\models\UploadForm;
use Yii;
use yii\web\UploadedFile;

class AdminController extends \yii\web\Controller
{
    public $layout = "/admin";

    public function actionIndex()
    {
        $model = new UploadForm();

        if (Yii::$app->request->isPost) {
            $from_date = Yii::$app->request->post()['UploadForm']['from_date'];
            $to_date = Yii::$app->request->post()['UploadForm']['to_date'];
            $occurrence = Yii::$app->request->post()['UploadForm']['occurrence'];
            $pass1link = Yii::$app->request->post()['UploadForm']['pass1link'];
            $pass2link = Yii::$app->request->post()['UploadForm']['pass2link'];
            $country = Yii::$app->request->post()['UploadForm']['country'];

            $fileConnection = UploadedFile::getInstance($model, 'connectionFile');
            $fileNameConnection = 'Data.' . $fileConnection->extension;

            $fileOccurrence = UploadedFile::getInstance($model, 'occurrenceFile');
            $fileNameOccurrence = 'Data.' . $fileOccurrence->extension;

            if ($fileConnection->saveAs($fileNameConnection) && $fileOccurrence->saveAs($fileNameOccurrence)) {
                // create month statistic
                $statistics = new Statistics;
                $statistics->from_date = $from_date;
                $statistics->to_date = $to_date;
                $statistics->occurrence = $occurrence;
                $statistics->pass1link = $pass1link;
                $statistics->pass2link = $pass2link;
                $statistics->country = $country;
                $statistics->enabled = 1;
                $statistics->save();

                $this->addSkill($fileNameConnection, $statistics->id);
                $this->addSkillConnection($fileNameConnection, $statistics->id);
                $this->skillOccurrence($fileNameOccurrence, $statistics->id);

                return $this->redirect(['site/keyword']);
            }
        }

        return $this->render('index', ['model' => $model]);
    }

    protected function addSkill($filename, $statistics_id)
    {
        $file = file($filename);

        foreach ($file as $data) {
            $columns = explode(",", $data);

            $this->appendSkill($columns[0], $columns[4], $statistics_id);
            $this->appendSkill($columns[1], $columns[4], $statistics_id);
        }
    }

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

    protected function skillOccurrence($filename, $statistics_id)
    {

    }
}
