try {
transform.OnReady(function()
{
    transform.ItemAdd({
        id: 'accordions',
        name: 'Accordions',
        options: {
            a: {'label': 'Opened', 'type': 'INPUT', 'value': '1'},
            b: {'label': 'Duration (ms)', 'type': 'INPUT', 'value': 200},
            c: {'label': 'Single mode', 'type': 'TOGGLE', 'value': true},
        },
        code: function(transform, tag, target, options, data, index)
        {
            this.init = (bind, num) =>
            {
                this.requirements();
                this.render();

                if(data.mode === 'website')
                {
                    this.click();
                }
            };

            this.requirements = () =>
            {
                target.children().each(function (){
                    if($(this).children().length !== 2)
                    {
                        console.log(`"${tag.Get('label')}" - Each accordion must have only 2 children.`);
                    }
                });
            };

            this.render = () =>
            {
                let opened = options.a.split(",");
                if ( options.a === "*" || options.a.toLowerCase() === "all" ) {
                    target.children().addClass('dh-active');
                    target.children().children().addClass('dh-active');
                    return;
                }

                target.children().find(">*:last-child").hide();
                $.each(opened, function(ind, key){
                    target.children().eq(parseInt(key) - 1).addClass('dh-active');
                    target.children().eq(parseInt(key) - 1).children().addClass('dh-active');
                    target.children().eq(parseInt(key) - 1).children().last().show();
                });
            };

            this.click = () =>
            {
                let transform = this;
                
                $(target).find(">*").find(">*:first-child").on("click", function(){
                    transform.toggle($(this).parent());
                });
            };

            this.toggle = (target) => {
                let was_opened = $(target).hasClass("dh-active");

                /* Hide others if single mode */
                if (options.c) {
                    target.parent().children().removeClass("dh-active");
                    target.parent().children().children().removeClass("dh-active");
                    target.parent().children().find(">*:last-child").slideUp(options.b);
                }

                /* Open target */
                if (was_opened) {
                    target.removeClass('dh-active');
                    target.children().removeClass('dh-active');
                    target.children().last().slideUp(options.b);
                } else {
                    target.addClass('dh-active');
                    target.children().addClass('dh-active');
                    target.children().last().slideDown(options.b);
                }
            }
            
            return this;
        }
    });
});
} catch (error) { console.log(error); }

try {
mdLibraries.ItemAdd({
    id: 'fontawesome',
    css: ['https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'],
});


builder.OnReady(function() {
    mdLibraries.Fn('load', ['fontawesome'], () =>
    {
        content.ItemAdd({
            id: 'fontawesome',
            name: 'Fontawesome Icons',
            tab: 'content',
            order: 8,
            condition: function (item, tag) {
                return tag.Get('Block').Get('name') === 'i';
            },
            html: function () {
                return content.Render('49.settings', {}, {}, true);
            }
        });
    });
});

} catch (error) { console.log(error); }

try {
transform.OnReady(function() {

    this.effects = [
        {value:'none', title: 'None'},
        {value:'fade', title: 'Fade'},
        {value:'slide', title: 'Slide'},
    ];


    transform.ItemAdd({
        id: 'hamburger',
        name: 'Hamburger Menu',
        options: {
            a: {'label': 'Menu ID', 'type': 'INPUT', 'value': ''},
            b: {'label': 'Animation', 'type': 'SELECT', 'values': this.effects, 'value': 'fade'},
            c: {'label': 'Show', 'type': 'TOGGLE', 'value': false},
            d: {'label': 'Flex on show', 'type': 'TOGGLE', 'value': false},
        },

        code: function(transform, tag, target, options, data, index) {

            this.init = (bind, num) => {
                this.requirements();
                this.render();

                if(data.mode === 'website') {
                    this.click();
                }
            };

            this.requirements = () => {
                if(!options.a ) {
                    console.log(`Menu ID is not set.`);
                    return;
                }

                if( !$(`#${options.a}`).length ) {
                    console.log(`Menu with an id: ${options.a} doesn't exist.`);
                    return;
                }
            };

            this.render = () => {
                if (options.c ) {
                    target.addClass('dh-active');
                    $(`#${options.a}`).addClass("dh-active");
                    if (options.d) {
                        $(`#${options.a}`).css('display', 'flex');
                        return;
                    }
                    $(`#${options.a}`).show();
                }
            };

            this.click = () => {
                let transform = this;
                $(target).on("click", function(){
                    transform.menuToggle($(this));
                })
            };

            this.menuToggle = (button) => {

                $(button).toggleClass("dh-active");
                $(`#${options.a}`).toggleClass("dh-active");

                if (options.b === "none") {
                    let isVis = $(`#${options.a}`).is(":visible");
                    if (options.d ) {
                        if ( isVis ) {
                            $(`#${options.a}`).hide();
                        } else {
                            $(`#${options.a}`).css("display", "flex");
                        }
                    } else {
                        $(`#${options.a}`).toggle();
                    }
                } else if (options.b === "fade") {
                    if (options.d ) {
                        $(`#${options.a}`).fadeToggle("fast").css('display', 'flex');
                    } else {
                        $(`#${options.a}`).fadeToggle("fast");
                    }
                } else if (options.b === "slide") {
                    if (options.d ) {
                        $(`#${options.a}`).slideToggle("fast").css('display', 'flex');
                    } else {
                        $(`#${options.a}`).fadeToggle("fast");
                    }
                }
            }


            return this;
        }
    });
});
} catch (error) { console.log(error); }

