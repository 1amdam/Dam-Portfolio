$(document).ready(function(){
    /* *************************************************************************** */
      var winHeight=0; //브라우저의 높이 변수
      var windowWidth;
      
    //  슬라이더 변수

    // 터치 변수 

    // 브라우저의 높이값 얻기 위한 함수
    function $wh(){
        // 브라우저의 높이값 가져오기
        winHeight=$(window).height();
        // 브라우저의 높이값 가져오기
        windowWidth=$(window).width();
        // 스크롤바의 추가 값 계산
        $(".section").css({
            height:winHeight
        });
        console.log("창의 높이 : "+winHeight)
        
        $(".section").eq(0).css({
            height:winHeight
        })
    }
    // 높이 너비 함수 실행
    $wh();
    
    /* *************************************************************************** */
    
      // 브라우저의 높이가 변경되면 처리할 재 설정
      $(window).resize(function(){
        $wh()
        wheel();
        // ////////////////////////////////////////////////////////////////////////
        /* $("html,body").stop().animate({
          scrollTop:winHeight*activeIndex
         }); */
        // ///////////////////////////////////////////////////////////////////////// 
        
      })
    
    /* *************************************************************************** */
    // 헤더 네비, 사이드 네비 구성 처리 및 
    var $navBool=true;
    $(".navBt").click(function(){
        if($navBool){
        $(this).addClass("bt-background")
        $(".nav-list").addClass("nav-position")
        $navBool=false;
        }else{
        $(".nav-list").removeClass("nav-position")
        $(this).removeClass("bt-background")
        $navBool=true;
        }
    })

      // animation

      var activeIndex=0;
      function $animation(){
          $(".about-group1").removeClass("aboutActive");
          $(".about-group2").removeClass("aboutActive");

          $(".section").eq(activeIndex).find(".about-group1").addClass("aboutActive");
          $(".section").eq(activeIndex).find(".about-group2").addClass("aboutActive");

          $(".web-group").removeClass("aniActive")
          for(i=0; i<$(".web-group").length; i++){
              $(".section").eq(activeIndex).find(".web-group").eq(i).addClass("aniActive")
          }
          $(".banner-box div a").removeClass("bannerActive");
          for(i=0; i<$(".banner-box div a").length; i++){
              $(".section").eq(activeIndex).find(".banner-box div a").eq(i).addClass("bannerActive")
          }
      }
      $animation();

    // 스크롤 애니메이션
    $(".section").each(function(index){
        $(window).scroll(function(){
            $scrollTop=$(window).scrollTop();
            if($scrollTop<70){
                $("header").removeClass("topHeader")
            }else{
                $("header").addClass("topHeader")
            }
            if(windowWidth<768){
                if($scrollTop+$(window).height()/2>=$('.section').eq(index).offset().top){
                    $(".side-nav a").removeClass("side-active")
                    $(".side-nav a").eq(index).addClass("side-active")
                    $(".nav-list a").removeClass("clickActive");
                    $(".nav-list a").eq(index).addClass("clickActive")
                }
            }
            //추가 애니메이션
            var $sectionTop=$("section").eq(index).offset().top
            if($scrollTop+500>$sectionTop){
                $(".side-nav a").removeClass("side-active")
                $(".side-nav a").eq(index).addClass("side-active")
                $(".nav-list a").removeClass("clickActive");
                $(".nav-list a").eq(index).addClass("clickActive")
                activeIndex=index;
                $animation();
            }
            
        })
    })
    
    // 해시 애니메이션
    $(".nav-list a").each(function(index){
        $(this).click(function(){
            $hash=$(this.hash).offset().top
            $("html,body").stop().animate({
                scrollTop:$hash
            })
            $(".nav-list a").removeClass("clickActive")
            $(this).addClass("clickActive")
            $(".nav-list").removeClass("nav-position")
            $navBool=true;
            $(".side-nav a").removeClass("side-active")
            $(".side-nav a").eq(index).addClass("side-active")
            $(".navBt").removeClass("bt-background");
        })
    })
    $(".side-nav a").each(function(index){
        $(this).click(function(){
            $hash=$(this.hash).offset().top
            $("html,body").stop().animate({
                scrollTop:$hash
            })
            $(".side-nav a").removeClass("side-active")
            $(this).addClass("side-active");
            $(".nav-list a").removeClass("clickActive");
            $(".nav-list a").eq(index).addClass("clickActive")
            $navBool=true;
            $(".navBt").removeClass("bt-background");
            $(".nav-list").removeClass("nav-position")
        })
    })
    
    
    /* *************************************************************************** */
    // 활성/비활성
    
    // //////////////////////////////////////////////////////////////////
    // 스킬

    // 애니메이션
    
    // //////////////////////////////////////////////////////////////////////
    //휠 함수
      function wheel(){
        // 슬라이드 부분 삽입
        var $section1=$("section").eq(1).offset().top;
        //-------------휠을 올렸을 때의 동작 -----------------------------------------------
        $(".section").each(function(index){
            
            $(this).on("DOMMouseScroll mousewheel", function(e){
                
                if(e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0 ){
                    
                    if($(this).prev() != undefined){
                        var moveTop=$(this).prev().offset().top;
                        console.log("섹션의 위치 : "+moveTop)
                        
                        //애니메이션 인수 추가
                        activeIndex=index-1;

                        // 휠을 올렸을 때 애니메이션 할 위치
                        // ///////////////////////////////////////////////////////////////////
                        if(moveTop<$section1 ){
                            console.log("70보다 작습니다.")
                            $("header").removeClass("topHeader")                            
                        }
                        $(".nav-list a").eq(index).removeClass("clickActive")
                        $(".nav-list a").eq(index-1).addClass("clickActive")
                        $(".side-nav a").eq(index).removeClass("side-active")
                        $(".side-nav a").eq(index-1).addClass("side-active")
                        // /////////////////////////////////////////////////////////////////
                    }
                    
                }else{
                    console.log("내렸어요");
                    if($(this).next() != undefined){
                        var moveTop=$(this).next().offset().top;
                        //애니메이션 인수
                        activeIndex=index+1;

                        console.log("섹션의 위치 : "+moveTop)
                        // 휠을 내렸을 때 애니메이션 할 위치
                        // ///////////////////////////////////////////////////////
                        if(moveTop>$section1){
                            $("header").addClass("topHeader")
                        }
                        $(".nav-list a").eq(index).removeClass("clickActive")
                        $(".nav-list a").eq(index+1).addClass("clickActive")
                        $(".side-nav a").eq(index).removeClass("side-active")
                        $(".side-nav a").eq(index+1).addClass("side-active")
                        // //////////////////////////////////////////////////////
                        
                    }
                }
                // //////////////////////////////////////////////////////////////
                $animation();
                $("html,body").stop().animate({
                    scrollTop:moveTop
                },800);
                // ///////////////////////////////////////////////////////////////
                
               return false; 
            })
            
        })


    //   마우스 무브, 터치 무브
/* ----------------------------터치무브 ------------------------------------------------------- */
      


      
     

      
    }// wheel함수 끝
    wheel();
    /* *************************************************************************** */
})//jqeuery 끝
    
    
    