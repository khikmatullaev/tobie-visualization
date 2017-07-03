<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\helpers\ArrayHelper;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\Statistics;
use app\models\Skill;
use app\models\SkillConnection;


class SiteController extends Controller
{
    /**
     * @inheritdoc
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'only' => ['logout'],
                'rules' => [
                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                    [
                        'actions' => ['keyword'],
                        'allow' => true,
                        'roles' => ['*']
                    ]
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::className(),
                'actions' => [
                    'logout' => ['post'],
                ],
            ],
        ];
    }

    /**
     * @inheritdoc
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
            'captcha' => [
                'class' => 'yii\captcha\CaptchaAction',
                'fixedVerifyCode' => YII_ENV_TEST ? 'testme' : null,
            ],
        ];
    }


    public function actionIndex()
    {
        return $this->render('index');
    }

    /**
     * Login action.
     *
     * @return Response|string
     */
    public function actionLogin()
    {
        if (!Yii::$app->user->isGuest) {
            return $this->goHome();
        }

        $model = new LoginForm();
        if ($model->load(Yii::$app->request->post()) && $model->login()) {
            return $this->goBack();
        }
        return $this->render('login', [
            'model' => $model,
        ]);
    }

    /**
     * Logout action.
     *
     * @return Response
     */
    public function actionLogout()
    {
        Yii::$app->user->logout();

        return $this->goHome();
    }

    /**
     * Keyword displaying
     *
     * @return Response|string
     */
    public function actionKeyword()
    {
        $statistic = new Statistics;
        $statistics = Statistics::find()->where(['enabled' => 1])->all();

        $items = [];

        foreach(ArrayHelper::map($statistics, 'id', 'from_date') as $key => $item)
            $items[$key] = date('F Y', strtotime($item));

        return $this->render('keyword', [
            'model' => $statistic,
            'statistics' => $items
        ]);
    }

    public function actionDatabase($month = null)
    {
        if( $month != null ) {
            $m = explode(',', $month)[0];
            $m = $m < 10 ? '0'.$m : $m;
            $m = '2017-'.$m.'-01';

            $statistics = Statistics::find()->where(['from_date' => $m])->one();
        }else
            $statistics = Statistics::find()->where(['id' => 1])->one();

        $skills = Skill::find()->where(['statistics_id' => $statistics->id])->andWhere("cluster <> 0")->all();
        $skill_connections = SkillConnection::find()->where(['statistics_id' => $statistics->id])->all();

        $json = [];

        foreach( $skills as $skill )
            $json['nodes'][] = [
                'id' => $skill->name,
                'group' => $skill->cluster,
                'description' => 'skill №'.$skill->id . ' '.$skill->name,
                'radius' => $skill->occurrence,

            ];

        foreach( $skill_connections as $skill_connection )
            if($skill_connection->skill1->cluster != 0 && $skill_connection->skill2->cluster != 0)
            {
                $value = $skill_connection->skill1->cluster == $skill_connection->skill2->cluster ? 1 : 2;

                $json['links'][] = [
                    'source' => $skill_connection->skill1->name,
                    'target' => $skill_connection->skill2->name,
                    'value' => $value,
                    'strength' => $skill_connection->strength,
                    'description' => 'Connection №'.$skill_connection->id,
                ];
            }

        \Yii::$app->response->format = 'json';
        return $json;
    }
}