try {
mdLibraries.ItemAdd({
    id: 'lottie.js',
    js: ['https://static.divhunt.com/assets/library/Lottie.js'],
});

transform.OnReady(function()
{
    /*
    this.renderer =  [
        ['svg', 'Svg'],
        ['canvas', 'Canvas'],
    ];
    */

    this.interactions =  [
        {value: 'none', title: 'None'},
        {value: 'scroll', title: 'Scroll'},
        {value: 'hover', title: 'Hover'},
        {value: 'cursor', title: 'Follow Cursor'},
        {value: 'click', title: 'Play on Click'},
    ];

    transform.ItemAdd({
        id: 'lottie',
        name: 'Lottie',
        options: {
            a: {'label': 'Lottie link', 'type': 'FILE', 'value': ''},
            //b: {'label': 'Render', 'type': 'SELECT', 'values': this.renderer, 'value': 'svg'},
            c: {'label': 'Autoplay', 'type': 'TOGGLE', 'value': true},
            d: {'label': 'Controls', 'type': 'TOGGLE', 'value': false},
            e: {'label': 'Start on View', 'type': 'TOGGLE', 'value': false},
            f: {'label': 'Speed', 'type': 'INPUT', 'value': 1},

            g: {'label': 'Loop', 'type': 'TOGGLE', 'value': true, 'group': 'Loop'},
            h: {'label': 'Delay (ms)', 'type': 'INPUT', 'value': '0', 'group': 'Loop'},
            i: {'label': 'Number of loops', 'type': 'INPUT', 'value': '0', 'group': 'Loop'},

            j: {'label': 'Interaction', 'type': 'SELECT', 'values': this.interactions, 'value': 'None', 'group': 'Interactions'},
        },
        code: function(transform, tag, target, options, data, index)
        {
            mdLibraries.Fn('load', ['lottie.js'], () =>
            {

                let autoplay = options.c ? "autoplay" : "";
                let controls = options.d  ? "controls" : ""; 
                let loop = options.g  ? "loop" : ""; 

                let id = tag.Get('id') + '-' + index;
                let lottieID = "lottie-"+id;

                const lottiePlayer = 
                `<lottie-player
                    ${autoplay}
                    ${controls}
                    ${loop}
                    speed = "${options.f}"
                    mode="normal"
                    src = "${options.a}"
                    id = "${lottieID}"
                    intermission = "${options.h}"
                    count = "${options.i}"
                ></lottie-player>`;
                
                $(target).append(lottiePlayer);

                if(options.e ){
                    setTimeout(() => {
                        LottieInteractivity.create({
                            player: "#lottie-"+id,
                            mode:"scroll",
                            actions: [
                                {
                                visibility: [0.50, 1.0],
                                type: "play"
                                }
                            ]
                        });
                    }, 10);
                }

                setTimeout(() => {
                    let mode, actions;

                    switch (options.j) {
                        case 'scroll':
                            mode = "scroll";
                            actions = [{
                                visibility: [0, 1],
                                type: "seek",
                                frames: [0, 300],
                            }];
                            break;

                        case 'hover':
                            mode = "cursor",
                            actions = [
                                {
                                    type: "pauseHold"
                                }
                            ]
                            break;

                        case 'cursor':
                            mode = "cursor";
                            actions = [{
                                position: {
                                    x: [0, 1],
                                    y: [0, 1]
                                },
                                type: "seek",
                                frames: [0, 300]
                            }];
                            break;

                        case 'click':
                            mode = "cursor";
                            actions = [{
                                type: "click",
                                forceFlag: false,
                            }];
                            break;

                        case 'none':
                            break;
                    }

                    LottieInteractivity.create({
                        mode,
                        player: '#' + lottieID,
                        actions,
                        loop: true,
                    });
                }, 10);

            });
        },
    });
});
} catch (error) { console.log(error); }

