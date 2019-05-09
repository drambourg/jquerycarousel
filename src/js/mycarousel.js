$(document).ready(function () {
// settings
        // Définition de la div du Carousel
        let $slider = $('#carousel');
        //Défintion de la balise contenant les images
        let $slide = 'li';
        //Temps de transition
        //Fondu
        let fadeTime = 1000; // 1 second
        let slidingTime = 3000; // 4 seconds
        let interval;


        //Chargement AJAX via JSON
        $.getJSON( "src/js/pic.json", function( data ) {
            let items = [];
            $.each( data, function( key, val ) {
                items.push( "" +
                    "<li>" +
                    "   <img class=\"element-carousel\" id='" + val.id+ "' src=\""+ val.url+ "\"/>" +
                    "<figcaption>" + val.title +"" +
                    "<p class=\"text-muted\">" + val.content  +"</p>" +
                    "</figcaption>" +
                    "</li>" );
            });

            //Génération du tableau
            $( "<ul/>", {
                html: items.join( "" )
            }).appendTo( "#carousel" );
            //Disparition de toutes les slides
            slides().hide();
            //Activation de la première
            slides().first().addClass('active');
            slides().first().fadeIn(fadeTime);
        });

        //Fonction de récupération de toutes les slides
        function slides() {
            return $slider.find($slide);
        }

        // auto scroll
        interval = setInterval(slider, fadeTime + slidingTime);

        //Fonction de slider
        function slider() {
            let $i = $slider.find($slide + '.active').index();
            slides().removeClass('active');
            slides().fadeOut(fadeTime);

            if (slides().length === $i + 1) $i = -1; // loop to start
            slides().eq($i + 1).delay(fadeTime).fadeIn(fadeTime);
            slides().eq($i + 1).addClass('active');
        };


        /*COntrole Next*/
        $('.next').click(function () { // image suivante
            let $i = $slider.find($slide + '.active').index();
            slides().removeClass('active');
            slides().hide();

            if (slides().length === $i + 1) $i = -1; // loop to start
            slides().eq($i + 1).show();
            slides().eq($i + 1).addClass('active');
            clearInterval(interval);
            interval = setInterval(slider, fadeTime + slidingTime);
        });

        /*COntrole Previous*/
        $('.prev').click(function () { // image suivante
            let $i = $slider.find($slide + '.active').index();
            slides().removeClass('active');
            slides().hide();

            if (-1 === $i - 1) $i = slides().length ; // loop to start
            slides().eq($i - 1).show();
            slides().eq($i - 1).addClass('active');
            clearInterval(interval);
            interval = setInterval(slider, fadeTime + slidingTime);
        });

    }
);




