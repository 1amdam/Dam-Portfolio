$(function(){
    var label = $('.label');
    var options = $('.optionItem');
    function handleSelect(item){
        label.html($(".optionItem").eq(item).html());

        label.parent().removeClass("active");
        $(".optionList").slideUp();
    }

    options.each(function(index){
        $(this).click(function(){
            handleSelect(index);
            console.log("클릭")
        })
    })


    label.click(function(){
        if($(this).parent().find(".optionList").is(":hidden")){
            label.parent().removeClass("active")
            $(".optionList").slideDown();
        }else{
            label.parent().addClass("active")
            $(".optionList").slideUp();
        }
    })

})
