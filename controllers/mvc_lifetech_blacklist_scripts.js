<script src="https://code.jquery.com/jquery-3.7.0.js"></script>
<script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>new DataTable('#example');</script>
<script>
// Email Validator
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
$(".classHidden").hide();
//------------------- BLACKLIST CATEGORY CATEGORY STARTS -------------------------------//
  // Initialize Category Add New Button
  function initAddNewCategory(){
      document.getElementById("frmBlacklistCategory").reset();
      $("#blacklistCategoryAction").val("valAddRecordCategory");
      $("#myModalLabel").html("New Blacklist Category");
      $("#btnAddBlacklistCategory").show();
      $("#btnUpdateBlacklistCategory").hide();
  }

  // Initialize Category Edit Button
  function initEditCategory(){
      $("#blacklistCategoryAction").val("valUpdateBlacklistCategory");
      $("#myModalLabel").html("Editing Blacklist Category...");
      $("#btnAddBlacklistCategory").hide();
      $("#btnUpdateBlacklistCategory").show();
  }

  // Add New Category Record
  $("#btnAddBlacklistCategory").click(function(){
        if($("#blacklistCategoryTitle").val()==""){
            var msg = "Category title field cannot be empty";
            Swal.fire('Notice!', msg, 'warning');
          return;
        }

        fx_lifetech_button_loader_open();
          var myFormBlacklistCategory = document.getElementById('frmBlacklistCategory');
          var formDataBlacklistCategory = new FormData(myFormBlacklistCategory);
           Swal.fire({
            title: 'Notice!',
            text: "Are you sure to add record?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.isConfirmed) {
              $.ajax({
                 method:"post",
                 data:formDataBlacklistCategory,
                 contentType: false,
                 processData: false,
                 dataType:"json",
                success: function(response){
                  //console.log(response);
                  var insertStatus = response["display_insert_status"];
                  var insertStatusVal = response["return_insert_result"];
                  var alertStatus = response["echo_type_alert"];
                  var opsType = response["operation_type"];

                    if(insertStatus=='1'){
                      var msg = "Blacklist Category Has Been Added Successfully";
                      Swal.fire('Great!', msg, 'success');
                    }else{
                      var msg = "Something went wrong. Could not save data";
                      Swal.fire('Oops!', msg, 'warning');
                    }
                  fx_lifetech_button_loader_close();
                },
              })
              .fail(function(){
                  Swal.fire({
                        icon: 'error',
                        title: 'Oops',
                        text: 'An error occurred! Nothing has changed...'
                      });

              });
            }else{
              fx_lifetech_button_loader_close();
            }
          })


   })

   // Update Click Event


 $("#btnUpdateBlacklistCategory").click(function(){
   var id = $("#editIDCategory").val();
   updateBlacklistCategory(id);
 })
  // Edit Category Record
  function editBlacklistCategory(id){
    initEditCategory();
      var blacklistCategoryAction = "valEditBlacklistCategory";
      $.ajax({
         method:"post",
         data:{id:id,blacklistCategoryAction:blacklistCategoryAction},
         dataType:"json",
        success: function(response){
          //console.log(response);
           var valCategory = response["title"];
          var valDescription = response["description"];
          var valGeneralId = response["lifetech_general_id"];
          var opsType = response["operation_type"];
            if(valCategory!=""){
              $("#blacklistCategoryTitle").val(valCategory);
              $("#blacklistCategoryDescr").val(valDescription);
              $("#editIDCategory").val(valGeneralId);
            }

          fx_lifetech_button_loader_close();
        },
      })
      .fail(function(){
          Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: 'An error occurred! Nothing has changed...'
              });

      });
  }

  function updateBlacklistCategory(){
      var blacklistCategoryAction = "valUpdateBlacklistCategory";
      fx_lifetech_button_loader_open();
        var myFormUpdateBlacklistCategory = document.getElementById('frmBlacklistCategory');
        var formDataUpdateBlacklistCategory = new FormData(myFormUpdateBlacklistCategory);
         Swal.fire({
          title: 'Notice!',
          text: "Are you sure to update this record?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then((result) => {
          if (result.isConfirmed) {
            $.ajax({
               method:"post",
               data:formDataUpdateBlacklistCategory,
               contentType: false,
               processData: false,
               //dataType:"json",
              success: function(response){
                var data = JSON.parse(response);
                var updateStatus = data.display_update_result;
                  if(updateStatus=='success'){
                    var msg = "Record Updated Successfully";
                    Swal.fire('Great!', msg, 'success');
                  }else{
                    var msg = "Something went wrong. Could not update record";
                    Swal.fire('Oops!', msg, 'warning');
                  }
                fx_lifetech_button_loader_close();
              },
            })
            .fail(function(){
                Swal.fire({
                      icon: 'error',
                      title: 'Oops',
                      text: 'An error occurred! Nothing has changed...'
                    });

            });
          }else{
            fx_lifetech_button_loader_close();
          }
        })
  }

  function changeStatusBlacklistCategory(id) {
      var blacklistCategoryAction = "ChangeBlacklistCategoryStatus";
      var statusID = $("#"+id).data('id');
      var statusVal = ''; statusValue = 0;
          if(statusID=='1'){
            StatusVal = 'disable';
            statusValue = 0;
          }else{
            StatusVal = 'enable';
            statusValue = 1;
          }
      Swal.fire({
       title: 'Notice!',
       text: "Are you sure to "+StatusVal+" this blacklist category?",
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes'
     }).then((result) => {
       if (result.isConfirmed) {
         fx_lifetech_button_loader_open();
         $.ajax({
            method:"post",
            data:{id:id,blacklistCategoryAction:blacklistCategoryAction,statusValue:statusValue},
           success: function(response){
             var data = JSON.parse(response);
             var updateStatus = data.display_update_result;
               if(updateStatus=='success'){
                 var msg = "Status Changed Successfully";
                 Swal.fire('Great!', msg, 'success');
               }else{
                 var msg = "Something went wrong. Could not change status";
                 Swal.fire('Oops!', msg, 'warning');
               }
             fx_lifetech_button_loader_close();
           },
         })
         .fail(function(){
             Swal.fire({
                   icon: 'error',
                   title: 'Oops',
                   text: 'An error occurred! Nothing has changed...'
                 });

         });
       }else{
         fx_lifetech_button_loader_close();
       }
     })

  }

  function deleteBlacklistCategory(id){
      var blacklistCategoryAction = "valDeleteBlacklistCategory";
      Swal.fire({
       title: 'Notice!',
       text: "Are you sure to delete this record?",
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes'
     }).then((result) => {
       if (result.isConfirmed) {
         fx_lifetech_button_loader_open();
         $.ajax({
            method:"post",
            data:{id:id,blacklistCategoryAction:blacklistCategoryAction},
           success: function(response){
               if(response==1){
                 var msg = "Blacklist Category Deleted Successfully";
                 Swal.fire('Great!', msg, 'success');
               }else{
                 var msg = "Something went wrong. Could not delete blacklist category";
                 Swal.fire('Oops!', msg, 'warning');
               }
             fx_lifetech_button_loader_close();
           },
         })
         .fail(function(){
             Swal.fire({
                   icon: 'error',
                   title: 'Oops',
                   text: 'An error occurred! Nothing has changed...'
                 });

         });
       }else{
         fx_lifetech_button_loader_close();
       }
     })
  }

  $("#btnUpdateBlacklistCategory").hide();