try {
transform.OnReady(function()
{


    this.animations =  [
        {value: 'fadeIn', title: 'Fade In'},
        {value: 'fadeInDown', title: 'Fade In Down'},
        {value: 'fadeInUp', title: 'Fade In Up'},
        {value: 'fadeInLeft', title: 'Fade In Left'},
        {value: 'fadeInRight', title: 'Fade In Right'},
    ];

    let callbacks = [];
    $(window).on('scroll', () => 
    {
        callbacks.forEach((callback) =>
        {
            callback();
        });
    });

    $(document).on('dh/pages/unload', (event, page) =>
    {
        callbacks = [];
    });


    transform.ItemAdd({
        id: 'simple-animations',
        name: 'Simple Animation',
        options: {
            a: {'label': 'Type', 'type': 'SELECT', 'value': 'fadeIn', 'values': this.animations},
            b: {'label': 'Delay (ms)', 'type': 'INPUT', 'value': '200'},
            c: {'label': 'Offset (px)', 'type': 'INPUT', 'value': '100'},
            d: {'label': 'Duration (ms)', 'type': 'INPUT', 'value': '600'},
        },
        code: function(transform, tag, target, options, data, index)
        {
            
            this.init = () => {

                if (data.mode === "website") {
                    $(target).css("opacity", "0");
                    this.startAnimation(target);
                    callbacks.push(() => {
                        if(!$(target).hasClass('plugin_simpleScroll-is-animated')) {
                            this.startAnimation(target);
                        }
                    });
                }

            }

            this.startAnimation = (target) => {
          
                let offset = options.c;
                if (!offset) {offset = 0}
                const elPos = parseInt ( $(target).offset().top ) + parseInt ( offset );
                const topOfWindow = $(window).scrollTop();
                if (elPos < topOfWindow + $(window).height()) {
                    $(target).addClass('plugin_simpleScroll-is-animated');
                    console.log("add animation", target, options);
                    $(target).css("animation", `${options.a} ${options.d}ms ease ${options.b}ms forwards`);
                }
            }

         


            return this;
        },
    });
});
} catch (error) { console.log(error); }

