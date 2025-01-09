<?php
$path_module = lifetech_module_path();
$path_media = lifetech_media_path();
$hc_media = 'lifemedia';


global $date_created,$date_updated, $status, $lifetech_general_id, $description, $title,$category_id,$misconduct_id,$lifetech_matno,$lifetech_level_id,$lifetech_semester_id,$lifetech_session_id;

class md_mvc_lifetech_lms_blacklist{
            /*************************************************************/
                  /******  BLACKLIST CATEGORY START  ******/
            /*************************************************************/

      static function blacklist_category_add_record($lifetech_general_id, $status, $title, $description, $date_created,$date_updated){

         $formInputs = getLifetechClass();
         $formInputs -> table_name = 'tb_lifetech_lms_student_blacklist_category';
         $formInputs -> echo_type_alert ='Yes';
         $formInputs -> table_record_exist = '_title';
         $formInputs -> table_record_exist_response = 'Error!!! Title has been used before please choose another details';
         $formInputs -> table_fieldvalue ='_date_created,_date_updated, _description, _title, _status, _lifetech_general_id';
         $response_body .=  $formInputs -> lifetech_obj_db_insert();

         //checking if those parameter supply by the user pass the requirement
            if($response_insert_obj_decode = jlon_decode($response_body)-> display_insert_status == '1'){

               // success response from database
               return $response_body;

            }else{

               // error response from database
               return $response_body;

            }


      }
      /****** end of insert category ******/

      static function blacklist_category_retrieve_all_record(){

         $parameter = "'table_name = tb_lifetech_lms_student_blacklist_category ORDER BY date_created DESC'";
         $responses = lifetech_obj_db_select($parameter);
         $load = $responses -> fetchAll();
         return $load;
      }

      static function blacklist_category_retrieve_one_record($lifetech_general_id){

         $parameter = "'table_name=tb_lifetech_lms_student_blacklist_category', 'table_where=_lifetech_general_id'";
         $getRecord= lifetech_obj_getone_record($parameter);
         return json_encode($getRecord);

      }
      /****** end of view category by id ******/

      static function blacklist_category_update_record($lifetech_general_id, $title, $description){

         $parameter = "'table_name=tb_lifetech_lms_student_blacklist_category', 'table_where=_lifetech_general_id', 'table_fieldvalue= _description, _title'";
         $response= lifetech_obj_db_update($parameter);
         $feedback = $response -> display_update_result;
         return $feedback;

      }
      /****** end of update category ******/

      static function blacklist_category_change_status($lifetech_general_id, $status){

         $parameter_status = "'table_name= tb_lifetech_lms_student_blacklist_category', 'table_where=_lifetech_general_id', 'table_fieldvalue= _status'";
         $response_status= lifetech_obj_db_update($parameter_status);
         $feedback = $response_status -> display_update_result;
         return $feedback;

      }
      /****** end of update status ******/

      static function blacklist_category_delete_record($lifetech_general_id){

         $delete_table_name="tb_lifetech_lms_student_blacklist_category"; $delete_table_where="lifetech_general_id = '$lifetech_general_id'";
         $delete_records_feedback = lifetech_db_delete($delete_table_name, $delete_table_where);
      if ($delete_records_feedback['response']='success'){
         return "1";
      }else{
         $delete_error_encountered = $delete_records_feedback['results'];
         return $delete_error_encountered;
      }
   }
   /****** delete category end ******/

            /*************************************************************/
                  /******  BLACKLIST CATEGORY END  ******/
            /*************************************************************/
            /*************************************************************/
                  /******  BLACKLIST MISCONDUCT START  ******/
            /*************************************************************/

