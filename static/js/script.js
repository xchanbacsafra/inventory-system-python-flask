$(document).ready(function() {
    disableOptions();
    $("#productId").on("change", function(){
        $("#fromLocation option").not(":first").remove();
        if ($("#productId").val()) {
            ajaxCall("get-from-locations");
            enableOptions();
        } else {
            disableOptions();
        }
        return false;
    });

    $("#submitLocation").on("click", function(e){
      e.preventDefault();
      $.ajax({
        data: {
          location: $("#location_name").val(),
        },
        type: "POST",
        url: "/dub-locations/",
      }).done(function (data) {
        if (data.output) {
          $("#location_form").submit();
          console.log(data.output);
        } else {
          alert("This Name is already used, please choose other one.");
        }
      });
    });
    
    $("#submitProduct").on("click", function (e) {
      e.preventDefault();
      $.ajax({
        data: {
          product_name: $("#product_name").val(),
        },
        type: "POST",
        url: "/dub-products/",
      }).done(function (data) {
        if (data.output) {
          $("#product_form").submit();
          console.log(data.output);
        } else {
          alert("This Name is already used, please choose other one.");
        }
      });
    });

    $("#submitCustomer").on("click", function (e) {
      e.preventDefault();
      $.ajax({
        data: {
          customer_name: $("#customer_name").val(),
        },
        type: "POST",
        url: "/dub-customers/",
      }).done(function (data) {
        if (data.output) {
          $("#customer_form").submit();
          console.log(data.output);
        } else {
          alert("This Name is already used, please choose other one.");
        }
      });
    });

    $("#product_form").submit(function (e) {
        if (!$("#product_name").val()) {
          e.preventDefault();
          alert("Please fill the Prodcut first");
        }
    });

    $("#customer_form").submit(function (e) {
      if (!$("#customer_name").val()) {
        e.preventDefault();
        alert("Please fill the Customer first");
      }
  });

    $("#movements_from").submit(function (e) {
        var msg = ''
        if ($("#category").val() && $("#category").val() <=0 ){
            msg += "Please add category";
        }

        if (!$("#productId").val() || !$("#category").val()) {
          msg += "Please fill the missing fields\n";
        }

        if (msg) {
          e.preventDefault();
          alert(msg);
        }
    });
    
    if ($("#productId").val()) {
        enableOptions();
    }

    function enableOptions()
    {
        $("#category").prop("disabled", false);
        $("#toLocation").prop("disabled", false);
        $("#fromLocation").prop("disabled", false);
    }

    function disableOptions()
    {
        $("#category").prop("disabled", "disabled");
        $("#toLocation").prop("disabled", "disabled");
        $("#fromLocation").prop("disabled", "disabled");
    }

    function ajaxCall(table){
      $.ajax({
        data: {
          productId: $("#productId").val(),
          location: $("#fromLocation").val(),
        },
        type: "POST",
        url: table,
      }).done(function (data) {
        $.each(data, function (index,value){
            $("#fromLocation").append(
              $("<option>", {
                value: index,
                text: index,
                "data-max": value.category,
              })
            );
        });

      });
    }
   /*  function ajaxCallLocation() {
      $.ajax({
        data: {
          location: $("#location_name").val(),
        },
        type: "POST",
        url: "dub-locations",
      }).done(function (data) {
        if(data.output) {
          console.log(data.output)
        } else {
          alert("This Name is already used, please choose other one.");
          return false;
        }
      });
    } */


});