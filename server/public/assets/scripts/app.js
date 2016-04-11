var linkStore = [];
var dataObject = {};

$(document).ready(function(){
    $("#addLink").on('click', function(){
        $("#links").append("<div></div>");
        var $el = $("#links").children().last();
        $el.append("<input class='link' type='text' placeholder='Enter Link'>");
        $el.append("<input class='linkname' type='text' placeholder='Enter Name for Link'>");
        linkStore.push($el);
    });

    $("#submitUser").on('click', function(){
        dataObject = stripLinks(linkStore, dataObject);
        $.ajax({
            type: "POST",
            url: "/user/create",
            data: JSON.stringify(dataObject),
            contentType: 'application/json',
            success: function(data){
                console.log(data);
            }
        });
    });

    $("#getUsers").on('click', function(){

    });
});

function stripLinks(array, object){
    object = {
        username: $("#username").val(),
        links: []
    };

    for(var i = 0; i < array.length; i++){
        object.links.push({
            name: array[i].children(".linkname").val(),
            url: array[i].children(".link").val()
        });
    }

    return object;
}