//------------------- BLACKLIST CATEGORY CATEGORY ENDS -------------------------------//
//------------------- BLACKLIST MISCONDUCT STARTS -------------------------------//
  // Initialize Misconduct Add New Button
  function initAddNewMisconduct(){
      document.getElementById("frmBlacklistMisconduct").reset();
      $("#blacklistMisconductAction").val("valAddRecordMisconduct");
      $("#myModalLabel").html("New Blacklist Misconduct");
      $("#btnAddBlacklistMisconduct").show();
      $("#btnUpdateBlacklistMisconduct").hide();
  }

  // Initialize Misconduct Edit Button
  function initEditMisconduct(){
      $("#blacklistMisconductAction").val("valUpdateBlacklistMisconduct");
      $("#myModalLabel").html("Editing Blacklist Misconduct...");
      $("#btnAddBlacklistMisconduct").hide();
      $("#btnUpdateBlacklistMisconduct").show();
  }

  // Add New Misconduct Record
  $("#btnAddBlacklistMisconduct").click(function(){
        if($("#blacklistMisconductCategory").val()==""){
            var msg = "Please select misconduct category";
            Swal.fire('Notice!', msg, 'warning');
          return;
        }

        if($("#blacklistMisconductTitle").val()==""){
            var msg = "Misconduct title field cannot be empty";
            Swal.fire('Notice!', msg, 'warning');
          return;
        }

        fx_lifetech_button_loader_open();
          var myFormBlacklistMisconduct = document.getElementById('frmBlacklistMisconduct');
          var formDataBlacklistMisconduct = new FormData(myFormBlacklistMisconduct);
           Swal.fire({
            title: 'Notice!',
            text: "Are you sure to add record?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
          }).then((result) => {
            if (result.isConfirmed) {
              $.ajax({
                 method:"post",
                 data:formDataBlacklistMisconduct,
                 contentType: false,
                 processData: false,
                 dataType:"json",
                success: function(response){
                  //console.log(response);
                  var insertStatus = response["display_insert_status"];
                  var insertStatusVal = response["return_insert_result"];
                  var alertStatus = response["echo_type_alert"];
                  var opsType = response["operation_type"];

                    if(insertStatus=='1'){
                      var msg = "Blacklist Misconduct Has Been Added Successfully";
                      Swal.fire('Great!', msg, 'success');
                    }else{
                      var msg = "Something went wrong. Could not save data";
                      Swal.fire('Oops!', msg, 'warning');
                    }
                  fx_lifetech_button_loader_close();
                },
              })
              .fail(function(){
                  Swal.fire({
                        icon: 'error',
                        title: 'Oops',
                        text: 'An error occurred! Nothing has changed...'
                      });

              });
            }else{
              fx_lifetech_button_loader_close();
            }
          })


   })

   // Update Click Event


 $("#btnUpdateBlacklistMisconduct").click(function(){
   var id = $("#editIDMisconduct").val();
   updateBlacklistMisconduct(id);
 })
  // Edit Misconduct Record
  function editBlacklistMisconduct(id){
    initEditMisconduct();
      var blacklistMisconductAction = "valEditBlacklistMisconduct";
      $.ajax({
         method:"post",
         data:{id:id,blacklistMisconductAction:blacklistMisconductAction},
         dataType:"json",
        success: function(response){
          //console.log(response);
          var valCategory = response["category_id"];
           var valMisconduct = response["title"];
          var valDescription = response["description"];
          var valGeneralId = response["lifetech_general_id"];
          var opsType = response["operation_type"];
            if(valMisconduct!=""){
              $("select[name=blacklistMisconductCategory] option[value='"+valCategory+"']").attr('selected','selected');
              $("#blacklistMisconductTitle").val(valMisconduct);
              $("#blacklistMisconductDescr").val(valDescription);
              $("#editIDMisconduct").val(valGeneralId);
            }

          fx_lifetech_button_loader_close();
        },
      })
      .fail(function(){
          Swal.fire({
                icon: 'error',
                title: 'Oops',
                text: 'An error occurred! Nothing has changed...'
              });

      });
  }

  function updateBlacklistMisconduct(){
      var blacklistMisconductAction = "valUpdateBlacklistMisconduct";
      fx_lifetech_button_loader_open();
        var myFormUpdateBlacklistMisconduct = document.getElementById('frmBlacklistMisconduct');
        var formDataUpdateBlacklistMisconduct = new FormData(myFormUpdateBlacklistMisconduct);
         Swal.fire({
          title: 'Notice!',
          text: "Are you sure to update this record?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then((result) => {
          if (result.isConfirmed) {
            $.ajax({
               method:"post",
               data:formDataUpdateBlacklistMisconduct,
               contentType: false,
               processData: false,
               //dataType:"json",
              success: function(response){
                var data = JSON.parse(response);
                var updateStatus = data.display_update_result;
                  if(updateStatus=='success'){
                    var msg = "Record Updated Successfully";
                    Swal.fire('Great!', msg, 'success');
                  }else{
                    var msg = "Something went wrong. Could not update record";
                    Swal.fire('Oops!', msg, 'warning');
                  }
                fx_lifetech_button_loader_close();
              },
            })
            .fail(function(){
                Swal.fire({
                      icon: 'error',
                      title: 'Oops',
                      text: 'An error occurred! Nothing has changed...'
                    });

            });
          }else{
            fx_lifetech_button_loader_close();
          }
        })
  }

  function changeStatusBlacklistMisconduct(id) {
      var blacklistMisconductAction = "ChangeBlacklistMisconductStatus";
      var statusID = $("#"+id).data('id');
      var statusVal = ''; statusValue = 0;
          if(statusID=='1'){
            StatusVal = 'disable';
            statusValue = 0;
          }else{
            StatusVal = 'enable';
            statusValue = 1;
          }
      Swal.fire({
       title: 'Notice!',
       text: "Are you sure to "+StatusVal+" this blacklist misconduct?",
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes'
     }).then((result) => {
       if (result.isConfirmed) {
         fx_lifetech_button_loader_open();
         $.ajax({
            method:"post",
            data:{id:id,blacklistMisconductAction:blacklistMisconductAction,statusValue:statusValue},
           success: function(response){
             var data = JSON.parse(response);
             var updateStatus = data.display_update_result;
               if(updateStatus=='success'){
                 var msg = "Status Changed Successfully";
                 Swal.fire('Great!', msg, 'success');
               }else{
                 var msg = "Something went wrong. Could not change status";
                 Swal.fire('Oops!', msg, 'warning');
               }
             fx_lifetech_button_loader_close();
           },
         })
         .fail(function(){
             Swal.fire({
                   icon: 'error',
                   title: 'Oops',
                   text: 'An error occurred! Nothing has changed...'
                 });

         });
       }else{
         fx_lifetech_button_loader_close();
       }
     })

  }

  function deleteBlacklistMisconduct(id){
      var blacklistMisconductAction = "valDeleteBlacklistMisconduct";
      Swal.fire({
       title: 'Notice!',
       text: "Are you sure to delete this record?",
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Yes'
     }).then((result) => {
       if (result.isConfirmed) {
         fx_lifetech_button_loader_open();
         $.ajax({
            method:"post",
            data:{id:id,blacklistMisconductAction:blacklistMisconductAction},
           success: function(response){
               if(response==1){
                 var msg = "Blacklist Misconduct Deleted Successfully";
                 Swal.fire('Great!', msg, 'success');
               }else{
                 var msg = "Something went wrong. Could not delete blacklist misconduct";
                 Swal.fire('Oops!', msg, 'warning');
               }
             fx_lifetech_button_loader_close();
           },
         })
         .fail(function(){
             Swal.fire({
                   icon: 'error',
                   title: 'Oops',
                   text: 'An error occurred! Nothing has changed...'
                 });

         });
       }else{
         fx_lifetech_button_loader_close();
       }
     })
  }

  $("#btnUpdateBlacklistMisconduct").hide();
