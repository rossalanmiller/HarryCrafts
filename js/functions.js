var image_gallery_src_list = []
var current_gallery_index = 0

function init_page(){
    $(document).ready(()=>{
        load_images();
        console.log('what');
        change_image();
    });
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
                var heading_id = heading.replace(" ","_");
                var catagory_html = $("<div class='catagory-container'></div>");
                $("#images-container").append("<h4 class='catagory-heading' id='" + heading_id + "'>" + heading + "</h4>");
                $("#images-container").append(catagory_html);
                //catagory_html.append("<h4 class='catagory-heading' id='" + heading + "'>" + heading + "</h4>");
                //$('#nav-menu').append("<a href='#" + heading + "'>" + heading + "</a>")

                // get all images from the current folder
                $.ajax({
                    url: "/images/" + val
                }).done(function (data2, textStatus2, jqXHR2){
                    $(data2).find("a").attr("href", (i2, val2) => {
                        var image_link = "/images/" + val  +  val2;

                        var image_background_html  = $("<div class='catagory-image-background'></div>");
                        catagory_html.append(image_background_html);
                        image_background_html.append("<img src='" + image_link + "'>");
                        image_background_html.on('click', (data)=>{
                            console.log(data);
                            $(data.currentTarget).find("img").toggleClass("selected-image");
                        });
                    });
                });
            }
        });
    });
}
// end get_images()


function change_image(){
    $('.gallery-arrow-left').on('click', ()=>{
        current_gallery_index = (1+current_gallery_index) % (image_gallery_src_list.length)
        var new_src = image_gallery_src_list[current_gallery_index]
        $('.gallery-image-container img')[0].src = new_src;
    })
}


// Create the modal gallery with the begining image
// and the section we want to retrieve images for
function activte_modal_gallery(initial_img_index, section){
    // load images from the section into the src array
    image_gallery_src_list = $('#' + section + ' + div div img').toArray().map((x)=>{return x.src});
    //current_gallery_index = image_gallery_src_list.findIndex((x)=>{return x == initial_img_src});
    current_gallery_index = initial_img_index;

    // turn on the modal
    $('#modal').css('display','block');
    $('.gallery-image-container img')[0].src = image_gallery_src_list[current_gallery_index];


}

init_page()