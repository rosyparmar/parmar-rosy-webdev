(function ()
{
    angular
        .module("WebAppMaker")
        .controller("WidgetListController",WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService, $location)
    {
        var vm=this;
        vm.userId=$routeParams["uid"];
        vm.websiteId=$routeParams["wid"];
        vm.pageId=$routeParams["pid"];
        vm.widgetId = $routeParams["wgid"];
        vm.editWidgets = editWidgets;
        vm.getSafeHtml = getSafeHtml;

        function getSafeHtml(text) {
            return $sce.trustAsHtml(text);
        }

        function checkSafeURL(widgetURL) {
            var parts = widgetURL.split('/');
            var id = parts[parts.length - 1];
            url = "https://www.youtube.com/embed/"+id;

            return $sce.trustAsResourceUrl(url);
        }

        function editWidget(w){

            if (w.widgetType === "YOUTUBE" || w.widgetType === "IMAGE" || w.widgetType === "HEADER"){
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget/" + w._id);
            }
            else{
                $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
            }

        }

        function init()
        {
            vm.widgets=WidgetService.findWidgetsByPageId(vm.pageId);

        }
        init();
        
        function editWidgets(w)
        {
            if(!w.widgetType == "HTML")
            {
                console.log(vm.widgetId);
                $location.url("/user/:" + vm.id + "/website/:" + vm.websiteId + "/page/:" + vm.pageId +"/widget/:" + vm.widgetId);
            }
        }
    }
})();