//------------------- BLACKLIST MISCONDUCT ENDS -------------------------------//

//------------------- BLACKLIST ENTRY STARTS -------------------------------//
// Initialize Entry Add New Button
function initAddNewEntry(){
    document.getElementById("frmBlacklistEntry").reset();
    $("#blacklistEntryAction").val("valAddRecordEntry");
    $("#myModalLabel").html("New Blacklist");
    $("#btnAddBlacklistEntry").show();
    $("#btnUpdateBlacklistEntry").hide();

    $("select[name=blacklistEntryCategory] option[value='']").attr('selected','selected');
    $("select[name=blacklistEntryLevel] option[value='']").attr('selected','selected');
    $("select[name=blacklistEntrySemester] option[value='']").attr('selected','selected');
    $("select[name=blacklistEntrySession] option[value='']").attr('selected','selected');
    $("#blacklistEntryMisconduct").html("<option value=''>-- Select Misconduct --</option>");
    $("#validateChecker").val(0);
    $("#studentDetails").html("");
}

// Initialize Entry Edit Button
function initEditEntry(){
    $("#blacklistEntryAction").val("valUpdateBlacklistEntry");
    $("#myModalLabel").html("Editing Blacklist...");
    $("#btnAddBlacklistEntry").hide();
    $("#btnUpdateBlacklistEntry").show();
}

