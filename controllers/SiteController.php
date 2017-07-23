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
                        'actions' => ['keyword, strategic, occurrence'],
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
     * The main site.
     *
     * @return Response|string
     */
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
        return $this->render('keyword');
    }

    protected function monthToNumber($month)
    {
        if( $month != null )
        {
            $m = explode(',', $month)[0];

            switch($m)
            {
                case "Jan": return '2017-01-01';
                case "Feb": return '2017-02-01';
                case "Mar": return '2017-03-01';
                case "Apr": return '2017-04-01';
                case "May": return '2017-05-01';
                case "Jun": return '2017-06-01';
                case "Jul": return '2017-07-01';
                case "Aug": return '2017-08-01';
                case "Sept": return '2017-09-01';
                case "Oct": return '2017-10-01';
                case "Nov": return '2017-11-01';
                case "Dec": return '2017-12-01';
            }
        }

        return '2017-01-01';
    }

    public function actionDatabase($month = null)
    {
        $statistics = Statistics::find()->where(['from_date' => $this->monthToNumber($month)])->one();
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

    /**
     * Strategic displaying
     *
     * @return Response|string
     */
	 public function actionStrategic()
    {
		return $this->render('strategic');
	}
    public function actionStrategicdb($from_date, $to_date, $country, $co, $ps1, $ps2)
    {
		//find id in table statistics according to from_date,to_date,country
		$statistics = Statistics::find()->where(['country' => $country])
			->andWhere(['from_date' => $from_date])
			->andWhere(['to_date' => $to_date])
			->one();

        //find cluster names in table skill
		$sql_1 = "SELECT DISTINCT cluster FROM skill WHERE statistics_id=:id AND cluster!=0";
		$clusters = Skill::findBySql($sql_1,[':id' => $statistics->id])->all();
		
		$json = [];
		for($i=0 ; $i<count($clusters) ; $i++){
			$skills_1 = Skill::find()->where(['statistics_id' => $statistics->id])
				->andWhere(['cluster' => $clusters[$i]->cluster])
				->all();
			$skill1_list = [];
			foreach( $skills_1 as $skill )
			{
				$skill1_list[] = $skill->id;
			}
			//calculate the density for each cluster
			$d_strengths = SkillConnection::find()->where(['statistics_id' => $statistics->id])
				->andWhere(['skill1_id' => $skill1_list])
				->andWhere(['skill2_id' => $skill1_list])
				->andWhere(['>=','co_occurrence', $co])
				->orderBy(['strength' => SORT_DESC])
				->limit($ps1)
				->all();
			$density[$i] = 0;
			foreach( $d_strengths as $strength )
			{
				$density[$i] = $density[$i] + $strength->strength;
			}
			$density[$i] = $density[$i]/count($d_strengths);
			
			//calculate the centrality for each cluster
			$skills_2 = Skill::find()->where(['statistics_id' => $statistics->id])
				->andWhere(['<>','cluster', $clusters[$i]->cluster])
				->andWhere('cluster <> 0') 
				->all();
			$skill2_list = [];
			foreach( $skills_2 as $skill )
			{
				$skill2_list[] = $skill->id;
			}
			$c_strengths = SkillConnection::find()->where(['statistics_id' => $statistics->id])
				->andWhere(['or',['and',['skill1_id' => $skill1_list],['skill2_id' => $skill2_list]],['and',['skill1_id' => $skill2_list],['skill2_id' => $skill1_list]]])
				->andWhere(['>=','co_occurrence', $co])
				->orderBy(['strength' => SORT_DESC])
				->limit($ps2)
				->all();
			$centrality[$i] = 0;
			foreach( $c_strengths as $strength )
			{
				$centrality[$i] = $centrality[$i] + ($strength->strength)*($strength->strength);
			}
			$centrality[$i] = sqrt($centrality[$i]);
			
			//count the number of node in each cluster
			$skill_list = [];
			foreach( $d_strengths as $connection )
			{
				$skill_list[] = $connection->skill1_id;
				$skill_list[] = $connection->skill2_id;
			}
			$num[$i] = count(array_unique($skill_list));

			$json[] = [
				'name' => $clusters[$i]->cluster,
				'density' => $density[$i],
				'centrality' => $centrality[$i],
				'nodeNum' => $num[$i],
			];
		}

        \Yii::$app->response->format = 'json';
        return $json;
    }

    /**
     * Occurrence displaying
     *
     * @return Response|string
     */
    public function actionOccurrence()
    {
        return $this->render('occurrence');
    }

    public function actionOccurrencedb($from_date, $to_date, $country)
    {
        $statistics = Statistics::find()->where(['country' => $country])
			->andWhere(['from_date' => $from_date])
			->andWhere(['to_date' => $to_date])
			->one();
        $skills = Skill::find()->where(['statistics_id' => $statistics->id])
            ->orderBy(['occurrence' => SORT_DESC])
            ->limit(10)
            ->all();

        $json = [];
        foreach( $skills as $skill )
        {
            $json[] = [
                'name' => $skill->name,
                'occurrence' => $skill->occurrence,
            ];
        }

        \Yii::$app->response->format = 'json';
        return $json;
    }
}
