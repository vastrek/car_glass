<?php

/**
 * UserIdentity represents the data needed to identity a user.
 * It contains the authentication method that checks if the provided
 * data can identity the user.
 */
class AdminIdentity extends CUserIdentity
{
	/**
	 * Authenticates a user.
	 * The example implementation makes sure if the username and password
	 * are both 'demo'.
	 * In practical applications, this should be changed to authenticate
	 * against some persistent user identity storage (e.g. database).
	 * @return boolean whether authentication succeeds.
	 */
	private $_id ;
	public function authenticate()
	{
		
		$admin = Admin::model()->find("username=? AND password=?",array($this->username,$this->password));
		if(!empty($admin)){
			//Yii::log("login", "info", "system.web.CController");
			//Yii::log(var_export($admin), "info", "system.web.CController");
			$this->_id=$admin->id;
			Yii::log($this->_id, "info", "system.web.CController");
	        $this->username=$admin->username;
	        $auth=Yii::app()->authManager;
	        if(!$auth->isAssigned("admin",$this->username))
	        {
	            if($auth->assign("admin",$this->username))
	            {
	                Yii::app()->authManager->save();
	            }
	        }
			$this->errorCode=self::ERROR_NONE;
		}else{
			$this->errorCode=self::ERROR_USERNAME_INVALID;
			$this->errorCode=self::ERROR_PASSWORD_INVALID;
		}

		return !$this->errorCode;
	}
}