// Add New Entry Record
$("#btnAddBlacklistEntry").click(function(){
      if($("#blacklistEntryMatricNo").val()==""){
          var msg = "Matriculation number field cannot be empty";
          Swal.fire('Notice!', msg, 'warning');
        return;
      }

      if($("#validateChecker").val()=="0"){
          var msg = "Please validate student's details before proceeding";
          Swal.fire('Notice!', msg, 'warning');
        return;
      }

      if($("#blacklistEntryCategory").val()==""){
          var msg = "Please select category";
          Swal.fire('Notice!', msg, 'warning');
        return;
      }

      if($("#blacklistEntryMisconduct").val()==""){
          var msg = "Please select misconduct";
          Swal.fire('Notice!', msg, 'warning');
        return;
      }

      if($("#blacklistEntryDescr").val()==""){
          var msg = "Detailed description of misconduct is required";
          Swal.fire('Notice!', msg, 'warning');
        return;
      }

      if($("#blacklistEntryLevel").val()==""){
          var msg = "Please select student's level";
          Swal.fire('Notice!', msg, 'warning');
        return;
      }

      if($("#blacklistEntrySemester").val()==""){
          var msg = "Please select semester";
          Swal.fire('Notice!', msg, 'warning');
        return;
      }

      if($("#blacklistEntrySession").val()==""){
          var msg = "Please select session";
          Swal.fire('Notice!', msg, 'warning');
        return;
      }

      fx_lifetech_button_loader_open();
        var myFormBlacklistEntry = document.getElementById('frmBlacklistEntry');
        var formDataBlacklistEntry = new FormData(myFormBlacklistEntry);
         Swal.fire({
          title: 'Notice!',
          text: "Are you sure to add record?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes'
        }).then((result) => {
          if (result.isConfirmed) {
            $.ajax({
               method:"post",
               data:formDataBlacklistEntry,
               contentType: false,
               processData: false,
               dataType:"json",
              success: function(response){
                //console.log(response);
                var insertStatus = response["display_insert_status"];
                var insertStatusVal = response["return_insert_result"];
                var alertStatus = response["echo_type_alert"];
                var opsType = response["operation_type"];

                  if(insertStatus=='1'){
                    var msg = "Record Has Been Added Successfully";
                    Swal.fire('Great!', msg, 'success');
                  }else{
                    var msg = "Something went wrong. Could not save data";
                    Swal.fire('Oops!', msg, 'warning');
                  }
                fx_lifetech_button_loader_close();
              },
            })
            .fail(function(){
                Swal.fire({
                      icon: 'error',
                      title: 'Oops',
                      text: 'An error occurred! Nothing has changed...'
                    });

            });
          }else{
            fx_lifetech_button_loader_close();
          }
        })


 })

 // Update Click Event