try {
transform.OnReady(function()
{
    this.anims =  [
        {value: 'none', title: 'None'},
        {value: 'fade', title: 'Fade'},
    ];

    this.bars = [
        {value: 'none', title: 'None'},
        {value: 'horizontal', title: 'Horizontal'},
        {value: 'vertical', title: 'Vertical'},
    ];

    let tabs = {};
    let callbacks = [];
    let intervals = {};

    $(window).on('scroll', () => 
    {
        callbacks.forEach((callback) =>
        {
            callback();
        });
    });

    $(document).on('dh/pages/unload', (event, page) =>
    {
        callbacks = [];
        intervals = {}
    });


    transform.ItemAdd({
        id: 'tabs',
        name: 'Tabs',
        options: {
            a: {'label': 'Opened Tab', 'type': 'INPUT', 'value': '1'},
            b: {'label': 'Animation', 'type': 'SELECT', 'values': this.anims, 'value': 'fade'},
            c: {'label': 'Duration (ms)', 'type': 'INPUT', 'value': 250},

            f: {'label': 'Prev Class', 'type': 'INPUT', 'value': '', 'group': "Navigation (Arrows)"},
            e: {'label': 'Next Class', 'type': 'INPUT', 'value': '', 'group': "Navigation (Arrows)"},

            aa: {'label': 'Enable', 'type': 'TOGGLE', 'value': false, 'group': "Autoplay"},
            ab: {'label': 'Delay (s)', 'type': 'INPUT', 'value': 5, 'group': "Autoplay"},
            ac: {'label': 'Disable on Interaction', 'type': 'TOGGLE', 'value': false, 'group': "Autoplay"},
            ad: {'label': 'Progress Bar', 'type': 'SELECT', 'values': this.bars, 'value': 'none', 'group': "Autoplay"},
            ae: {'label': 'Progress Bar Color', 'type': 'INPUT', 'value': "#000", 'group': "Autoplay"},
        },

        code: function(transform, tag, target, options, data, index)
        {

            if(data.mode === 'builder') {
                options.aa = false;
                options.b = "none";
            } 


            this.init = (bind, num) =>
            {

                this.setTabsDefaults(target, options);
                this.render();

                if (options.aa) {
                    this.autoplayStart(target);
                  
                    callbacks.push(() => {
                        this.autoplayStart(target);
                    }); 
                }

                if(data.mode === 'website')
                {
                    this.navigation(target);
                    this.click(target);
                }
            };

            this.render = () =>
            {
               
                let initTab = options.a;
                if (!initTab) {initTab = 1;}
                if (initTab === "*" && data.mode === "builder") {
                    return;
                }

                initTab = isNaN(parseInt(initTab)) ? 1 : parseInt(initTab);
                target.children().eq(1).children().hide();

                this.openTab(target, initTab - 1, false); 
            };

            /* DEFAULTS */
            this.setTabsDefaults = (target, options) => {
                let microtime = new Date().getTime(); 
                let randomNum = Math.floor(Math.random() * 10000); 
                let uniqueId = microtime + '_' + randomNum; 
                let className = "dh-tabs_"+uniqueId;
                $(target).addClass(className);
                $(target).attr("data-transform","tabs");
                $(target).attr("data-tabs-class", className);
                tabs[className] = {target, options};
            }


            /* ACTIONS */
            this.click = (target) =>
            {
               let transform = this;
                target.children().first().children().click(function()
                {
                    if ($(this).hasClass('dh-active')) {
                        return;
                    }

                    transform.openTab(target, $(this).index());
                });
            };

            this.openTab = (target, index, userClick = true) =>
            {   
                let tabs_id = $(target).attr("data-tabs-class");
                let options = tabs[tabs_id].options;

                /* reset autoplay if user clicks on tab, disable */
                if (options.aa && userClick) {
                    this.resetAutoplay(userClick && options.ac, target);
                }
             
                /* Set active to navigation */  
                target.children().first().children().removeClass('dh-active');        
                setTimeout(function(){
                    target.children().first().children().eq(index).addClass('dh-active');
                }, 1)

                /* Open tab content with index */
                switch (options.b)
                {
                    case 'fade':
                        this.animationFade(target, index);
                        break;
                    default:
                        this.animationNone(target, index);
                        break;
                }
            }

            /* ANIMATIONS */
            this.animationNone = (target, index) =>
            {
                let active = target.children().eq(1).find('> .dh-active');
                let content = target.children().eq(1).children().eq(index);
                active.hide();
                content.show();
                
                target.children().eq(1).find('> .dh-active').removeClass('dh-active');
                target.children().eq(1).children().eq(index).addClass('dh-active');
            };

            this.animationFade = (target, index) =>
            {
                let active = target.children().eq(1).find('> .dh-active');
                let content = target.children().eq(1).children().eq(index);

                $(active).hide();
                $(content).fadeIn();

                target.children().eq(1).find('> .dh-active').removeClass('dh-active');
                target.children().eq(1).children().eq(index).addClass('dh-active');
            };




            /* AUTOPLAY */
            this.autoplay = (target) => {

                let tabs_id = $(target).attr("data-tabs-class");
                let options = tabs[tabs_id].options;
                let transform = this;
                let totalTabs = target.children().first().children().length;
            
                intervals[tabs_id] = setInterval(() => {
                    let currentIndex = target.children().first().find('> .dh-active').index();
                    let nextIndex = (currentIndex + 1) % totalTabs;
                    transform.openTab(target, nextIndex, false);
                }, options.ab * 1000);
            };


            this.autoplayStart = (target) => {
                let isLoaded = $(target).attr("data-tabs-loaded");
                if (!isLoaded && this.inViewport(target)) {
                    $(target).attr("data-tabs-loaded", "true");
                    
                    let activeNav = $(target).children().first().find(".dh-active");
                    $(activeNav).removeClass('dh-active');  
                    setTimeout(()=> {
                       $(activeNav).addClass('dh-active');    
                    }, 1)  
                    this.autoplay(target);
                    this.progressBar(target);
                } 
            }

            this.resetAutoplay = (disableOnInteraction, target) => {

                let tab_name = $(target).attr("data-tabs-class");
                clearInterval(intervals[tab_name]);
                intervals[tab_name] = null;

                if (!disableOnInteraction) {
                    this.autoplay(target);
                } else {
                    this.stopProgressBar(target);
                }  
            };

            this.inViewport = (target) => {
                let rect = target[0].getBoundingClientRect();
                return rect.bottom > 0 &&
                    rect.right > 0 &&
                    rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
                    rect.top < (window.innerHeight || document.documentElement.clientHeight);
            }


            /* AUTOPLAY PROGRESS BAR */

            this.progressBar = (target) => {

                let tab_id = $(target).attr("data-tabs-class");
                let options = tabs[tab_id].options;


                if (options.ad === "none") { return; }
                if (!target.children().first().find('> *').find(".progress-bar").length) { 
                    let message =  `Div with the class "progress-bar" inside tabs doesnt exist.`;
                    mdBugs.ItemAdd({message}); 
                    return; 
                }

                let css = "width:0%;height:100%;";
                let cssSide = "width";
                if ( options.ad === "vertical") {
                    css = "height:0%;width:100%;";
                    cssSide = "height";
                }

                let line_color = options.ae;
                let progress_line = `<div style="background:${line_color}; position:absolute;left:0;top:0;${css}"></div>`
                target.children().first().find('> *').find(".progress-bar").append(progress_line);

                if ( !options.aa  ) { options.ab = "0";}
                let style = `
                    <style id="style-dh-tabs-progressBar">
                        .${tab_id} .dh-active .progress-bar > div {
                            ${cssSide}: 100%!important;
                            transition:${options.ab}s all cubic-bezier(.25, .46, .45, .94);
                        }
                    </style>
                `;
                $(target).append(style);
            }


            this.stopProgressBar = (target) => {

                let tab_id = $(target).attr("data-tabs-class");
                let options = tabs[tab_id].options;

                let cssSide = "width";
                if ( options.ad === "vertical") {
                    cssSide = "height";
                }

                $(target).find("#style-dh-tabs-progressBar").remove();
                let style = `
                    <style id="style-dh-tabs-progressBar">
                        .${tab_id} .dh-active .progress-bar > div {
                            ${cssSide}: 100%!important;
                            transition:0s all cubic-bezier(.25, .46, .45, .94);
                        }
                    </style>
                `;
                $(target).append(style);
            }


            /* NAVIGATION */
            this.navigation = (target) =>
            {
                /* Prev */
                if(options.f.length)
                {
                    
                    let hold_target = target;
                    let transform = this;
                    $(target).find('.' + options.f).on("click", function(){
                        let total = $(this).closest("[data-transform='tabs']").find(">*").first().find(">*").length - 1;
                        let current = $(this).closest("[data-transform='tabs']").find(">*").first().find('> .dh-active').index();
                        let prev = current - 1;
                        if (prev < 0) {
                            prev = total;
                        }

                        transform.openTab(hold_target, prev, true);
                    });
                }

                /* Next */
                if(options.e.length)
                {
                    let hold_target = target;
                    let transform = this;
                    $(target).find('.' + options.e).on("click", function(){
                        
                        let total = $(this).closest("[data-transform='tabs']").find(">*").first().find(">*").length - 1;
                        let current = $(this).closest("[data-transform='tabs']").find(">*").first().find('> .dh-active').index();

                        let next = current + 1;
                        if (next > total) {
                            next = 0;
                        }

                        transform.openTab(hold_target, next, true);
                    });
                }
            };

            return this;
        }
    });
});
} catch (error) { console.log(error); }

