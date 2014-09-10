<?php
return array (
  'reader' => 
  array (
    'type' => 2,
    'description' => 'Can only read a post',
    'bizRule' => '',
    'data' => '',
  ),
  'commentor' => 
  array (
    'type' => 2,
    'description' => 'Can post a comment',
    'bizRule' => '',
    'data' => '',
  ),
  'root' => 
  array (
    'type' => 2,
    'description' => 'administrator',
    'bizRule' => '',
    'data' => '',
    'assignments' => 
    array (
      1 => 
      array (
        'bizRule' => NULL,
        'data' => NULL,
      ),
      'frank' => 
      array (
        'bizRule' => NULL,
        'data' => NULL,
      ),
    ),
  ),
  'admin' => 
  array (
    'type' => 2,
    'description' => 'Can read a post and post a comment',
    'bizRule' => '',
    'data' => '',
    'children' => 
    array (
      0 => 'reader',
      1 => 'commentor',
    ),
    'assignments' => 
    array (
      'frank' => 
      array (
        'bizRule' => NULL,
        'data' => NULL,
      ),
    ),
  ),
);
