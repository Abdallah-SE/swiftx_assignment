$("#edit_user").submit(function(event){
    event.preventDefault();
    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    var request = {
        "url" : `http://localhost:7000/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
        window.location.href='http://localhost:7000/display_users';
    })
    $.ajax(request).fail(function() { alert('Update request failed');
    window.location.href='http://localhost:7000/display_users';
  });

})


$('.deletebtn').click(function() {
    var id = $(this).attr("data-id");
    var request = {
        "url" : `http://localhost:7000/api/users/${id}`,
        "method" : "DELETE"
    }
    if(confirm("Do you really want to delete this record?")){
        $.ajax(request).done(function(response){
            alert("Data Deleted Successfully!");
            window.location.href='http://localhost:7000/display_users';
            location.reload();
        })
        //$.ajax(request).fail(function() { alert('request failed');
        //window.location.href='http://localhost:7000/display_users';
      //});
    }
    //console.log(request);
});

$("#remove").data("attribute");
$('#remove').on('click',function(){
    console.log($(this).attr('data-id'));
})

if(window.location.pathname == "/"){
    $ondelete = $("#remove");
    console.log('okay');
    $ondelete.click(function(){
      console.log('okay');
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:7000/api/users/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }else{
          window.location.href='http://localhost:7000/view_user';
        }

    })
}