try {
transform.OnReady(function()
{
    this.ratios =  
    [
        {value: '42.85%', title: '21:9'},
        {value: '56.25%', title: '16:9'},
        {value: '62.25%', title: '16:10'},
        {value: '75%', title: '4:3'},
        {value: '66.66%', title: '3:2'},
        {value: '100%', title: '1:1'},
        {value: '177%', title: '9:16'},
        {value: '160%', title: '10:16'},
        {value: '133%', title: '3:4'}
    ];


    transform.ItemAdd({
        id: 'vimeo',
        name: 'Vimeo Embed',
        options: {
            a: {'label': 'Video URL', 'type': 'INPUT', 'value': ''},
            b: {'label': 'Aspect Ratio', 'type': 'SELECT', 'values': this.ratios, 'value': '56.25%'},
            c: {'label': 'Autoplay', 'type': 'TOGGLE', 'value': false},
            d: {'label': 'Loop', 'type': 'TOGGLE', 'value': false},
            e: {'label': 'Muted', 'type': 'TOGGLE', 'value': false},
            f: {'label': 'Controls', 'type': 'TOGGLE', 'value': true},
     
            pa: {'label': 'Enable', 'type': 'TOGGLE', 'value': false, 'group': 'Poster'},
            pb: {'label': 'Poster', 'type': 'FILE', 'value': '', 'group': 'Poster'},
            pc: {'label': 'Button', 'type': 'FILE', 'value': 'https://global.divhunt.com/4a59630f2e89852d562dd42ce2b12cb8_573.svg', 'group': 'Poster'},
            pd: {'label': 'Button Class', 'type': 'INPUT', 'value': '', 'group': 'Poster', 'placeholder': ''},
            pe: {'label': 'Play in Popup', 'type': 'TOGGLE', 'value': false, 'group': 'Poster'},
        },
        
        code: function(transform, tag, target, options, data, index)
        {

            let isBuilder = data.mode === "builder";

            this.init = () =>
            {
                let params = this.getParams();
                let videoId = this.getVideoID();
                let src = `https://player.vimeo.com/video/${videoId}?${params}`


               
                let html = "";
                if (options.pa) {
                    html = this.createPoster(src);
                } else {
                    html = plugins.Render('vimeo_embed.video', {options, src, isBuilder: String(isBuilder) }); 
                }
                
                $(target).append(html);

                if (data.mode === "website") {this.click();}
            }


            this.getVideoID = () => 
            {
                let src = options.a;
                let regExp = /^.*vimeo.com\/(?:video\/|)(\d+)(?:$|\/)/;
                let match = src.match(regExp);
                if (match) {
                    return match[1];
                }
            };

            this.getParams = () => {
                
                 const {
                    c,
                    d,
                    e,
                    f
                } = options;

             
                const data = {
                    autoplay: c,
                    loop: d,
                    muted: e,
                    controls: f,
                    playsinline: c,
                };

                const params = new URLSearchParams();

                Object.entries(data).forEach(([key, value]) => {
                    switch (key) {
                        case 'autoplay':
                        case 'loop':
                        case 'muted':
                        case 'controls':
                        case 'playsinline':
                            params.set(key, value ? '1' : '0');
                            break;
                        default:
                            break;
                    }
                });

                return params.toString();
            }

            this.createPoster = (src) => {

                let playButton = options.pc;
                let playButtonClass = options.pd;
                
                if (!playButtonClass) {
                    playButtonClass = "plugin_vimeo-embed_play-button";
                }

                let buttonType = "popup" ;
                if (!options.pe) {
                    buttonType = "regular";
                }

                let pointer_css = "";
                if ( isBuilder ) {
                    pointer_css = "pointer-events:none";
                }

                let html = `
                    <div style="position:relative; height:0px; padding-bottom:${options.b}; ${pointer_css}">
                        <img
                            style="position:absolute; left:0; top:0; width: 100%; height: 100%; object-fit:cover;z-index:4"
                            src="${options.pb}"
                        >
                        <img 
                            class="js-vimeo_embed-play ${playButtonClass}" data-play-type="${buttonType}"
                            src="${playButton}"
                            style="z-index:5"
                            data-aspect-ratio="${options.b}"
                            data-video-src="${src}"
                            data-is-builder="${isBuilder}"
                        >
                    </div>
                `;
                return html;
            }

            this.click = () => {

                $(target).find(".js-vimeo_embed-play").on("click", function(){

                    let isBuilder = $(this).attr("data-is-builder");
                    let res = $(this).attr("data-aspect-ratio");
                    let src = $(this).attr("data-video-src");
                    let options = {
                        b:res
                    };

                    let type = $(this).attr("data-play-type");

                    src = src.replace("autoplay=0","autoplay=1");
                    if (!src.includes("autoplay=1")) {
                        src+= "&autoplay=1";
                    }

                    if (type === "popup") {
                        let html = plugins.Render('vimeo_embed.video', {options, src, isBuilder});
                        mdModal.ItemAdd({
                            id: 'vimeo_embed-popup',
                            overlay: {opacity: 0.6, closeable: true},
                            align: {x: 'center', y: 'center'},
                            element: $('#dh-modal'),
                            html: function()
                            {
                                return `<div style="width:100vw; max-width:900px"> ${html} </div>`;
                            }
                        });
                    } else if (type === "regular") {
                        let html = plugins.Render('vimeo_embed.video', {options, src, isBuilder, onlyIframe:true});
                        $(this).parent().append(html);
                        $(this).parent().find(">img").fadeOut();
                    }
                });



            }

 
            return this;
        },
        
    });
});
} catch (error) { console.log(error); }

