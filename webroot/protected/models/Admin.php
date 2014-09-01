<?php

/**
 * This is the model class for table "admin".
 *
 * The followings are the available columns in table 'admin':
 * @property integer $id
 * @property string $username
 * @property string $email
 * @property string $password
 * @property integer $is_deleted
 * @property string $created_at
 * @property string $updated_at
 */
class Admin extends CActiveRecord
{
	public $rememberMe;
	private $_identity;
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'admin';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('updated_at', 'required'),
			array('is_deleted', 'numerical', 'integerOnly'=>true),
			array('username', 'length', 'max'=>32),
			array('email, password', 'length', 'max'=>128),
			array('created_at', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, username, email, password, is_deleted, created_at, updated_at', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'Id',
			'username' => 'Username',
			'email' => 'Email',
			'password' => 'Password',
			'is_deleted' => 'Is Deleted',
			'created_at' => 'Created At',
			'updated_at' => 'Updated At',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 *
	 * Typical usecase:
	 * - Initialize the model fields with values from filter form.
	 * - Execute this method to get CActiveDataProvider instance which will filter
	 * models according to data in model fields.
	 * - Pass data provider to CGridView, CListView or any similar widget.
	 *
	 * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
	 */
	public function search()
	{
		// Warning: Please modify the following code to remove attributes that
		// should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id);

		$criteria->compare('username',$this->username,true);

		$criteria->compare('email',$this->email,true);

		$criteria->compare('password',$this->password,true);

		$criteria->compare('is_deleted',$this->is_deleted);

		$criteria->compare('created_at',$this->created_at,true);

		$criteria->compare('updated_at',$this->updated_at,true);

		return new CActiveDataProvider('Admin', array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * @return Admin the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	/**
	 * backstage login
	 * return ：boolean
	 * author：frank
	 * date：2014-08-29
	 */
	public function login($username,$password){	
		if($this->_identity===null){
			$this->_identity=new AdminIdentity($username,$password);
			$this->_identity->authenticate();
		}
		if($this->_identity->errorCode===AdminIdentity::ERROR_NONE){
			$duration=$this->rememberMe ? 3600*24*30 : 0; // 30 days
			Yii::app()->user->login($this->_identity,$duration);
			$auth=Yii::app()->authManager;
			$bizRule='return !Yii::app()->user->isGuest;';
			$auth->createRole('root', 'administrator', $bizRule);	
			$bizRule='return Yii::app()->user->isGuest;';
			$auth->createRole('guest', 'guest user', $bizRule);					
			//Yii::app()->session['admin'] = $admin;
			return true;
		}else{
			return false ;
		}
	}
}