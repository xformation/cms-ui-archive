import React from 'react';
var PageLoader = function (_a) {
    var pageName = _a.pageName;
    var loadingText = "Loading " + pageName + "...";
    return (React.createElement("div", { className: "page-loader-wrapper" },
        React.createElement("i", { className: "page-loader-wrapper__spinner fa fa-spinner fa-spin" }),
        React.createElement("div", { className: "page-loader-wrapper__text" }, loadingText)));
};
export default PageLoader;
//# sourceMappingURL=PageLoader.js.map