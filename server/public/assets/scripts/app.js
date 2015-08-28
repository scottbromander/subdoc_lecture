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

    $("#submitUser").on('click', function(event){
        dataObject = stripLinks(linkStore, dataObject);
        event.stopPropagation();
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
        $.ajax({
            type: "GET",
            url: "/user/users",
            success: function(data){
                console.log(data);
                appendInfo(data);
            }
        });
    });
});

function appendInfo(data){
    var $el = $("#container");
    $el.empty();
    for(var i = 0; i < data.length; i++){
        $el.append("<div></div>");
        var $parentEl = $el.children().last();
        $parentEl.append("<h2>" + data[i].username + "</h2>");
        for(var j = 0; j < data[i].links.length; j++){
            $parentEl.append("<p><a href='http://" + data[i].links[j].url+ "'</a>" + data[i].links[j].name + "</p>");
        }
    }
}

function stripLinks(array, object) {
    object = {
        username: $("#username").val(),
        links: []
    };

    for(var i = 0; i < array.length; i++){
        object.links.push({
            url: array[i].children(".link").val(),
            name: array[i].children(".linkname").val()
        });
    }
    return object;
}