$("#btnUpdateBlacklistEntry").click(function(){
 var id = $("#editIDEntry").val();
 updateBlacklistEntry(id);
})
// Edit Entry Record
function editBlacklistEntry(id){
  initEditEntry();
    var blacklistEntryAction = "valEditBlacklistEntry";
    $.ajax({
       method:"post",
       data:{id:id,blacklistEntryAction:blacklistEntryAction},
       dataType:"json",
      success: function(response){
        //console.log(response);
        var valCategory = response["category_id"];
        var valMisconduct = response["misconduct_id"];
        var valMatricNo = response["lifetech_matno"];
        var valDescription = response["description"];
        var valLevel = response["lifetech_level_id"];
        var valSemester = response["lifetech_semester_id"];
        var valSession = response["lifetech_session_id"];
        var valGeneralId = response["lifetech_general_id"];
        var opsType = response["operation_type"];
          if(valMatricNo!=""){
            $("select[name=blacklistEntryCategory] option[value='"+valCategory+"']").attr('selected','selected');
            $("select[name=blacklistEntryLevel] option[value='"+valLevel+"']").attr('selected','selected');
            $("select[name=blacklistEntrySemester] option[value='"+valSemester+"']").attr('selected','selected');
            $("select[name=blacklistEntrySession] option[value='"+valSession+"']").attr('selected','selected');
            $("#blacklistEntryMatricNo").val(valMatricNo);
            $("#blacklistEntryDescr").val(valDescription);
            $("#validateChecker").val(1);
            $("#editIDEntry").val(valGeneralId);
          //  alert(valGeneralId);

            validateMariculationNumber(valMatricNo);

            var id = valMisconduct;
            var blacklistMisconductAction = "valEditBlacklistMisconduct";
            $.ajax({
               method:"post",
               data:{id:id,blacklistMisconductAction:blacklistMisconductAction},
               dataType:"json",
              success: function(response){
                var valCategory = response["category_id"];
                 var valMisconductTitle = response["title"];
                var valGeneralId = response["lifetech_general_id"];
                $("#blacklistEntryMisconduct").html("<option value='"+valGeneralId+"'>"+valMisconductTitle+"</option>");
              },
            })
          }

        fx_lifetech_button_loader_close();
      },
    })
    .fail(function(){
        Swal.fire({
              icon: 'error',
              title: 'Oops',
              text: 'An error occurred! Nothing has changed...'
            });

    });
}

