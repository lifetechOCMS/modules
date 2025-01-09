{! import('md_mvc_lifetech_lms_blacklist', 'models_md_mvc_lifetech_lms_blacklist.php') !}
<?php


global $date_created,$date_updated, $status, $lifetech_general_id, $description, $title,$category_id,$misconduct_id,$lifetech_matno,$lifetech_level_id,$lifetech_semester_id,$lifetech_session_id;
               /*************************************************************/
                     /******  CONTROLLER FOR BLACKLIST CATEGORY START  ******/
               /*************************************************************/

if (isset($_POST["blacklistCategoryAction"])) {

   // creating registry category for staff
   if ($_POST["blacklistCategoryAction"] == "valAddRecordCategory") {
      ob_end_clean();

   // Sanitize and trim the 'category' POST variable using htmlspecialchars() and trim()
      $title = trim(htmlspecialchars($_POST['blacklistCategoryTitle'], ENT_QUOTES, 'UTF-8'));
      $description = trim(htmlspecialchars($_POST['blacklistCategoryDescr'], ENT_QUOTES, 'UTF-8'));
      $date_created = date("Y-m-d H:i:s");
      $date_updated = date("Y-m-d H:i:s");
      $status = 1;
      $lifetech_general_id = lifetech_general_id();
      $register_category =  md_mvc_lifetech_lms_blacklist::blacklist_category_add_record($lifetech_general_id, $status, $title, $description, $date_created,$date_updated);

      echo $register_category;


      exit();
   }

      /// categoryAction for edit category
   if ($_POST['blacklistCategoryAction'] == "valEditBlacklistCategory") {
      ob_end_clean();

      $lifetech_general_id = trim(htmlspecialchars($_POST['id'], ENT_QUOTES, 'UTF-8'));

      $edit_category =  md_mvc_lifetech_lms_blacklist::blacklist_category_retrieve_one_record($lifetech_general_id);
      echo $edit_category;

      exit();
   }

/// update category
   if ($_POST['blacklistCategoryAction'] == "valUpdateBlacklistCategory") {
      ob_end_clean();
      $lifetech_general_id = $_POST["id"];
      $title = $_POST["blacklistCategoryTitle"];
      $description = $_POST["blacklistCategoryDescr"];
      $date_updated = date("Y-m-d H:i:s");
      $update_category = md_mvc_lifetech_lms_blacklist::blacklist_category_update_record($lifetech_general_id, $title, $description);
      if ($update_category == "You have Succefully Updated Your Records") {
         $insert_resp['display_update_result'] = "success";
         echo json_encode($insert_resp);
      }


      exit();
   }
//// update status
   if ($_POST["blacklistCategoryAction"] == "ChangeBlacklistCategoryStatus") {
      ob_end_clean();
         $lifetech_general_id = trim(htmlspecialchars($_POST['id'], ENT_QUOTES, 'UTF-8'));
         $status = trim(htmlspecialchars($_POST['statusValue'], ENT_QUOTES, 'UTF-8'));

         $update_status =  md_mvc_lifetech_lms_blacklist::blacklist_category_change_status($lifetech_general_id, $status);
         if ($update_status == "You have Succefully Updated Your Records") {
            $update_resp['display_update_result'] = "success";
            echo json_encode($update_resp);
         }
         //echo json_encode($update_status);

      exit();

   }

   if ($_POST['blacklistCategoryAction'] == "valDeleteBlacklistCategory") {
      ob_end_clean();

      $lifetech_general_id = trim(htmlspecialchars($_POST['id'], ENT_QUOTES, 'UTF-8'));

      $delete_category =  md_mvc_lifetech_lms_blacklist::blacklist_category_delete_record($lifetech_general_id);

      echo $delete_category;

      exit();
   }
}

               /*************************************************************/
                     /******  CONTROLLER FOR BLACKLIST CATEGORY END  ******/
               /*************************************************************/
               /******  CONTROLLER FOR BLACKLIST MISCONDUCT START  ******/
               /*************************************************************/

               if (isset($_POST["blacklistMisconductAction"])) {

               // creating registry misconduct for staff
               if ($_POST["blacklistMisconductAction"] == "valAddRecordMisconduct") {
               ob_end_clean();

               // Sanitize and trim the 'misconduct' POST variable using htmlspecialchars() and trim()
               $category_id = trim(htmlspecialchars($_POST['blacklistMisconductCategory'], ENT_QUOTES, 'UTF-8'));
               $title = trim(htmlspecialchars($_POST['blacklistMisconductTitle'], ENT_QUOTES, 'UTF-8'));
               $description = trim(htmlspecialchars($_POST['blacklistMisconductDescr'], ENT_QUOTES, 'UTF-8'));
               $date_created = date("Y-m-d H:i:s");
               $date_updated = date("Y-m-d H:i:s");
               $status = 1;
               $lifetech_general_id = lifetech_general_id();
               $register_misconduct =  md_mvc_lifetech_lms_blacklist::blacklist_misconduct_add_record($lifetech_general_id, $category_id, $status, $title, $description, $date_created,$date_updated);

               echo $register_misconduct;


               exit();
               }

               /// misconductAction for edit misconduct
               if ($_POST['blacklistMisconductAction'] == "valEditBlacklistMisconduct") {
               ob_end_clean();

               $lifetech_general_id = trim(htmlspecialchars($_POST['id'], ENT_QUOTES, 'UTF-8'));

               $edit_misconduct =  md_mvc_lifetech_lms_blacklist::blacklist_misconduct_retrieve_one_record($lifetech_general_id);
               echo $edit_misconduct;

               exit();
               }

               /// update misconduct
               if ($_POST['blacklistMisconductAction'] == "valUpdateBlacklistMisconduct") {
               ob_end_clean();
               $lifetech_general_id = $_POST["id"];
               $category_id = trim(htmlspecialchars($_POST['blacklistMisconductCategory'], ENT_QUOTES, 'UTF-8'));
               $title = $_POST["blacklistMisconductTitle"];
               $description = $_POST["blacklistMisconductDescr"];
               $date_updated = date("Y-m-d H:i:s");
               $update_misconduct = md_mvc_lifetech_lms_blacklist::blacklist_misconduct_update_record($lifetech_general_id, $category_id, $title, $description);
               if ($update_misconduct == "You have Succefully Updated Your Records") {
               $insert_resp['display_update_result'] = "success";
               echo json_encode($insert_resp);
               }


               exit();
               }
               //// update status
               if ($_POST["blacklistMisconductAction"] == "ChangeBlacklistMisconductStatus") {
               ob_end_clean();
               $lifetech_general_id = trim(htmlspecialchars($_POST['id'], ENT_QUOTES, 'UTF-8'));
               $status = trim(htmlspecialchars($_POST['statusValue'], ENT_QUOTES, 'UTF-8'));

               $update_status =  md_mvc_lifetech_lms_blacklist::blacklist_misconduct_change_status($lifetech_general_id, $status);
               if ($update_status == "You have Succefully Updated Your Records") {
               $update_resp['display_update_result'] = "success";
               echo json_encode($update_resp);
               }
               //echo json_encode($update_status);

               exit();

               }

               if ($_POST['blacklistMisconductAction'] == "valDeleteBlacklistMisconduct") {
               ob_end_clean();

               $lifetech_general_id = trim(htmlspecialchars($_POST['id'], ENT_QUOTES, 'UTF-8'));

               $delete_misconduct =  md_mvc_lifetech_lms_blacklist::blacklist_misconduct_delete_record($lifetech_general_id);

               echo $delete_misconduct;

               exit();
               }
               }

               /*************************************************************/
               /******  CONTROLLER FOR BLACKLIST MISCONDUCT END  ******/
               /*************************************************************/
               /******  CONTROLLER FOR BLACKLIST ENTRY START  ******/
               /*************************************************************/

               if (isset($_POST["blacklistEntryAction"])) {

               // creating registry entry for staff
               if ($_POST["blacklistEntryAction"] == "valAddRecordEntry") {
               ob_end_clean();

               // Sanitize and trim the 'entry' POST variable using htmlspecialchars() and trim()
               $category_id = trim(htmlspecialchars($_POST['blacklistEntryCategory'], ENT_QUOTES, 'UTF-8'));
               $misconduct_id = trim(htmlspecialchars($_POST['blacklistEntryMisconduct'], ENT_QUOTES, 'UTF-8'));
               $lifetech_matno = trim(htmlspecialchars($_POST['blacklistEntryMatricNo'], ENT_QUOTES, 'UTF-8'));
               $description = trim(htmlspecialchars($_POST['blacklistEntryDescr'], ENT_QUOTES, 'UTF-8'));
               $lifetech_level_id = trim(htmlspecialchars($_POST['blacklistEntryLevel'], ENT_QUOTES, 'UTF-8'));
               $lifetech_semester_id = trim(htmlspecialchars($_POST['blacklistEntrySemester'], ENT_QUOTES, 'UTF-8'));
               $lifetech_session_id = trim(htmlspecialchars($_POST['blacklistEntrySession'], ENT_QUOTES, 'UTF-8'));
               $date_created = date("Y-m-d H:i:s");
               $date_updated = date("Y-m-d H:i:s");
               $status = 1;
               $lifetech_general_id = lifetech_general_id();
               $register_entry =  md_mvc_lifetech_lms_blacklist::blacklist_entry_add_record($lifetech_general_id, $category_id, $misconduct_id,$lifetech_matno,$lifetech_level_id,$lifetech_semester_id,$lifetech_session_id, $status,$description, $date_created,$date_updated);

               echo $register_entry;


               exit();
               }

               /// entryAction for edit entry
               if ($_POST['blacklistEntryAction'] == "valEditBlacklistEntry") {
               ob_end_clean();

               $lifetech_general_id = trim(htmlspecialchars($_POST['id'], ENT_QUOTES, 'UTF-8'));

               $edit_entry =  md_mvc_lifetech_lms_blacklist::blacklist_entry_retrieve_one_record($lifetech_general_id);
               echo $edit_entry;

               exit();
               }

               /// update entry
               if ($_POST['blacklistEntryAction'] == "valUpdateBlacklistEntry") {
               ob_end_clean();
               $lifetech_general_id = $_POST["id"];
               $category_id = trim(htmlspecialchars($_POST['blacklistEntryCategory'], ENT_QUOTES, 'UTF-8'));
               $misconduct_id = trim(htmlspecialchars($_POST['blacklistEntryMisconduct'], ENT_QUOTES, 'UTF-8'));
               $lifetech_matno = trim(htmlspecialchars($_POST['blacklistEntryMatricNo'], ENT_QUOTES, 'UTF-8'));
               $description = trim(htmlspecialchars($_POST['blacklistEntryDescr'], ENT_QUOTES, 'UTF-8'));
               $lifetech_level_id = trim(htmlspecialchars($_POST['blacklistEntryLevel'], ENT_QUOTES, 'UTF-8'));
               $lifetech_semester_id = trim(htmlspecialchars($_POST['blacklistEntrySemester'], ENT_QUOTES, 'UTF-8'));
               $lifetech_session_id = trim(htmlspecialchars($_POST['blacklistEntrySession'], ENT_QUOTES, 'UTF-8'));
               $date_updated = date("Y-m-d H:i:s");
               $update_entry = md_mvc_lifetech_lms_blacklist::blacklist_entry_update_record($lifetech_general_id, $category_id, $misconduct_id,$lifetech_matno,$lifetech_level_id,$lifetech_semester_id,$lifetech_session_id,$description,$date_updated);
               if ($update_entry == "You have Succefully Updated Your Records") {
               $insert_resp['display_update_result'] = "success";
               echo json_encode($insert_resp);
               }


               exit();
               }
               //// update status
               if ($_POST["blacklistEntryAction"] == "ChangeBlacklistEntryStatus") {
               ob_end_clean();
               $lifetech_general_id = trim(htmlspecialchars($_POST['id'], ENT_QUOTES, 'UTF-8'));
               $status = trim(htmlspecialchars($_POST['statusValue'], ENT_QUOTES, 'UTF-8'));

               $update_status =  md_mvc_lifetech_lms_blacklist::blacklist_entry_change_status($lifetech_general_id, $status);
               if ($update_status == "You have Succefully Updated Your Records") {
               $update_resp['display_update_result'] = "success";
               echo json_encode($update_resp);
               }
               //echo json_encode($update_status);

               exit();

               }

               if ($_POST['blacklistEntryAction'] == "valDeleteBlacklistEntry") {
               ob_end_clean();

               $lifetech_general_id = trim(htmlspecialchars($_POST['id'], ENT_QUOTES, 'UTF-8'));

               $delete_entry =  md_mvc_lifetech_lms_blacklist::blacklist_entry_delete_record($lifetech_general_id);

               echo $delete_entry;

               exit();
               }

               if ($_POST['blacklistEntryAction'] == "valValidateBlacklistEntry") {
                 ob_end_clean();
                 $lifetech_matno = trim(htmlspecialchars($_POST['id'], ENT_QUOTES, 'UTF-8'));
                 $edit_entry =  md_mvc_lifetech_lms_blacklist::blacklist_entry_validate_record($lifetech_matno);
                 echo $edit_entry;

                 exit();
               }

               if ($_POST["blacklistEntryAction"] == "valLoadMisconduct") {
                  ob_end_clean();
                  $category_id = trim(htmlspecialchars($_POST['id'], ENT_QUOTES, 'UTF-8'));     
                  $load_misconduct =  md_mvc_lifetech_lms_blacklist::blacklist_entry_load_misconduct($category_id);
                  echo $load_misconduct;
                  exit();
               }

               }

               /*************************************************************/
               /******  CONTROLLER FOR BLACKLIST ENTRY END  ******/
               /*************************************************************/

?>

      
      