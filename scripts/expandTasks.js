/**********************************/
/*         EXPANDTASKS.JS         */
/**********************************/
/*        Project: MoonKit        */
/*      NASA Space Apps 2020      */
/*         Team: Griffins         */
/**********************************/

// menu clicking logic
/* when menu header is clicked, display items */
$("document").ready(function(){
    var menu = $('.collapsed-items');
    var panel = $('.left-panel');
    var header = $('h4.task-menu-header');
    $('.task-menu-header').click(function(event) {
        if (menu.html() == '') {
            menu.html('<hr><div class="task_menu_item" id="experiment1"><p>Experiment 1</p></div><hr><div class="task_menu_item" id="experiment2"><p>Experiment 2</p></div><hr><div class="task_menu_item" id="experiment3"><p>Experiment 3</p></div><hr><div class="task_menu_item" id="experiment4"><p>Experiment 4</p></div>');
            panel.css("height", "auto");
            header.html('Tasks<i class="fas fa-chevron-up"></i>');
        } else {
            menu.html('');
            header.html('Tasks<i class="fas fa-chevron-down"></i>');
        }
    });
    /* when menu item is clicked, display modal */
    /* when exit button is clicked, hide modals */
    /* $('img.exit-icon').click(function(event) {
        modal.css("display", "none");
        $('.model-viewport').empty();
    }); */
});