function updateBlacklistEntry(){
    var blacklistEntryAction = "valUpdateBlacklistEntry";
    fx_lifetech_button_loader_open();
      var myFormUpdateBlacklistEntry = document.getElementById('frmBlacklistEntry');
      var formDataUpdateBlacklistEntry = new FormData(myFormUpdateBlacklistEntry);
       Swal.fire({
        title: 'Notice!',
        text: "Are you sure to update this record?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          $.ajax({
             method:"post",
             data:formDataUpdateBlacklistEntry,
             contentType: false,
             processData: false,
             //dataType:"json",
            success: function(response){
              var data = JSON.parse(response);
              var updateStatus = data.display_update_result;
                if(updateStatus=='success'){
                  var msg = "Record Updated Successfully";
                  Swal.fire('Great!', msg, 'success');
                }else{
                  var msg = "Something went wrong. Could not update record";
                  Swal.fire('Oops!', msg, 'warning');
                }
              fx_lifetech_button_loader_close();
            },
          })
          .fail(function(){
              Swal.fire({
                    icon: 'error',
                    title: 'Oops',
                    text: 'An error occurred! Nothing has changed...'
                  });

          });
        }else{
          fx_lifetech_button_loader_close();
        }
      })
}

function changeStatusBlacklistEntry(id) {
    var blacklistEntryAction = "ChangeBlacklistEntryStatus";
    var statusID = $("#"+id).data('id');
    var statusVal = ''; statusValue = 0;
        if(statusID=='1'){
          StatusVal = 'disable';
          statusValue = 0;
        }else{
          StatusVal = 'enable';
          statusValue = 1;
        }
    Swal.fire({
     title: 'Notice!',
     text: "Are you sure to "+StatusVal+" this blacklist entry?",
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Yes'
   }).then((result) => {
     if (result.isConfirmed) {
       fx_lifetech_button_loader_open();
       $.ajax({
          method:"post",
          data:{id:id,blacklistEntryAction:blacklistEntryAction,statusValue:statusValue},
         success: function(response){
           var data = JSON.parse(response);
           var updateStatus = data.display_update_result;
             if(updateStatus=='success'){
               var msg = "Status Changed Successfully";
               Swal.fire('Great!', msg, 'success');
             }else{
               var msg = "Something went wrong. Could not change status";
               Swal.fire('Oops!', msg, 'warning');
             }
           fx_lifetech_button_loader_close();
         },
       })
       .fail(function(){
           Swal.fire({
                 icon: 'error',
                 title: 'Oops',
                 text: 'An error occurred! Nothing has changed...'
               });

       });
     }else{
       fx_lifetech_button_loader_close();
     }
   })

}

