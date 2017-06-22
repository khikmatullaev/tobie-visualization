<?php

namespace app\controllers;

use Yii;
use yii\filters\AccessControl;
use yii\web\Controller;
use yii\web\Response;
use yii\filters\VerbFilter;
use app\models\LoginForm;
use app\models\Statistics;
use app\models\Skill;
use app\models\SkillConnection;

class SiteController extends Controller
{
    public $defaultAction = "keyword";

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
     * @return Response
     */
    public function actionKeyword()
    {
        return $this->render('keyword');
    }

    public function actionDatabase()
    {
        $statistics = Statistics::find()->where(['id' => 1])->one();
        //$skills = Skill::find()->where(['statistics_id' => $statistics->id])->andWhere("cluster <> 0")->all();
        $skills = Skill::find()->where(['statistics_id' => $statistics->id])->all();
        $skill_connections = SkillConnection::find()->where(['statistics_id' => $statistics->id])->all();

        $json = [];

        foreach( $skills as $skill )
            $json['nodes'][] = ['id' => $skill->name, 'group' => $skill->cluster];

        foreach( $skill_connections as $skill_connection )
            $json['links'][] = [
                'source' => $skill_connection->skill1->name,
                'target' => $skill_connection->skill2->name,
                'value' => 1
            ];

        \Yii::$app->response->format = 'json';
        return $json;
    }
}
