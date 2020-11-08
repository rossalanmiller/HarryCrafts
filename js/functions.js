function addxy(x,y){
    return x+y;
}

// The images dir for folders and appends the folder names and images to the web page
function get_images()
{
    $.ajax({
        url: "./images"
    }).done(function(data, textStatus,jqXHR){
        $(data).find("a").attr("href", (i, val) => {
            if(val.match(/^\/images\/(?!\.\.)(.*)\/$/))
            {
                var heading = val.split("/")[2]
                $("body").append("<h4>" + heading + "</h4>");
            }
        });
    });
}