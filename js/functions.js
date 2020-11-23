function init_page(){
    load_images()
}



// Retrieve all images from directories in /images and create content based
// on the folder names and image names
function load_images()
{
    console.log("Sarting get_images")
    $.ajax({
        url: "/images" //Make a html request to the local images folder
    }).done(function(data, textStatus,jqXHR){
        $(data).find("a").attr("href", (i, val) => {
            if(val.match(/^(?!\.\.)(.*)\/$/))
            {
                var heading = decodeURI(val.split("/")[0]);
                var catagory_html = $("<div class='catagory-container'></div>");

                $("#images-container").append(catagory_html);
                catagory_html.append("<h4 class='catagory-heading'>" + heading + "</h4>");

                // get all images from the current folder
                $.ajax({
                    url: "/images/" + val
                }).done(function (data2, textStatus2, jqXHR2){
                    $(data2).find("a").attr("href", (i2, val2) => {
                        var image_link = "/images/" + val  +  val2;
                        catagory_html.append("<img src='" + image_link + "'>")
                    });
                });
            }
        });
    });
}
// end get_images()

// returns a promise with a list of folders as displayed as html paths
// so if you have the folder /images/Wood Working then will return an item like
function get_folder_items(path, ){
    console.log("Starting get image folders")
    return new Promise((resolve_func, reject_func) => {
        $.ajax({url: path}).done((data, textStatus, jqXHR) => {
            var links = $(data).find("a");
            console.log(links);
        });
    });
}

init_page()