            static function blacklist_misconduct_add_record($lifetech_general_id, $category_id, $status, $title, $description, $date_created,$date_updated){

            $formInputs = getLifetechClass();
            $formInputs -> table_name = 'tb_lifetech_lms_student_blacklist_misconduct';
            $formInputs -> echo_type_alert ='Yes';
            $formInputs -> table_record_exist = '_title and _category_id';
            $formInputs -> table_record_exist_response = 'Error!!! Title has been used before please choose another details';
            $formInputs -> table_fieldvalue ='_date_created,_date_updated, _description, _category_id, _title, _status, _lifetech_general_id';
            $response_body .=  $formInputs -> lifetech_obj_db_insert();

            //checking if those parameter supply by the user pass the requirement
            if($response_insert_obj_decode = jlon_decode($response_body)-> display_insert_status == '1'){

               // success response from database
               return $response_body;

            }else{

               // error response from database
               return $response_body;

            }


            }
            /****** end of insert misconduct ******/

            static function blacklist_misconduct_retrieve_all_record(){

            $parameter = "'table_name = tb_lifetech_lms_student_blacklist_misconduct ORDER BY date_created DESC'";
            $responses = lifetech_obj_db_select($parameter);
            $load = $responses -> fetchAll();
            return $load;
            }

            static function blacklist_misconduct_retrieve_one_record($lifetech_general_id){

            $parameter = "'table_name=tb_lifetech_lms_student_blacklist_misconduct', 'table_where=_lifetech_general_id'";
            $getRecord= lifetech_obj_getone_record($parameter);
            return json_encode($getRecord);

            }
            /****** end of view misconduct by id ******/

            static function blacklist_misconduct_update_record($lifetech_general_id, $category_id, $title, $description){

            $parameter = "'table_name=tb_lifetech_lms_student_blacklist_misconduct', 'table_where=_lifetech_general_id', 'table_fieldvalue= _description, _title, _category_id'";
            $response= lifetech_obj_db_update($parameter);
            $feedback = $response -> display_update_result;
            return $feedback;

            }
            /****** end of update misconduct ******/

            static function blacklist_misconduct_change_status($lifetech_general_id, $status){

            $parameter_status = "'table_name= tb_lifetech_lms_student_blacklist_misconduct', 'table_where=_lifetech_general_id', 'table_fieldvalue= _status'";
            $response_status= lifetech_obj_db_update($parameter_status);
            $feedback = $response_status -> display_update_result;
            return $feedback;

            }
            /****** end of update status ******/

            static function blacklist_misconduct_delete_record($lifetech_general_id){

            $delete_table_name="tb_lifetech_lms_student_blacklist_misconduct"; $delete_table_where="lifetech_general_id = '$lifetech_general_id'";
            $delete_records_feedback = lifetech_db_delete($delete_table_name, $delete_table_where);
            if ($delete_records_feedback['response']='success'){
            return "1";
            }else{
            $delete_error_encountered = $delete_records_feedback['results'];
            return $delete_error_encountered;
            }
            }
            /****** delete misconduct end ******/

            /*************************************************************/
                  /******  BLACKLIST MISCONDUCT END  ******/
            /*************************************************************/

            /******  BLACKLIST ENTRY START  ******/
            /*************************************************************/

            static function blacklist_entry_add_record($lifetech_general_id, $category_id, $misconduct_id,$lifetech_matno,$lifetech_level_id,$lifetech_semester_id,$lifetech_session_id, $status,$description, $date_created,$date_updated){

            $formInputs = getLifetechClass();
            $formInputs -> table_name = 'tb_lifetech_lms_student_blacklist';
            $formInputs -> echo_type_alert ='Yes';
            //$formInputs -> table_record_exist = '';
            //$formInputs -> table_record_exist_response = 'Error!!! Title has been used before please choose another details';
            $formInputs -> table_fieldvalue ='_date_created,_date_updated, _description, _category_id, _misconduct_id,_lifetech_matno,_lifetech_level_id,_lifetech_semester_id,_lifetech_session_id, _status, _lifetech_general_id';
            $response_body .=  $formInputs -> lifetech_obj_db_insert();

            //checking if those parameter supply by the user pass the requirement
            if($response_insert_obj_decode = jlon_decode($response_body)-> display_insert_status == '1'){

            // success response from database
            return $response_body;

            }else{

            // error response from database
            return $response_body;

            }


            }
            /****** end of insert entry ******/