function deleteBlacklistEntry(id){
    var blacklistEntryAction = "valDeleteBlacklistEntry";
    Swal.fire({
     title: 'Notice!',
     text: "Are you sure to delete this record?",
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Yes'
   }).then((result) => {
     if (result.isConfirmed) {
       fx_lifetech_button_loader_open();
       $.ajax({
          method:"post",
          data:{id:id,blacklistEntryAction:blacklistEntryAction},
         success: function(response){
             if(response==1){
               var msg = "Blacklist Entry Deleted Successfully";
               Swal.fire('Great!', msg, 'success');
             }else{
               var msg = "Something went wrong. Could not delete blacklist entry";
               Swal.fire('Oops!', msg, 'warning');
             }
           fx_lifetech_button_loader_close();
         },
       })
       .fail(function(){
           Swal.fire({
                 icon: 'error',
                 title: 'Oops',
                 text: 'An error occurred! Nothing has changed...'
               });

       });
     }else{
       fx_lifetech_button_loader_close();
     }
   })
}

$("#btnUpdateBlacklistEntry").hide();
  // Validate Matric Number
  $("#blacklistEntryValidate").click(function(){
    if($("#blacklistEntryMatricNo").val()==""){
        var msg = "Please enter matriculation number";
        Swal.fire('Notice!', msg, 'warning');
      return;
    }
    var id = $("#blacklistEntryMatricNo").val();
    validateMariculationNumber(id);
  })

  function validateMariculationNumber(id){
    $("#studentDetails").html("");
    var blacklistEntryAction = "valValidateBlacklistEntry";
    $.ajax({
       method:"post",
       data:{id:id,blacklistEntryAction:blacklistEntryAction},
       dataType:"json",
      success: function(response){
        //console.log(response);
        if (!$.trim(response)){
          $("#validateChecker").val(0);
          var msg = "This matriculation number does not exist";
          Swal.fire('Notice!', msg, 'warning');
          return;
        }
        var valSurname = response["lifetech_surname"];
         var valFirstName = response["lifetech_firstname"];
        var valOthername = response["lifetech_othername"];
        var valGeneralId = response["lifetech_general_id"];
        var opsType = response["operation_type"];
            $("#studentDetails").html(valSurname.toUpperCase()+", "+valFirstName.toUpperCase()+" "+valOthername.toUpperCase());
            $("#validateChecker").val(1);


        fx_lifetech_button_loader_close();
      },
    })
    .fail(function(){
        Swal.fire({
              icon: 'error',
              title: 'Oops',
              text: 'An error occurred! Nothing has changed...'
            });

    });
  }

  $("#blacklistEntryCategory").change(function(){
    var category_id = $(this).val();
    var blacklistEntryAction = "valLoadMisconduct";
    $.ajax({
       method:"post",
       data:{id:category_id,blacklistEntryAction:blacklistEntryAction},
       //dataType:"text",
      success: function(response){
        var data = JSON.parse(response);
        var misconduct_options = "";
          for(let i = 0; i < data.length; i++) {
              let obj = data[i];

              var title = obj.title;
              var lifetech_general_id = obj.lifetech_general_id;

              misconduct_options += '<option value="'+lifetech_general_id+'">'+title+'</option>';
          }
          $("#blacklistEntryMisconduct").html('<option value="">-- Select Misconduct --</option>'+misconduct_options);


      },
    })
    .fail(function(){
        Swal.fire({
              icon: 'error',
              title: 'Oops',
              text: 'An error occurred! Nothing has changed...'
            });

    });
  })
//------------------- BLACKLIST ENTRY ENDS -------------------------------//
</script>

      