
$("#edit_jogging").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();

    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })

    var request = {
        "url" : `http://localhost:7000/api/jogs/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
        window.location.href='http://localhost:7000/view_jogging';
    })
})


$('.deletebtnjog').click(function() {
    var id = $(this).attr("data-id");
    var request = {
        "url" : `http://localhost:7000/api/jogs/${id}`,
        "method" : "DELETE"
    }
    if(confirm("Do you really want to delete this record?")){
        $.ajax(request).done(function(response){
            alert("Data Deleted Successfully!");
            location.reload();
        })
    }
    //console.log(request);
});