            static function blacklist_entry_retrieve_all_record(){

            $parameter = "'table_name = tb_lifetech_lms_student_blacklist ORDER BY date_created DESC'";
            $responses = lifetech_obj_db_select($parameter);
            $load = $responses -> fetchAll();
            return $load;
            }

            static function blacklist_entry_retrieve_one_record($lifetech_general_id){

            $parameter = "'table_name=tb_lifetech_lms_student_blacklist', 'table_where=_lifetech_general_id'";
            $getRecord= lifetech_obj_getone_record($parameter);
            return json_encode($getRecord);

            }
            /****** end of view entry by id ******/

            static function blacklist_entry_update_record($lifetech_general_id, $category_id, $misconduct_id,$lifetech_matno,$lifetech_level_id,$lifetech_semester_id,$lifetech_session_id,$description,$date_updated){

            $parameter = "'table_name=tb_lifetech_lms_student_blacklist', 'table_where=_lifetech_general_id', 'table_fieldvalue= _date_updated, _description, _category_id, _misconduct_id,_lifetech_matno,_lifetech_level_id,_lifetech_semester_id,_lifetech_session_id'";
            $response= lifetech_obj_db_update($parameter);
            $feedback = $response -> display_update_result;
            return $feedback;

            }
            /****** end of update entry ******/

            static function blacklist_entry_change_status($lifetech_general_id, $status){

            $parameter_status = "'table_name= tb_lifetech_lms_student_blacklist', 'table_where=_lifetech_general_id', 'table_fieldvalue= _status'";
            $response_status= lifetech_obj_db_update($parameter_status);
            $feedback = $response_status -> display_update_result;
            return $feedback;

            }
            /****** end of update status ******/

            static function blacklist_entry_delete_record($lifetech_general_id){

            $delete_table_name="tb_lifetech_lms_student_blacklist"; $delete_table_where="lifetech_general_id = '$lifetech_general_id'";
            $delete_records_feedback = lifetech_db_delete($delete_table_name, $delete_table_where);
            if ($delete_records_feedback['response']='success'){
            return "1";
            }else{
            $delete_error_encountered = $delete_records_feedback['results'];
            return $delete_error_encountered;
            }
            }
            /****** delete entry end ******/
            static function blacklist_entry_validate_record($lifetech_matno){
              $parameter = "'table_name=tb_lifetech_lms_add_student', 'table_where=_lifetech_matno'";
              $getRecord= lifetech_obj_getone_record($parameter);
              return json_encode($getRecord);
            }

            static function blacklist_entry_load_misconduct($category_id){
              $parameter = "'table_name =tb_lifetech_lms_student_blacklist_misconduct' ,  'table_fieldname =title,category_id,description,status,lifetech_general_id','table_where = _category_id'";
              $responses = lifetech_obj_db_select($parameter);
              $loadData = $responses -> fetchAll();
              return json_encode($loadData);
            }

            /*************************************************************/
            /******  BLACKLIST ENTRY END  ******/
            /*************************************************************/

          /********* PROGRAM INIT STARTS *************/
          static function blacklist_level_retrieve_all_record(){

          $parameter = "'table_name = tb_lifetech_lms_add_level ORDER BY lifetech_add_level ASC'";
          $responses = lifetech_obj_db_select($parameter);
          $load = $responses -> fetchAll();
          return $load;
          }

          static function blacklist_semester_retrieve_all_record(){

          $parameter = "'table_name = tb_lifetech_lms_add_semester ORDER BY lifetech_semester ASC'";
          $responses = lifetech_obj_db_select($parameter);
          $load = $responses -> fetchAll();
          return $load;
          }

          static function blacklist_session_retrieve_all_record(){

          $parameter = "'table_name = tb_lifetech_lms_add_session ORDER BY lifetech_session DESC'";
          $responses = lifetech_obj_db_select($parameter);
          $load = $responses -> fetchAll();
          return $load;
          }

          /********* PROGRAM INIT ENDS *************/
}

?>

      