try {
plugins.RenderCreate('vimeo_embed.video', function(content, data, tag, a,b){

    let options = data('options', {});
    let src = data('src', '');
    let onlyIframe = data('onlyIframe', false);
    let isBuilder = data('isBuilder', 'true');
    let pointer_css = `pointer-events:none;`
    
    if (isBuilder === "false") {
        pointer_css = "";
    }

    let iframe = `
        <iframe
            style="position:absolute; left:0; top:0; width: 100%; height: 100%;"
            src="${src}" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen
        >
        </iframe>
    `;

    if (onlyIframe) {
        return iframe;
    }

    return `
        <div style="width:100%; height:0; position:relative; padding-bottom:${options.b}; ${pointer_css}">
            ${iframe}
        </div>
    `;
});
} catch (error) { console.log(error); }

try {
transform.OnReady(function()
{

    this.ratios =  
    [
        {value: '42.85%', title: '21:9'},
        {value: '56.25%', title: '16:9'},
        {value: '62.25%', title: '16:10'},
        {value: '75%', title: '4:3'},
        {value: '66.66%', title: '3:2'},
        {value: '100%', title: '1:1'},
        {value: '177%', title: '9:16'},
        {value: '160%', title: '10:16'},
        {value: '133%', title: '3:4'}
    ];


    transform.ItemAdd({
        id: 'youtube',
        name: 'Youtube Embed',
        options: {
            a: {'label': 'Video URL', 'type': 'INPUT', 'value': ''},
            b: {'label': 'Aspect Ratio', 'type': 'SELECT', 'values': this.ratios, 'value': '56.25%'},
            c: {'label': 'Autoplay', 'type': 'TOGGLE', 'value': false},
            d: {'label': 'Loop', 'type': 'TOGGLE', 'value': false},
            e: {'label': 'Muted', 'type': 'TOGGLE', 'value': false},
            f: {'label': 'Controls', 'type': 'TOGGLE', 'value': true},

            pa: {'label': 'Enable Poster', 'type': 'TOGGLE', 'value': false, 'group': 'Poster'},
            pb: {'label': 'Poster', 'type': 'FILE', 'value': '', 'group': 'Poster'},
            pc: {'label': 'Button', 'type': 'FILE', 'value': 'https://global.divhunt.com/0d33d1a9aa0053533261839b312bbf40_552.svg', 'group': 'Poster'},
            pd: {'label': 'Button Class', 'type': 'INPUT', 'value': '', 'group': 'Poster'},
            pe: {'label': 'Play in Popup', 'type': 'TOGGLE', 'value': false, 'group': 'Poster'},

            eh: {'label': 'Start (mm:ss)', 'type': 'INPUT', 'value': '00:00', 'group': 'Extras'},
            ei: {'label': 'End (mm:ss)', 'type': 'INPUT', 'value': '', 'group': 'Extras'},
            ea: {'label': 'Fullscreen Button', 'type': 'TOGGLE', 'value': true, 'group': 'Extras'},
            eb: {'label': 'Force 1080p', 'type': 'TOGGLE', 'value': false, 'group': 'Extras'},
            ec: {'label': 'Progress Bar', 'type': 'SELECT', 'values': [ {value: 'red', title: 'Red'}, {value: 'white', title: 'White'} ], 'value': 'red', 'group': 'Extras'},
        },
        
        code: function(transform, tag, target, options, data, index)
        {

            let isBuilder = data.mode === "builder";

            this.init = () =>
            {
                let params = this.getParams();
                let videoId = this.getVideoID();
                let src = `https://www.youtube.com/embed/${videoId}?${params}`

               
                let html = "";
                if (options.pa ) {
                    html = this.createPoster(src);
                } else {
                    html = plugins.Render('youtube_embed.video', {options, src, isBuilder: String(isBuilder) }); 
                }
                
                $(target).append(html);

                if (data.mode === "website") {this.click();}
            }


            this.getVideoID = () => 
            {
                let src = options.a;
                if (!src) {return "";}
                var videoID = src.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|user\/[^\/]+\/[^\/]+\/))([^\?&\/\s]{11})/)[1];
                return videoID;
            };

            this.getParams = () => {
                
                 const {
                    eh = '00:00',
                    ei = '',
                    c,
                    d,
                    e,
                    f,
                    ea,
                    eb,
                    ec
                } = options;

                const convertToSeconds = (time) => {
                    const [minutes, seconds] = time.split(':').map(Number);
                    return minutes * 60 + seconds;
                };

                const data = {
                    autoplay: c ,
                    loop: d,
                    mute: e,
                    controls: f,
                    start: convertToSeconds(eh),
                    end: convertToSeconds(ei),
                    fs: ea,
                    vq: eb,
                    color: ec,
                };

                const params = new URLSearchParams();

                Object.entries(data).forEach(([key, value]) => {
                    switch (key) {
                        case 'autoplay':
                        case 'loop':
                        case 'mute':
                        case 'controls':
                        case 'fs':
                        case 'vq':
                            params.set(key, value ? '1' : '0');
                            break;
                        case 'start':
                        case 'end':
                            if (value) {
                                params.set(key, value);
                            }
                            break;
                        case 'color':
                            params.set(key, value);
                            break;
                        default:
                            break;
                    }
                });

                if (data.loop) {
                    params.set('playlist', this.getVideoID());
                }

                return params.toString();
            }

            this.createPoster = (src) => {

                let playButton = options.pc;
                let playButtonClass = options.pd;
                
                if (!playButtonClass) {
                    playButtonClass = "plugin_youtube-embed_play-button";
                }

                let buttonType = "popup" ;
                if (!options.pe) {
                    buttonType = "regular";
                }

                let pointer_css = "";
                if ( isBuilder ) {
                    pointer_css = "pointer-events:none";
                }

                let html = `
                    <div style="position:relative; height:0px; padding-bottom:${options.b}; ${pointer_css}">
                        <img
                            style="position:absolute; left:0; top:0; width: 100%; height: 100%; object-fit:cover;z-index:4"
                            src="${options.pb}"
                        >
                        <img 
                            class="js-youtube_embed-play ${playButtonClass}" data-play-type="${buttonType}"
                            src="${playButton}"
                            style="z-index:5"
                            data-aspect-ratio="${options.b}"
                            data-video-src="${src}"
                            data-is-builder="${isBuilder}"
                        >
                    </div>
                `;
                return html;
            }

            this.click = () => {

                $(target).find(".js-youtube_embed-play").on("click", function(){

                    let isBuilder = $(this).attr("data-is-builder");
                    let res = $(this).attr("data-aspect-ratio");
                    let src = $(this).attr("data-video-src");
                    let options = {
                        b:res
                    };

                    let type = $(this).attr("data-play-type");

                    src = src.replace("autoplay=0","autoplay=1");
                    if (!src.includes("autoplay=1")) {
                        src+= "&autoplay=1";
                    }

                    if (type === "popup") {
                        let html = plugins.Render('youtube_embed.video', {options, src, isBuilder});
                        mdModal.ItemAdd({
                            id: 'youtube_embed-popup',
                            overlay: {opacity: 0.6, closeable: true},
                            align: {x: 'center', y: 'center'},
                            element: $('#dh-modal'),
                            html: function()
                            {
                                return `<div style="width:100vw; max-width:900px"> ${html} </div>`;
                            }
                        });
                    } else if (type === "regular") {
                        let html = plugins.Render('youtube_embed.video', {options, src, isBuilder, onlyIframe:true});
                        $(this).parent().append(html);
                        $(this).parent().find(">img").fadeOut();
                    }
                });



            }

 
            return this;
        },
        
    });
});
} catch (error) { console.log(error); }

try {
plugins.RenderCreate('youtube_embed.video', function(content, data, tag, a,b){

    let options = data('options', {});
    let src = data('src', '');
    let onlyIframe = data('onlyIframe', false);
    let isBuilder = data('isBuilder', 'true');
    let pointer_css = `pointer-events:none;`
    
    if (isBuilder === "false") {
        pointer_css = "";
    }

    let iframe = `
        <iframe
            style="position:absolute; left:0; top:0; width: 100%; height: 100%;"
            src="${src}" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen
        >
        </iframe>
    `;

    if (onlyIframe) {
        return iframe;
    }

    return `
        <div style="width:100%; height:0px; position:relative; padding-bottom:${options.b}; ${pointer_css}">
            ${iframe}
        </div>
    `;
});
} catch (error) { console.log(error); }

